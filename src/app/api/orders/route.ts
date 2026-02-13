import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAndSyncUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  const user = await verifyAndSyncUser(token);
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { items, totalAmount, shippingAddress } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items in order" }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Check and decrement stock for each item atomically
    for (const item of items) {
      const { id, quantity } = item;
      const res = await client.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING name",
        [quantity, id]
      );

      if (res.rowCount === 0) {
        throw new Error(`Insufficient stock for product ID: ${id}`);
      }
    }

    // 2. Create order
    const orderRes = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_address, status) 
       VALUES ($1, $2, $3, 'pending') 
       RETURNING id`,
      [user.id, totalAmount, shippingAddress]
    );

    const orderId = orderRes.rows[0].id;

    // 3. Create order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await client.query("COMMIT");

    return NextResponse.json({ success: true, orderId });
  } catch (error: any) {
    await client.query("ROLLBACK");
    console.error("Order creation failed:", error);
    return NextResponse.json({ error: error.message || "Order creation failed" }, { status: 400 });
  } finally {
    client.release();
  }
}
