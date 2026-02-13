import {Inter} from "next/font/google";
import "../index.css";
import NavBar from "@/components/comp-580";
import Footer from "@/components/footer";
import CartSync from "@/components/CartSync";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`} suppressHydrationWarning={true}>
      <AuthProvider>
        <div className="bg-linear-to-l from-blue-950 to-black min-h-screen">
            <NavBar />
            <CartSync />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
        </div>
      </AuthProvider>
      </body>
    </html>
  );
}
