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
"[project]/src/app/api/seed-products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET() {
    try {
        const productsToSeed = [
            // Banner Products
            {
                name: "Apple iPhone 16 Pro Max",
                description: "The ultimate iPhone with A18 Pro chip and significant camera upgrades.",
                price: 1199.99,
                image_url: "/Apple-16-series.webp",
                category_slug: "electronics"
            },
            {
                name: "iPad Pro M4",
                description: "The thinnest Apple product ever with the powerful M4 chip.",
                price: 999.99,
                image_url: "/iPad-Pro-M4.webp",
                category_slug: "electronics"
            },
            {
                name: "AirPods Max 2",
                description: "High-fidelity audio with USB-C and new colors.",
                price: 549.00,
                image_url: "/airpods-max-2.png",
                category_slug: "audio"
            },
            {
                name: "AirPods Pro 3",
                description: "Next-generation active noise cancellation.",
                price: 249.00,
                image_url: "/airpods-pro-3.jpg",
                category_slug: "audio"
            },
            // Featured Products
            {
                name: "PlayStation 5",
                description: "Experience lightning fast loading with an ultra-high speed SSD.",
                price: 499.99,
                image_url: "/ps5.jpg",
                category_slug: "gaming"
            },
            {
                name: "Women's Summer Collection",
                description: "Elegant and comfortable styles for the season.",
                price: 89.99,
                image_url: "/fashion.jpg",
                category_slug: "clothing"
            },
            {
                name: "Amazon Echo Dot",
                description: "Smart speaker with Alexa.",
                price: 49.99,
                image_url: "/alexa.png",
                category_slug: "smart-home"
            },
            {
                name: "Gucci Intense Oud",
                description: "A luxurious fragrance for men and women.",
                price: 180.00,
                image_url: "/gucci.png",
                category_slug: "beauty"
            },
            {
                name: "Apple Watch Series 10",
                description: "Thinner design, bigger display.",
                price: 399.00,
                image_url: "/apple-watch-series-10.jpg",
                category_slug: "wearables"
            }
        ];
        const results = [];
        for (const p of productsToSeed){
            // 1. Get or Create Category
            let categoryId;
            const catRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM categories WHERE slug = $1', [
                p.category_slug
            ]);
            if (catRes.rows.length > 0) {
                categoryId = catRes.rows[0].id;
            } else {
                const newCat = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO categories (name, slug, icon) VALUES ($1, $2, $3) RETURNING id', [
                    p.category_slug.charAt(0).toUpperCase() + p.category_slug.slice(1),
                    p.category_slug,
                    'package'
                ]);
                categoryId = newCat.rows[0].id;
            }
            // 2. Check if product exists
            const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT id FROM products WHERE name = $1', [
                p.name
            ]);
            let productId;
            if (existing.rows.length > 0) {
                productId = existing.rows[0].id;
            } else {
                const insert = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('INSERT INTO products (name, description, price, image_url, category_id, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [
                    p.name,
                    p.description,
                    p.price,
                    p.image_url,
                    categoryId,
                    50
                ]);
                productId = insert.rows[0].id;
            }
            results.push({
                name: p.name,
                id: productId
            });
            // Update banners if this product corresponds to one
            if (p.name.includes("Apple iPhone 16")) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query("UPDATE banners SET link_url = $1 WHERE title LIKE '%Apple 16%'", [
                    `/product/${productId}`
                ]);
            }
            if (p.name.includes("iPad Pro")) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query("UPDATE banners SET link_url = $1 WHERE title LIKE '%iPad Pro%'", [
                    `/product/${productId}`
                ]);
            }
        // Assuming S25 Ultra might exist or will be added, but for now handling known ones.
        // If user mentioned S25 Ultra, it might be in the DB but not in my seed. 
        // I'll add S25 Ultra to the seed list to be sure.
        }
        // Explicitly update any existing S25 Ultra banner if found
        // First, let's ensure S25 Ultra product exists
        const s25 = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query("SELECT id FROM products WHERE name LIKE '%S25 Ultra%'");
        if (s25.rows.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query("UPDATE banners SET link_url = $1 WHERE title LIKE '%S25 Ultra%'", [
                `/product/${s25.rows[0].id}`
            ]);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            seeded: results
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d5578d3._.js.map