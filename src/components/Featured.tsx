"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const ProductCard = ({ title, description, image, href }: { title: string; description: string; image: string; href: string }) => (
    <div className="relative bg-gray-900 text-white w-full h-full rounded-lg shadow-[0_10px_10px_rgba(0,0,0,0.3)] hover:scale-103 transition-transform duration-300 overflow-hidden">
        <Link href={href} className="block w-full h-full">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 flex flex-col items-start p-4 bg-black/5">
                <div>
                    <h3 className="sm:text-md text-sm font-bold text-shadow-2xl truncate overflow-hidden whitespace-nowrap">{title}</h3>
                    <p className="sm:text-xs text-[10px] mt-1 text-shadow-2xl truncate overflow-hidden whitespace-nowrap">{description}</p>
                </div>
                <button className="sm:mt-20 mt-2 hover:scale-110 hover:bg-gray-800 transition-transform duration-300 text-white text-xs sm:text-sm p-2 rounded bg-black/20 backdrop-blur-xs">Shop Now</button>
            </div>
        </Link>
    </div>
);

const NewArrival = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 20]); // Slide down

    return (
        <motion.section ref={ref} style={{ opacity, y }}>
            <div className="px-6 mb-6">
                <span className="flex gap-1 items-center">
                    <img src="/bar.png" alt="bar" className="h-6 w-10" />
                    <p className="text-white font-bold text-lg">Featured</p>
                </span>
            </div>
            <div className="container w-[90%] bg-white rounded-lg p-4 sm:p-6 mb-4 mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center">
                        </div>
                        <ProductCard
                            title="PlayStation 5"
                            description="Black and White version of the PS5 coming out on sale."
                            image="/ps5.jpg"
                            href="/product/23"
                        />
                    </div>
                    <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-1 gap-4">
                        <ProductCard
                            title="Women's Collections"
                            description="Featured woman collections that give you another vibe."
                            image="/fashion.jpg"
                            href="/product/24"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <ProductCard
                                title="Alexa"
                                description="Amazon smart home."
                                image="/alexa.png"
                                href="/product/25"
                            />
                            <ProductCard
                                title="Perfume"
                                description="GUCCI intense OUD EDP."
                                image="/gucci.png"
                                href="/product/26"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default NewArrival;