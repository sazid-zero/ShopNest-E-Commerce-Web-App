
import { useCartStore } from "@/lib/cart";
import { CreditCard, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "@/components/CheckoutModal";

export default function Cart() {
    const { cartItems, selectedItems, updateQuantity, removeFromCart, toggleItemSelection, selectAllItems, deselectAllItems } = useCartStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const total = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-white rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Your Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/50 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-300">Your cart is empty.</h2>
                        <p className="text-gray-400 mt-2">Explore our products and find something you like!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === cartItems.length}
                                    onChange={() => selectedItems.length === cartItems.length ? deselectAllItems() : selectAllItems()}
                                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="text-lg">Select All</label>
                            </div>
                            <button onClick={() => cartItems.forEach(item => selectedItems.includes(item.id) && removeFromCart(item.id))} className="text-red-500 hover:text-red-700">
                                Delete Selected
                            </button>
                        </div>
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleItemSelection(item.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-lg bg-white" />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-blue-400 font-bold text-xl mt-1">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-700/50 rounded-full p-1">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 rounded-full hover:bg-gray-600 transition-colors">
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 rounded-full hover:bg-gray-600 transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="p-3 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}

                        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
                            <div>
                                <p className="text-gray-400 text-lg">Subtotal</p>
                                <p className="text-3xl font-bold tracking-tight">${total.toFixed(2)}</p>
                            </div>
                            <button 
                                onClick={() => setIsCheckoutOpen(true)}
                                className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                                <CreditCard size={22} className="transition-transform duration-300 group-hover:rotate-[-15deg]" />
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </div>
    );
}
