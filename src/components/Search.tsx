import { useState } from "react"
import { SearchIcon, X } from "lucide-react"

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="hidden sm:flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md text-xs">
                <SearchIcon className="w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full outline-none "
                />
            </div>

            {/* Search icon for small screens */}
            <button
                onClick={() => setIsOpen(true)}
                className="sm:hidden p-2 rounded-full hover:bg-gray-300 transition"
            >
                <SearchIcon className="w-6 h-6 text-white" />
            </button>

            {/* Modal for small screens */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-center sm:justify-start items-start pt-6 px-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-4 shadow-lg relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 rounded-md px-3 py-2">
                            <SearchIcon className="w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}