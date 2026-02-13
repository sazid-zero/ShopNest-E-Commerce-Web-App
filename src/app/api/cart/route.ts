import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";
import pool from "@/lib/db";

// Middleware helper to get user
async function getUser(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.split("Bearer ")[1];
  try {
    const decoded = await auth.verifyIdToken(token);
    return decoded;
  } catch (e) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT c.product_id, c.quantity, p.name, p.price, p.image_url 
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [user.uid]
    );
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}

export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { productId, quantity } = body;

  const client = await pool.connect();
  try {
    if (quantity <= 0) {
      await client.query(
        'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
        [user.uid, productId]
      );
    } else {
      await client.query(
        `INSERT INTO cart (user_id, product_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = $3`,
        [user.uid, productId, quantity]
      );
    }
    return NextResponse.json({ success: true });
  } finally {
    client.release();
  }
}

// Bulk sync (for login)
export async function PUT(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json(); // Expects array of { productId, quantity }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // For simplicity, we can upsert each. 
    // Or we could wipe and rewrite, but that loses existing DB items if not careful.
    // Better strategy: For each local item, upsert to DB.
    
    for (const item of items) {
       await client.query(
        `INSERT INTO cart (user_id, product_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = GREATEST(cart.quantity, $3)`, 
         // Strategy: take logic to keep max, or just sum? 
         // Let's just override with local if provided, or sum?
         // Required logic: "Merge". Usually max or sum. Let's start with replacing/updating if local exists.
         // Actually, if I logged in on another device, I want those items too.
         // Let's use ON CONFLICT DO UPDATE SET quantity = EXCLUDED.quantity (Client state wins? Or Server?)
         // Let's go with: Client wins for conflicts during sync (user just modified cart), but strictly speaking we should probably fetch first.
         // Simplified: Upsert local items.
        [user.uid, item.productId, item.quantity]
      );
    }
    
    await client.query('COMMIT');
    return NextResponse.json({ success: true });
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
