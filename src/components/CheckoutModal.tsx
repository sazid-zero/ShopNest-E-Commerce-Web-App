import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { useCartStore } from "@/lib/cart";
import { useOrdersStore } from "@/lib/orders";
import { useNavigate } from "react-router-dom";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { cartItems, selectedItems, clearSelectedItems } = useCartStore();
    const { addOrder } = useOrdersStore();
    const navigate = useNavigate();

    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    const total = selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (selectedCartItems.length === 0) {
            alert("Please select items to checkout.");
            return;
        }

        addOrder({
            items: selectedCartItems,
            total: total,
        });
        clearSelectedItems();
        onClose();
        navigate("/orders");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">Confirm Your Order</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <h3 className="text-lg font-semibold mb-2">Items:</h3>
                    {selectedCartItems.length > 0 ? (
                        <ul className="space-y-2">
                            {selectedCartItems.map(item => (
                                <li key={item.id} className="flex justify-between items-center text-gray-700">
                                    <span>{item.title} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No items selected for checkout.</p>
                    )}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xl font-bold text-gray-800">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <DialogFooter>
                    <button
                        onClick={handleCheckout}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Confirm Order
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}