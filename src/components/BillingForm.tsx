export default function BillingForm() {
    return (
        <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email Address" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Billing Address" className="w-full p-2 border rounded" />
            <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
            <div className="flex gap-2">
                <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
                <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded" />
            </div>
        </form>
    );
}