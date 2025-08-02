type CartItemProps = {
    item: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        image: string;
    };
    updateQuantity: (id: number, delta: number) => void;
};

export default function CartItem({ item, updateQuantity }: CartItemProps) {
    return (
        <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 bg-gray-600 rounded"
                    >
                        −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 bg-gray-600 rounded"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}