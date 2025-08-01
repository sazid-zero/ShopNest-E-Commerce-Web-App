import BannerCarousel from "@/components/BannerCarousel.tsx";
import FlashSale from "@/components/FlashSale.tsx";
import CategoryGrid from "@/components/ui/Catagories.tsx";
import BestSelling from "@/components/BestSeller.tsx";
import ServiceHighlights from "@/components/Services.tsx";
import BestSellingStores from "@/components/BestStores.tsx";
import Featured from "@/components/Featured.tsx";

export default function Landing(){
    return(
        <div >
            <BannerCarousel/>
            <Featured/>
            <FlashSale/>
            <BestSelling />
            <CategoryGrid />
            <BestSellingStores />
            <ServiceHighlights/>
        </div>
    );
}