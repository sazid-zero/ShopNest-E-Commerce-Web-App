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
  if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await pool.connect();

  try {
    if (user.role === 'admin') {
      const statsRes = await client.query(`
        SELECT 
          (SELECT COUNT(*) FROM orders) as total_orders,
          (SELECT COUNT(*) FROM products) as total_products,
          (SELECT COUNT(*) FROM shops) as total_shops,
          (SELECT SUM(total_amount) FROM orders) as total_revenue
      `);

      const recentActivityRes = await client.query(`
        SELECT id, substring(id::text, 1, 8) as short_id, total_amount, created_at, status
        FROM orders ORDER BY created_at DESC LIMIT 5
      `);

      return NextResponse.json({
        stats: [
          { name: 'Total Orders', value: statsRes.rows[0].total_orders, icon: 'ShoppingCart', color: 'bg-blue-500' },
          { name: 'Active Products', value: statsRes.rows[0].total_products, icon: 'Package', color: 'bg-green-500' },
          { name: 'Total Shops', value: statsRes.rows[0].total_shops, icon: 'Store', color: 'bg-purple-500' },
          { name: 'Revenue', value: `৳${Number(statsRes.rows[0].total_revenue || 0).toLocaleString()}`, icon: 'TrendingUp', color: 'bg-orange-500' },
        ],
        recentActivity: recentActivityRes.rows.map(order => ({
          label: `New Order #ORD-${order.short_id}`,
          time: order.created_at,
          amount: `৳${Number(order.total_amount).toLocaleString()}`,
          status: order.status
        }))
      });
    }

    if (user.role === 'seller') {
      // Find seller's shop
      const shopRes = await client.query("SELECT id FROM shops WHERE owner_id = $1", [user.id]);
      const shopId = shopRes.rows[0]?.id;

      if (!shopId) {
        return NextResponse.json({ stats: [], recentActivity: [] });
      }

      const statsRes = await client.query(`
        SELECT 
          (SELECT COUNT(DISTINCT oi.order_id) FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE p.shop_id = $1) as total_orders,
          (SELECT COUNT(*) FROM products WHERE shop_id = $1) as total_products,
          (SELECT SUM(oi.price * oi.quantity) FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE p.shop_id = $1) as total_revenue
      `, [shopId]);

      const recentActivityRes = await client.query(`
        SELECT DISTINCT o.id, substring(o.id::text, 1, 8) as short_id, o.created_at, o.status
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE p.shop_id = $1
        ORDER BY o.created_at DESC LIMIT 5
      `, [shopId]);

      return NextResponse.json({
        stats: [
          { name: 'Total Orders', value: statsRes.rows[0].total_orders, icon: 'ShoppingCart', color: 'bg-blue-500' },
          { name: 'My Products', value: statsRes.rows[0].total_products, icon: 'Package', color: 'bg-green-500' },
          { name: 'Shop Revenue', value: `৳${Number(statsRes.rows[0].total_revenue || 0).toLocaleString()}`, icon: 'TrendingUp', color: 'bg-orange-500' },
        ],
        recentActivity: recentActivityRes.rows.map(order => ({
          label: `Sales Order #ORD-${order.short_id}`,
          time: order.created_at,
          amount: 'View Details',
          status: order.status
        }))
      });
    }

    if (user.role === 'customer') {
      const statsRes = await client.query(`
        SELECT 
          COUNT(*) as total_orders,
          SUM(total_amount) as total_spent
        FROM orders WHERE user_id = $1
      `, [user.id]);

      const recentActivityRes = await client.query(`
        SELECT id, substring(id::text, 1, 8) as short_id, total_amount, created_at, status
        FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5
      `, [user.id]);

      return NextResponse.json({
        stats: [
          { name: 'My Orders', value: statsRes.rows[0].total_orders, icon: 'ShoppingCart', color: 'bg-blue-500' },
          { name: 'Total Spent', value: `৳${Number(statsRes.rows[0].total_spent || 0).toLocaleString()}`, icon: 'TrendingUp', color: 'bg-orange-500' },
        ],
        recentActivity: recentActivityRes.rows.map(order => ({
          label: `Order #ORD-${order.short_id}`,
          time: order.created_at,
          amount: `৳${Number(order.total_amount).toLocaleString()}`,
          status: order.status
        }))
      });
    }

    return NextResponse.json({ stats: [], recentActivity: [] });

  } catch (error: any) {
    console.error("Dashboard stats fetch failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    client.release();
  }
}
