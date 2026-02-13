import { Truck, Headphones, ShieldCheck } from "lucide-react"
import StoreBanner from "@/components/StoreBanner";

export default function ServiceHighlights() {
    return (
        <section className="py-10 px-6 sm:px-10 ">
            <span className="flex gap-1 items-center mb-12 w-full justify-center">
                <p className="text-gray-900 font-bold text-2xl mb-6">Why Choose Us?</p>
            </span>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-24">
                {/* Delivery */}
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Truck className="text-blue-600 h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 uppercase">Free and Fast Delivery</h4>
                    <p className="text-sm text-gray-500">Free delivery for all orders over ৳140.</p>
                </div>

                {/* Customer Service */}
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <Headphones className="text-blue-600 h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 uppercase">24/7 Customer Service</h4>
                    <p className="text-sm text-gray-500">Friendly 24/7 customer support.</p>
                </div>

                {/* MoneyBack Guarantee */}
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <ShieldCheck className="text-blue-600 h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 uppercase">Money Back Guarantee</h4>
                    <p className="text-sm text-gray-500">We return money within 30 days.</p>
                </div>

            </div>
            <div className="max-w-7xl mx-auto">
                <StoreBanner/>
            </div>

        </section>
    )
}