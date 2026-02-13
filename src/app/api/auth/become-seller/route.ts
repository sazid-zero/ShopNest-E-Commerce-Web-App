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

  const { shopName, shopDescription, shopCategory } = await req.json();

  if (!shopName || !shopDescription) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Create the shop
    const shopRes = await client.query(
      `INSERT INTO shops (owner_id, name, description) 
       VALUES ($1, $2, $3) 
       RETURNING id`,
      [user.id, shopName, shopDescription]
    );

    // 2. Update user role to seller
    await client.query(
      "UPDATE users SET role = 'seller' WHERE id = $1",
      [user.id]
    );

    await client.query('COMMIT');

    return NextResponse.json({ 
      success: true, 
      message: "Congratulations! You are now a seller on ShopNest.",
      shopId: shopRes.rows[0].id
    });

  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error("Seller application failed:", error);
    
    if (error.code === '23505') { // Unique violation
      return NextResponse.json({ error: "A shop with this name already exists." }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}
