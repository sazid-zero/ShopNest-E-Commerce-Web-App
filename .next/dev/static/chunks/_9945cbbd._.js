(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/wishlist.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWishlistStore",
    ()=>useWishlistStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useWishlistStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        wishlistItems: [],
        toggleWishlist: (productId)=>set((state)=>{
                const existingItem = state.wishlistItems.find((item)=>item === productId);
                if (existingItem) {
                    return {
                        wishlistItems: state.wishlistItems.filter((item)=>item !== productId)
                    };
                }
                return {
                    wishlistItems: [
                        ...state.wishlistItems,
                        productId
                    ]
                };
            })
    }), {
    name: 'wishlist-storage'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wishlist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wishlist.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductCard({ product }) {
    _s();
    const { addToCart, cartItems, toggleItemSelection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    const { toggleWishlist, wishlistItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wishlist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isOutOfStock = product.stock <= 0;
    const getCartCount = ()=>{
        const item = cartItems.find((item)=>item.id === product.id);
        return item ? item.quantity : 0;
    };
    const handleBuyNow = (e)=>{
        e.preventDefault();
        if (isOutOfStock) return;
        addToCart(product);
        toggleItemSelection(product.id);
        router.push('/cart');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: `/product/${product.id}`,
        className: "block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `min-w-[240px] bg-gray-50 rounded-md p-4 flex flex-col shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group mb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: product.image,
                            alt: product.title,
                            className: "w-full h-44 object-contain rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 48,
                            columnNumber: 17
                        }, this),
                        isOutOfStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider",
                            children: "Out of Stock"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 55,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded",
                            children: [
                                "-",
                                product.discount,
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this),
                        !isOutOfStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.preventDefault();
                                addToCart(product);
                            },
                            className: "absolute bottom-0 left-0 right-0 h-8 w-full flex items-center justify-center bg-black/50 backdrop-blur-xs bg-opacity-0 group-hover:bg-opacity-90 text-white text-sm font-medium rounded transition-all duration-500 opacity-0 group-hover:opacity-100 hover:scale-105",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    size: 16,
                                    className: "mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductCard.tsx",
                                    lineNumber: 68,
                                    columnNumber: 25
                                }, this),
                                " Add to Cart"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this),
                        isOutOfStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-700 font-black text-xs border-2 border-red-700 px-2 py-1 rounded rotate-[-15deg] shadow-sm",
                                children: "STOCK OUT"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 74,
                                columnNumber: 26
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 47,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    className: "text-sm font-medium text-gray-800 line-clamp-2",
                    children: product.title
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 79,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-blue-600 text-lg font-bold",
                    children: [
                        "৳",
                        product.price
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 80,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-gray-500 line-through",
                    children: [
                        "৳",
                        product.original
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 81,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1 text-yellow-500 text-sm mt-1",
                    children: [
                        [
                            ...Array(5)
                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                size: 14,
                                fill: i + 1 <= Math.floor(product.rating) ? "currentColor" : i < product.rating ? "currentColor" : "none",
                                stroke: "currentColor"
                            }, i, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 85,
                                columnNumber: 21
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-600 text-xs",
                            children: [
                                "(",
                                product.reviews,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 98,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 83,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: " mt-3 flex gap-2 items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            disabled: isOutOfStock,
                            onClick: handleBuyNow,
                            className: `w-full px-3 py-2 text-xs font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:scale-105 focus:ring-blue-400'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block align-middle",
                                children: isOutOfStock ? 'Stock Out' : 'Buy Now'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 105,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 101,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 items-center justify-center",
                            children: [
                                !isOutOfStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        addToCart(product);
                                    },
                                    className: "bg-green-100 p-1 rounded-full shadow relative transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                            size: 16,
                                            className: "text-green-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductCard.tsx",
                                            lineNumber: 114,
                                            columnNumber: 29
                                        }, this),
                                        getCartCount() > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1 rounded-full",
                                            children: getCartCount()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductCard.tsx",
                                            lineNumber: 116,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ProductCard.tsx",
                                    lineNumber: 110,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        toggleWishlist(product.id);
                                    },
                                    className: "bg-red-100 p-1 rounded-full shadow transition hover:scale-110 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        size: 16,
                                        className: wishlistItems.includes(product.id) ? "text-red-400 fill-red-400" : "text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 127,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductCard.tsx",
                                    lineNumber: 123,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 108,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 100,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProductCard.tsx",
            lineNumber: 44,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ProductCard.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
_s(ProductCard, "TEosxZoQCczqEH9bGfkJg2JcUsM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wishlist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlistStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/product/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProductDetails() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params.id;
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [similarItems, setSimilarItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetails.useEffect": ()=>{
            if (!id) return;
            setLoading(true);
            fetch(`/api/products/${id}`).then({
                "ProductDetails.useEffect": (res)=>res.json()
            }["ProductDetails.useEffect"]).then({
                "ProductDetails.useEffect": (data)=>{
                    setProduct(data);
                    if (data.category) {
                        fetch(`/api/products?category=${encodeURIComponent(data.category)}`).then({
                            "ProductDetails.useEffect": (res)=>res.json()
                        }["ProductDetails.useEffect"]).then({
                            "ProductDetails.useEffect": (items)=>setSimilarItems(items.filter({
                                    "ProductDetails.useEffect": (p)=>p.id !== data.id
                                }["ProductDetails.useEffect"]))
                        }["ProductDetails.useEffect"]);
                    }
                    setLoading(false);
                }
            }["ProductDetails.useEffect"]).catch({
                "ProductDetails.useEffect": ()=>setLoading(false)
            }["ProductDetails.useEffect"]);
        }
    }["ProductDetails.useEffect"], [
        id
    ]);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-10 text-center",
        children: "Loading product details..."
    }, void 0, false, {
        fileName: "[project]/src/app/product/[id]/page.tsx",
        lineNumber: 34,
        columnNumber: 25
    }, this);
    if (!product) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-10 text-center text-red-500",
        children: "Product not found"
    }, void 0, false, {
        fileName: "[project]/src/app/product/[id]/page.tsx",
        lineNumber: 35,
        columnNumber: 26
    }, this);
    const isOutOfStock = product.stock <= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: product.image,
                        alt: product.title,
                        className: "w-full rounded-lg shadow"
                    }, void 0, false, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold mb-2",
                                children: product.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 46,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-4",
                                children: product.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-semibold text-indigo-600",
                                children: [
                                    "৳",
                                    product.price
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: isOutOfStock,
                                onClick: ()=>addToCart(product.id),
                                className: `mt-4 px-6 py-2 rounded transition-colors ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`,
                                children: isOutOfStock ? 'Stock Out' : 'Add to Cart'
                            }, void 0, false, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/product/[id]/page.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold mb-4",
                        children: "Customer Reviews"
                    }, void 0, false, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: [
                            "(",
                            product.reviews,
                            " reviews)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/product/[id]/page.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold mb-4",
                        children: "Similar Items"
                    }, void 0, false, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6",
                        children: similarItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                product: item
                            }, item.id, false, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/product/[id]/page.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/product/[id]/page.tsx",
        lineNumber: 41,
        columnNumber: 9
    }, this);
}
_s(ProductDetails, "N1vu4Oy3qpWUfhmU469FdfEUNOI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = ProductDetails;
var _c;
__turbopack_context__.k.register(_c, "ProductDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
]);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_9945cbbd._.js.map