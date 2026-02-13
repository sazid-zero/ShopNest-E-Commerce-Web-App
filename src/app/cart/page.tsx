'use client';
import { useCartStore } from "@/lib/cart";
import { CreditCard, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState, useMemo } from "react";
import CheckoutModal from "@/components/CheckoutModal";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Cart() {
    const { cartItems, selectedItems, updateQuantity, removeFromCart, toggleItemSelection, selectAllItems, deselectAllItems } = useCartStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const subtotal = useMemo(() => cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price * item.quantity, 0), [cartItems, selectedItems]);

    const shipping = subtotal > 500 ? 0 : (subtotal === 0 ? 0 : 60);
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6 sm:p-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                        <ShoppingBag size={28} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Bag</h1>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm"
                    >
                        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={48} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Your bag is empty</h2>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Looks like you haven't added anything to your bag yet. Let's find something amazing!</p>
                        <Link href="/products" className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex justify-between items-center px-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                                        onChange={() => selectedItems.length === cartItems.length ? deselectAllItems() : selectAllItems()}
                                        className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">Select All ({cartItems.length})</span>
                                </label>
                                {selectedItems.length > 0 && (
                                    <button 
                                        onClick={() => cartItems.forEach(item => selectedItems.includes(item.id) && removeFromCart(item.id))}
                                        className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        Remove Selected
                                    </button>
                                )}
                            </div>

                            <AnimatePresence mode="popLayout">
                                {cartItems.map(item => (
                                    <motion.div 
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:border-blue-200 transition-all"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => toggleItemSelection(item.id)}
                                            className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        
                                        <div className="w-24 h-24 rounded-2xl bg-gray-50 p-2 border border-gray-100 shrink-0 group-hover:bg-white transition-colors">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                        </div>

                                        <div className="grow">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                                            <p className="text-blue-600 font-extrabold text-xl mt-1">৳{item.price.toFixed(2)}</p>
                                            
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1 border border-gray-200">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6 lg:sticky lg:top-10">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    Order Summary
                                </h2>
                                
                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-bold">৳{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>
                                            {shipping === 0 ? 'FREE' : `৳${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (5%)</span>
                                        <span className="font-bold">৳{tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</p>
                                        <p className="text-3xl font-black text-gray-900">৳{total.toFixed(2)}</p>
                                    </div>
                                    <div className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded">BDT</div>
                                </div>

                                <button 
                                    disabled={selectedItems.length === 0}
                                    onClick={() => setIsCheckoutOpen(true)}
                                    className="w-full group flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    <CreditCard size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
                                    Proceed to Checkout
                                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                                
                                <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">
                                    Secure SSL encrypted transaction
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center space-y-2">
                                    <ShieldCheck size={20} className="text-blue-500 mx-auto" />
                                    <span className="text-[8px] font-black uppercase text-gray-500 block">Secured</span>
                                </div>
                                <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center space-y-2">
                                    <Truck size={20} className="text-green-500 mx-auto" />
                                    <span className="text-[8px] font-black uppercase text-gray-500 block">Fast Delivery</span>
                                </div>
                                <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center space-y-2">
                                    <RotateCcw size={20} className="text-orange-500 mx-auto" />
                                    <span className="text-[8px] font-black uppercase text-gray-500 block">Returnable</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </div>
    );
}

