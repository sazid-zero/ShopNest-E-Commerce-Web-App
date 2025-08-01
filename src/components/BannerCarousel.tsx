import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination,Navigation  } from "swiper/modules"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"
import "swiper/swiper-bundle.css"
import {ArrowLeft, ArrowRight} from "lucide-react";


const banners = [
    { src: "/Apple-16-series.webp", alt: "Latest Apple 16 Series smartphones" },
    { src: "/iPad-Pro-M4.webp", alt: "Powerful iPad Pro with M4 chip" },
    { src: "/Macbook-Air-M4.webp", alt: "Sleek Macbook Air with M4 chip" },
    { src: "/Samsung-S25-Ultra.webp", alt: "New Samsung S25 Ultra with advanced features" }
]

const banners2 = [
    { src: "/airpods-max-2.png", alt: "Latest Airpods" },
    { src: "/airpods-pro-3.jpg", alt: "Latest Airpods" },
    { src: "/airpods-pro.jpg", alt: "Latest Airpods" }
]

const banners3 = [
    { src: "/apple-watch-series-10.jpg", alt: "Latest Apple watch" },
    { src: "/apple-watch-series-9.jpg", alt: "Latest Apple watch" },
    { src: "/Apple-Watch-Series-7.jpg", alt: "Latest Apple watch" }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
}

const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
}

const slideRight = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 1, ease: cubicBezier(0.42, 0, 0.58, 1) }
}

export default function BannerCarousel() {
    return (
        <motion.div
            className="flex flex-col md:flex-row gap-4 sm:p-6 p-4 mt-2 items-stretch"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Main Banner */}
            <motion.div
                variants={childVariants}
                className="rounded-lg sm:p-4 overflow-hidden shadow-[0_10px_10px_rgba(0,0,0,0.3)] md:w-[70%] w-full"
            >
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}

                    autoplay={{delay: 4000, disableOnInteraction: false}}
                    loop={true}
                    pagination={{clickable: true, dynamicBullets: true}}
                    className="w-full rounded-lg"
                >

                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            {({isActive}) => (
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div
                                            key={banner.src}
                                            className="w-full h-full"
                                            initial={slideRight.initial}
                                            animate={slideRight.animate}
                                            exit={slideRight.exit}
                                            transition={slideRight.transition}
                                        >
                                            <img
                                                src={banner.src}
                                                alt={banner.alt}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </SwiperSlide>
                    ))}
                    <div
                        className="swiper-button-prev z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300">
                        <ArrowLeft/>
                    </div>

                    <div
                        className="swiper-button-next z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300">
                        <ArrowRight/>
                    </div>
                </Swiper>

            </motion.div>

            {/* Side Banners */}
            <motion.div
                variants={childVariants}
                className="flex sm:py-4 sm:pr-4 md:flex-col sm:gap-4 gap-2 md:w-[30%] w-full"
            >
                {[banners2, banners3].map((group, groupIdx) => (
                    <motion.div
                        key={groupIdx}
                        variants={childVariants}
                        className="rounded-lg overflow-hidden shadow-[0_10px_10px_rgba(0,0,0,0.3)] h-full w-[50%] md:w-full"
                    >
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            }}
                            autoplay={{
                                delay: 5000 + groupIdx * 1000,
                                disableOnInteraction: false
                            }}
                            loop={true}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            className="w-full h-full rounded-lg"
                        >
                            {group.map((banner, index) => (
                                <SwiperSlide key={index}>
                                    {({ isActive }) => (
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    key={banner.src}
                                                    className="w-full h-full"
                                                    initial={slideRight.initial}
                                                    animate={slideRight.animate}
                                                    exit={slideRight.exit}
                                                    transition={slideRight.transition}
                                                >
                                                    <img
                                                        src={banner.src}
                                                        alt={banner.alt}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </SwiperSlide>
                            ))}
                            <div
                                className="swiper-button-prev z-10 bg-white/10 hover:bg-white/30 backdrop-blur-xs text-white rounded-full w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center shadow-md transition-all duration-300">
                                <ArrowLeft style={{ width: "12px", height: "12px" }} />
                            </div>

                            <div
                                className="swiper-button-next z-10 bg-white/10 hover:bg-white/30 backdrop-blur-xs text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300">
                                <ArrowRight style={{ width: "12px", height: "12px" }}/>
                            </div>
                        </Swiper>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}