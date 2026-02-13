'use client';
import { useOrdersStore } from "@/lib/orders";
import { Package, Clock, CheckCircle2, Truck, ChevronDown, ChevronUp, Box, MapPin, ReceiptText } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Orders() {
    const { orders } = useOrdersStore();
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'processing': return <Clock size={16} className="text-blue-500" />;
            case 'shipped': return <Truck size={16} className="text-orange-500" />;
            case 'delivered': return <CheckCircle2 size={16} className="text-green-500" />;
            default: return <Package size={16} className="text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12 sm:px-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
                        <Box size={28} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Order History</h1>
                </div>

                {orders.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm"
                    >
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ReceiptText size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">No orders found</h2>
                        <p className="text-gray-500 mt-2">You haven't placed any orders yet. Start shopping to see them here!</p>
                        <a href="/products" className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                            Start Shopping
                        </a>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <div 
                                    onClick={() => toggleOrder(order.id)}
                                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                                            <ReceiptText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                                            <p className="text-lg font-black text-gray-900">{order.id}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Placed On</p>
                                            <p className="text-sm font-bold text-gray-700">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                                            <p className="text-lg font-black text-blue-600">৳{order.total.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                            {getStatusIcon('processing')}
                                            <span className="text-[10px] font-black uppercase text-blue-600">Processing</span>
                                        </div>
                                        {expandedOrder === order.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedOrder === order.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-gray-50 bg-gray-50/50"
                                        >
                                            <div className="p-8 space-y-8">
                                                {/* Items */}
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Ordered Items</h3>
                                                    <div className="space-y-4">
                                                        {order.items.map(item => (
                                                            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                                                                <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 border border-gray-100 shrink-0">
                                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                                                </div>
                                                                <div className="grow">
                                                                    <p className="font-bold text-gray-900">{item.title}</p>
                                                                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="font-black text-gray-900">৳{(item.price * item.quantity).toFixed(2)}</p>
                                                                    <p className="text-[10px] text-gray-400 font-bold">৳{item.price.toFixed(2)} / item</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Details */}
                                                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Shipping Address</h3>
                                                        <div className="flex gap-3 text-sm text-gray-600">
                                                            <MapPin size={18} className="text-blue-500 shrink-0" />
                                                            <p>123 Customer Street, Apt 4B<br />Dhaka, 1205, Bangladesh</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4 bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
                                                        <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-200">Payment Breakdown</h3>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span>Item Subtotal</span>
                                                                <span className="font-bold">৳{order.total.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Shipping</span>
                                                                <span className="font-bold">FREE</span>
                                                            </div>
                                                            <div className="border-t border-indigo-500 pt-2 flex justify-between text-lg">
                                                                <span className="font-bold text-indigo-100">Paid Total</span>
                                                                <span className="font-black">৳{order.total.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}