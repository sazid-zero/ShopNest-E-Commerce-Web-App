import { NextRequest, NextResponse } from "next/server";
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

  return NextResponse.json({ success: true, user });
}

