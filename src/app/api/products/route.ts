import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const shopId = searchParams.get("shopId");
  const ids = searchParams.get("ids")?.split(",").map(id => parseInt(id)).filter(id => !isNaN(id));

  try {
    const client = await pool.connect();
    try {
      let query = `
        SELECT p.*, c.name as category_name, c.slug as category_slug 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
      `;
      const values: any[] = [];

      if (ids && ids.length > 0) {
        query += ` AND p.id = ANY($${values.length + 1})`;
        values.push(ids);
      }
      if (type) {
        values.push(type);
        query += ` AND p.type = $${values.length}`;
      }
      if (category) {
        values.push(category);
        query += ` AND (c.slug = $${values.length} OR c.name = $${values.length})`;
      }
      if (shopId) {
        values.push(shopId);
        query += ` AND p.shop_id = $${values.length}`;
      }

      query += " ORDER BY p.created_at DESC";


      const result = await client.query(query, values);
      
      // Transform DB row to match Frontend Product type if necessary
      const products = result.rows.map(row => ({
        id: row.id,
        image: row.image_url,
        title: row.name,
        price: parseFloat(row.price),
        original: row.original_price ? parseFloat(row.original_price) : undefined,
        discount: row.discount,
        rating: parseFloat(row.rating),
        reviews: row.reviews_count,
        type: row.type,
        category: row.category_name,
        description: row.description,
        shopId: row.shop_id,
        stock: row.stock
      }));


      return NextResponse.json(products);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, original_price, discount, stock, description, image_url, category_id, shop_id, type } = body;

    const client = await pool.connect();
    try {
      const res = await client.query(
        `INSERT INTO products (name, price, original_price, discount, stock, description, image_url, category_id, shop_id, type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [name, price, original_price || null, discount || 0, stock || 0, description, image_url, category_id, shop_id, type || 'new-arrival']
      );
      return NextResponse.json(res.rows[0]);
    } finally {
      client.release();
    }
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: "A product with this name already exists" }, { status: 400 });
    }
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


