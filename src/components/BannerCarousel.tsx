'use client';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react";
import Link from 'next/link';
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

export default function BannerCarousel() {
    const [banners, setBanners] = useState<{ image_url: string; title: string, link_url?: string }[]>([]);

    useEffect(() => {
        fetch("/api/banners")
            .then(res => res.json())
            .then(data => setBanners(data));
    }, []);

    const displayBanners = banners.length > 0 ? banners : [
        { image_url: "/Apple-16-series.webp", title: "Latest Apple 16 Series", link_url: "/product/19" },
        { image_url: "/iPad-Pro-M4.webp", title: "Powerful iPad Pro", link_url: "/product/20" }
    ];

    const banners2 = [
        { src: "/airpods-max-2.png", alt: "Latest Airpods", link_url: "/product/21" },
        { src: "/airpods-pro-3.jpg", alt: "Latest Airpods", link_url: "/product/22" },
        { src: "/airpods-pro.jpg", alt: "Latest Airpods", link_url: "/product/22" }
    ]

    const banners3 = [
        { src: "/apple-watch-series-10.jpg", alt: "Latest Apple watch", link_url: "/product/27" },
        { src: "/apple-watch-series-9.jpg", alt: "Latest Apple watch", link_url: "/product/27" },
        { src: "/Apple-Watch-Series-7.jpg", alt: "Latest Apple watch", link_url: "/product/27" }
    ]

    return (
        <div className="w-full max-w-[1440px] mx-auto pt-10">
            <motion.div
                className="flex flex-col md:flex-row gap-4 sm:p-6 p-4 items-stretch"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Main Banner */}
                <motion.div
                    variants={fadeInUp}
                    className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 md:w-[70%] w-full h-[300px] sm:h-[400px] md:h-[500px] relative group"
                >
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                        effect="fade"
                        navigation={{
                            nextEl: ".swiper-button-next-main",
                            prevEl: ".swiper-button-prev-main"
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="w-full h-full"
                    >
                        {displayBanners.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <Link href={banner.link_url || '#'} className="block w-full h-full relative">
                                    <img
                                        src={banner.image_url}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                                        <motion.h2 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-white text-2xl md:text-4xl font-bold"
                                        >
                                            {banner.title}
                                        </motion.h2>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                        
                        <div className="swiper-button-prev-main absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                            <ArrowLeft size={24} />
                        </div>
                        <div className="swiper-button-next-main absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                            <ArrowRight size={24} />
                        </div>
                    </Swiper>
                </motion.div>

                {/* Side Banners */}
                <motion.div
                    variants={fadeInUp}
                    className="flex sm:py-0 md:flex-col sm:gap-4 gap-4 md:w-[30%] w-full"
                >
                    {[banners2, banners3].map((group, groupIdx) => (
                        <motion.div
                            key={groupIdx}
                            className="rounded-2xl overflow-hidden shadow-xl shadow-blue-900/5 h-[150px] sm:h-[190px] md:h-1/2 w-full relative group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Swiper
                                modules={[Autoplay, Navigation, EffectFade]}
                                effect="fade"
                                navigation={{
                                    nextEl: `.swiper-button-next-side-${groupIdx}`,
                                    prevEl: `.swiper-button-prev-side-${groupIdx}`
                                }}
                                autoplay={{
                                    delay: 4500 + groupIdx * 1000,
                                    disableOnInteraction: false
                                }}
                                loop={true}
                                className="w-full h-full"
                            >
                                {group.map((banner, index) => (
                                    <SwiperSlide key={index}>
                                        <Link href={banner.link_url || '#'} className="block w-full h-full relative">
                                            <img
                                                src={banner.src}
                                                alt={banner.alt}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                                <div
                                    className={`swiper-button-prev-side-${groupIdx} absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-xs text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100`}>
                                    <ArrowLeft style={{ width: "16px", height: "16px" }} />
                                </div>

                                <div
                                    className={`swiper-button-next-side-${groupIdx} absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-xs text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100`}>
                                    <ArrowRight style={{ width: "16px", height: "16px" }}/>
                                </div>
                            </Swiper>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Download Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-row gap-4 mt-8 justify-center w-full items-center"
            >
                <a
                    href="#"
                    className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <img src="/apple.png" alt="Apple Store" className="h-6 w-6 mr-3" />
                    <div>
                        <p className="text-[10px] opacity-75 uppercase tracking-wide">Download on the</p>
                        <p className="text-lg font-bold leading-none">App Store</p>
                    </div>
                </a>
                <a
                    href="#"
                    className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <img src="/google-play.png" alt="Google Play" className="h-6 w-6 mr-3" />
                    <div>
                        <p className="text-[10px] opacity-75 uppercase tracking-wide">Get it on</p>
                        <p className="text-lg font-bold leading-none">Google Play</p>
                    </div>
                </a>
            </motion.div>
        </div>
    )
}