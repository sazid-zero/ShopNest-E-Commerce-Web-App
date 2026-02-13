import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM banners WHERE is_active = TRUE ORDER BY position ASC"
      );
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
