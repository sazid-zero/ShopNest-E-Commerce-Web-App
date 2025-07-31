import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Send
} from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand & Description */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/img.png" alt="ShopNest Logo" className="h-7 w-7" />
                        <span className="text-xl font-bold text-white">ShopNest</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        Your one-stop destination for tech, fashion, and lifestyle. Fast shipping, secure checkout, and unbeatable deals.
                    </p>
                    <div className="flex gap-3 mt-4">
                        <a href="#" className="hover:text-white">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="hover:text-white">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="hover:text-white">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="hover:text-white">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                {/* Shop Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                        <li><a href="#" className="hover:text-white">Categories</a></li>
                        <li><a href="#" className="hover:text-white">Deals</a></li>
                        <li><a href="#" className="hover:text-white">Gift Cards</a></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Help Center</a></li>
                        <li><a href="#" className="hover:text-white">Track Order</a></li>
                        <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
                        <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-white">Contact Us</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                    <p className="text-sm text-gray-400 mb-3">
                        Subscribe to get the latest offers and product updates.
                    </p>
                    <form className="flex items-center bg-gray-800 rounded overflow-hidden">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-transparent px-3 py-2 text-sm text-white outline-none w-full"
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-1"
                        >
                            <Send size={16} /> Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Cookies</a>
                </div>
            </div>
        </footer>
    )
}