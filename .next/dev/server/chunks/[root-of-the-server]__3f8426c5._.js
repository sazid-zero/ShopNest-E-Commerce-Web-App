module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const __TURBOPACK__default__export__ = pool;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/firebase-admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs, [project]/node_modules/firebase-admin)");
;
;
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].apps.length) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].initializeApp({
        credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
    });
}
const auth = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["default"].auth();
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "verifyAndSyncUser",
    ()=>verifyAndSyncUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase-admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function verifyAndSyncUser(token) {
    try {
        const decodedToken = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"].verifyIdToken(token);
        const { uid, email, name } = decodedToken;
        if (!email) throw new Error("Email missing in token");
        // Sync with local DB using ON CONFLICT for efficiency
        const client = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].connect();
        try {
            // First, check if the user exists and what their role is
            const userRes = await client.query("SELECT role FROM users WHERE id = $1", [
                uid
            ]);
            let role = 'customer';
            if (userRes.rows.length > 0) {
                role = userRes.rows[0].role;
            } else if (email === 'admin@shopnest.com') {
                role = 'admin';
            }
            // Sync user data
            const res = await client.query(`INSERT INTO users (id, email, name, role) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name
         RETURNING id, email, name, role`, [
                uid,
                email,
                name || null,
                role
            ]);
            const user = res.rows[0];
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            };
        } finally{
            client.release();
        }
    } catch (error) {
        console.error("Auth verification failed:", error);
        return null;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/dashboard/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function GET(req) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const token = authHeader.split("Bearer ")[1];
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAndSyncUser"])(token);
    if (!user || user.role !== 'admin' && user.role !== 'seller') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Forbidden"
        }, {
            status: 403
        });
    }
    const client = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].connect();
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                stats: [
                    {
                        name: 'Total Orders',
                        value: statsRes.rows[0].total_orders,
                        icon: 'ShoppingCart',
                        color: 'bg-blue-500'
                    },
                    {
                        name: 'Active Products',
                        value: statsRes.rows[0].total_products,
                        icon: 'Package',
                        color: 'bg-green-500'
                    },
                    {
                        name: 'Total Shops',
                        value: statsRes.rows[0].total_shops,
                        icon: 'Store',
                        color: 'bg-purple-500'
                    },
                    {
                        name: 'Revenue',
                        value: `৳${Number(statsRes.rows[0].total_revenue || 0).toLocaleString()}`,
                        icon: 'TrendingUp',
                        color: 'bg-orange-500'
                    }
                ],
                recentActivity: recentActivityRes.rows.map((order)=>({
                        label: `New Order #ORD-${order.short_id}`,
                        time: order.created_at,
                        amount: `৳${Number(order.total_amount).toLocaleString()}`,
                        status: order.status
                    }))
            });
        }
        if (user.role === 'seller') {
            // Find seller's shop
            const shopRes = await client.query("SELECT id FROM shops WHERE owner_id = $1", [
                user.id
            ]);
            const shopId = shopRes.rows[0]?.id;
            if (!shopId) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    stats: [],
                    recentActivity: []
                });
            }
            const statsRes = await client.query(`
        SELECT 
          (SELECT COUNT(DISTINCT oi.order_id) FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE p.shop_id = $1) as total_orders,
          (SELECT COUNT(*) FROM products WHERE shop_id = $1) as total_products,
          (SELECT SUM(oi.price * oi.quantity) FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE p.shop_id = $1) as total_revenue
      `, [
                shopId
            ]);
            const recentActivityRes = await client.query(`
        SELECT DISTINCT o.id, substring(o.id::text, 1, 8) as short_id, o.created_at, o.status
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE p.shop_id = $1
        ORDER BY o.created_at DESC LIMIT 5
      `, [
                shopId
            ]);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                stats: [
                    {
                        name: 'Total Orders',
                        value: statsRes.rows[0].total_orders,
                        icon: 'ShoppingCart',
                        color: 'bg-blue-500'
                    },
                    {
                        name: 'My Products',
                        value: statsRes.rows[0].total_products,
                        icon: 'Package',
                        color: 'bg-green-500'
                    },
                    {
                        name: 'Shop Revenue',
                        value: `৳${Number(statsRes.rows[0].total_revenue || 0).toLocaleString()}`,
                        icon: 'TrendingUp',
                        color: 'bg-orange-500'
                    }
                ],
                recentActivity: recentActivityRes.rows.map((order)=>({
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
      `, [
                user.id
            ]);
            const recentActivityRes = await client.query(`
        SELECT id, substring(id::text, 1, 8) as short_id, total_amount, created_at, status
        FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5
      `, [
                user.id
            ]);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                stats: [
                    {
                        name: 'My Orders',
                        value: statsRes.rows[0].total_orders,
                        icon: 'ShoppingCart',
                        color: 'bg-blue-500'
                    },
                    {
                        name: 'Total Spent',
                        value: `৳${Number(statsRes.rows[0].total_spent || 0).toLocaleString()}`,
                        icon: 'TrendingUp',
                        color: 'bg-orange-500'
                    }
                ],
                recentActivity: recentActivityRes.rows.map((order)=>({
                        label: `Order #ORD-${order.short_id}`,
                        time: order.created_at,
                        amount: `৳${Number(order.total_amount).toLocaleString()}`,
                        status: order.status
                    }))
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            stats: [],
            recentActivity: []
        });
    } catch (error) {
        console.error("Dashboard stats fetch failed:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    } finally{
        client.release();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3f8426c5._.js.map