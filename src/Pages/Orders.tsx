import { useOrdersStore } from "@/lib/orders";

export default function Orders() {
    const { orders } = useOrdersStore();

    return (
        <div className="min-h-screen bg-white rounded-t-3xl sm:mt-12 mt-6 mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Your Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/50 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-300">You haven't placed any orders yet.</h2>
                        <p className="text-gray-400 mt-2">Start shopping to see your orders here!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order.id} className="bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Order ID: {order.id}</h2>
                                    <span className="text-gray-400 text-sm">{new Date(order.date).toLocaleString()}</span>
                                </div>
                                <ul className="space-y-2 mb-4">
                                    {order.items.map(item => (
                                        <li key={item.id} className="flex justify-between items-center text-gray-300">
                                            <span>{item.title} (x{item.quantity})</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between items-center border-t border-gray-700 pt-4 text-xl font-bold">
                                    <span>Total:</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}