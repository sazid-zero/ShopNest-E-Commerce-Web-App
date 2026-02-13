"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useCartStore } from "@/lib/cart";
import { useOrdersStore } from "@/lib/orders";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShoppingBag, Receipt, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { cartItems, selectedItems, clearSelectedItems } = useCartStore();
    const { addOrder } = useOrdersStore();
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);

    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    const subtotal = selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 60;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    const handleCheckout = () => {
        if (selectedCartItems.length === 0) return;

        addOrder({
            items: selectedCartItems,
            total: total,
        });
        
        setIsSuccess(true);
        setTimeout(() => {
            clearSelectedItems();
            onClose();
            setIsSuccess(false);
            router.push("/orders");
        }, 3000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] bg-white p-0 rounded-3xl overflow-hidden border-none shadow-2xl">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div 
                            key="checkout-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="p-8"
                        >
                            <DialogHeader className="mb-8">
                                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                                    <ShoppingBag size={28} className="text-blue-600" />
                                </div>
                                <DialogTitle className="text-3xl font-black text-gray-900 leading-tight">Review Order</DialogTitle>
                                <p className="text-gray-500 font-medium">Finalize your purchase and securely checkout.</p>
                            </DialogHeader>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                                {selectedCartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="w-12 h-12 rounded-xl bg-white p-1 border border-gray-100 shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="grow">
                                            <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                                            <p className="text-xs text-blue-600 font-bold">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-black text-gray-900">৳{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl shadow-gray-200">
                                <div className="space-y-3 mb-6 pb-6 border-b border-white/10 text-sm font-bold text-gray-400">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="text-white">৳{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                                            {shipping === 0 ? 'FREE' : `৳${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax (5%)</span>
                                        <span className="text-white">৳{tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[2px]">Total Payable</p>
                                        <p className="text-4xl font-black">৳{total.toFixed(2)}</p>
                                    </div>
                                    <ShieldCheck size={32} className="text-blue-400 opacity-50" />
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/40 transition-all flex items-center justify-center gap-3 group active:scale-95"
                                >
                                    <CreditCard size={20} className="group-hover:-rotate-12 transition-transform" />
                                    Confirm & Pay
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 text-center"
                        >
                            <div className="relative inline-block mb-8">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                                    className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl shadow-green-200"
                                >
                                    <CheckCircle2 size={48} className="text-white" />
                                </motion.div>
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-4 bg-green-500 rounded-full -z-10"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-4">Payment Success!</h2>
                            <p className="text-gray-500 font-bold mb-8">Your order has been placed and is being processed. Redirecting to your orders...</p>
                            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs font-black text-gray-400 uppercase tracking-widest">
                                <Receipt size={14} />
                                Order #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
