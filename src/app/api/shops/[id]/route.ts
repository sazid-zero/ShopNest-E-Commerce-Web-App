import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    try {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT * FROM shops WHERE id = $1",
                [id]
            );
            
            if (result.rows.length === 0) {
                return NextResponse.json({ error: "Shop not found" }, { status: 404 });
            }
            
            return NextResponse.json(result.rows[0]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error fetching shop:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
