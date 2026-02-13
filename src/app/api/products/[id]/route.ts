import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAndSyncUser } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  const { id } = await params;

  try {
    const client = await pool.connect();
    try {
      const result = await client.query(`
        SELECT p.*, c.name as category_name, s.name as shop_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN shops s ON p.shop_id = s.id
        WHERE p.id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const row = result.rows[0];
      const product = {
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
        shopName: row.shop_name
      };

      return NextResponse.json(product);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const client = await pool.connect();
    try {
      await client.query("DELETE FROM products WHERE id = $1", [id]);
      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const body = await req.json();
  const { name, price, stock, description, category_id, type } = body;

  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        `UPDATE products 
         SET name = COALESCE($1, name), 
             price = COALESCE($2, price), 
             stock = COALESCE($3, stock), 
             description = COALESCE($4, description),
             category_id = COALESCE($5, category_id),
             type = COALESCE($6, type)
         WHERE id = $7 RETURNING *`,
        [name, price, stock, description, category_id, type, id]
      );
      return NextResponse.json(res.rows[0]);
    } finally {
      client.release();
    }
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: "A product with this name already exists" }, { status: 400 });
    }
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

