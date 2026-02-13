"use client";
import BannerCarousel from "@/components/BannerCarousel";
import FlashSale from "@/components/FlashSale";
import CategoryGrid from "@/components/ui/Catagories";
import BestSelling from "@/components/BestSeller";
import ServiceHighlights from "@/components/Services";
import BestSellingStores from "@/components/BestStores";
import Featured from "@/components/Featured";
import LandingAnimationWrapper from "@/components/LandingAnimationWrapper";
import SectionAnimator from "@/components/SectionAnimator";
import Lenis from "lenis"
import { useEffect } from "react";

export default function Landing(){

    useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
    return(
        <LandingAnimationWrapper>
            <div className="w-full h-10 bg-blue-200 text-black text-xs font-semibold leading-tight p-4 flex justify-center items-center overflow-hidden">
                Exclusive cashback offers on Apple products! Get upto -20% OFF and Free Delivery
            </div>
            <SectionAnimator
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <BannerCarousel/>
            </SectionAnimator>
            <SectionAnimator
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                exit={{ opacity: 0, rotate: -5 }}
            >
                <Featured/>
            </SectionAnimator>
                <div className="bg-white rounded-t-3xl">
                    <FlashSale/>
                    <BestSelling />
                    <CategoryGrid />
                    <BestSellingStores />
                    <ServiceHighlights/>
                </div>
        </LandingAnimationWrapper>
    );
}