import { MapPin, Search } from "lucide-react"

export default function StoreBanner() {
    return (
        <section className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-xl px-6 py-8 sm:px-10 sm:py-10 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Left: Info */}
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold">20+ Physical Stores</h3>
                        <p className="text-sm sm:text-base text-white/90">
                            Visit our store & get your desired IT product!
                        </p>
                    </div>
                </div>

                {/* Right: CTA Button */}
                <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-sm sm:text-base px-4 py-2 rounded-full shadow hover:bg-blue-100 transition-all"
                >
                    <Search size={16} /> Find Our Store
                </a>
            </div>
        </section>
    )
}