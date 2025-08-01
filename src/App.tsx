import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing.tsx";
import Products from "./Pages/Products.tsx";
import NavBar from "@/components/comp-580.tsx";
import Footer from "@/components/footer.tsx";
import ScrollToTop from "@/components/ScrollToTop.tsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-gradient-to-l from-blue-950 to-black min-h-screen">
        <NavBar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;