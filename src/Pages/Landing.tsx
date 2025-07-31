import BannerCarousel from "@/components/BannerCarousel.tsx";
import NavBar from "@/components/comp-580.tsx";
import FlashSale from "@/components/FlashSale.tsx";
import NewArrival from "@/components/Featured.tsx";
import Footer from "@/components/footer.tsx";
import CategoryGrid from "@/components/ui/Catagories.tsx";
import BestSelling from "@/components/BestSeller.tsx";
import ServiceHighlights from "@/components/Services.tsx";

export default function Landing(){
    return(
        <div>
            <NavBar/>
            <main className="pt-16">
                <BannerCarousel/>
                <NewArrival/>
                <FlashSale/>
                <BestSelling/>
                <CategoryGrid/>
                <ServiceHighlights/>
                <Footer/>
            </main>
        </div>
    );
}