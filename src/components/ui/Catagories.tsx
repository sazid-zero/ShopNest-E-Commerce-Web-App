import {
    Smartphone,
    Laptop,
    Headphones,
    Camera,
    Gamepad2,
    Tv,
    Watch,
    Printer,
    Drone,
    Home,
    ShoppingBag,
    MonitorSmartphone,
} from "lucide-react"

const categories = [
    { name: "Phones", icon: Smartphone },
    { name: "Computers", icon: Laptop },
    { name: "Headphones", icon: Headphones },
    { name: "Camera", icon: Camera },
    { name: "Gaming", icon: Gamepad2 },
    { name: "TV & Audio", icon: Tv },
    { name: "SmartWatch", icon: Watch },
    { name: "Printers", icon: Printer },
    { name: "Drones", icon: Drone },
    { name: "Smart Home", icon: Home },
    { name: "Accessories", icon: ShoppingBag },
    { name: "Wearables", icon: MonitorSmartphone },
]

export default function CategoryGrid() {
    return (
        <section className="py-10 px-6 sm:px-10 bg-white">
            <span className="flex gap-1 items-center mb-12">
          <img src="/bar3.png" alt="bar" className="h-7 w-10" />
          <p className="text-gray-900 font-bold text-2xl ">Browse By Category</p>
        </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map(({ name, icon: Icon }, idx) => (
                    <button
                        key={idx}
                        className="flex flex-col items-center justify-center bg-gray-100 hover:bg-blue-100 hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] rounded-lg p-4 transition-all group"
                    >
                        <Icon className="text-blue-600 h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
              {name}
            </span>
                    </button>
                ))}
            </div>
        </section>
    )
}