import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyAndSyncUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  const user = await verifyAndSyncUser(token);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await pool.connect();

  try {
    const res = await client.query("SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC");
    return NextResponse.json(res.rows);
  } catch (error: any) {
    console.error("Users fetch failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  const adminUser = await verifyAndSyncUser(token);
  if (!adminUser || adminUser.role !== 'admin') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, role } = await req.json();
  if (!userId || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    const res = await client.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role",
      [role, userId]
    );
    if (res.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, user: res.rows[0] });
  } catch (error: any) {
    console.error("User update failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}
