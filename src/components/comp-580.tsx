'use client';
import {
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  ShoppingBag,
  LayoutGrid,
  Package,
  Phone,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchBar from "@/components/Search";
import { categories } from "@/lib/categories";
import { useAuth } from "@/providers/AuthProvider";
import { LogOut, Settings } from "lucide-react";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: ShoppingBag },
    { href: "/shops", label: "Shops", icon: Package },
    { href: "/orders", label: "Orders", icon: Package },
    {
      label: "Contact",
      icon: Phone,
      isScrollLink: true,
      targetId: "footer-section",
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <header className="border-b px-4 md:px-6 fixed top-0 w-full z-50 bg-black">
      <div className="relative flex h-16 items-center justify-between">
        {/* Left side: Mobile Menu, and Desktop Nav */}
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 lg:hidden hover:bg-transparent focus:bg-transparent active:bg-transparent"
                variant="ghost"
                size="icon"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={isOpen ? "x" : "menu"}
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? (
                      <X className="size-8 text-white" />
                    ) : (
                      <Menu className="size-8 text-white" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-56 p-2 lg:hidden bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-y-auto max-h-[80vh]"
            >
              <motion.div
                variants={{ menuVariants }}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-1"
              >
                {navigationLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.isScrollLink ? "#" : link.href}
                    onClick={(e) => {
                      if (link.isScrollLink) {
                        e.preventDefault();
                        document.getElementById(link.targetId)?.scrollIntoView({ behavior: "smooth" });
                        setIsOpen(false);
                      }
                    }}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <link.icon className="size-4 text-gray-500" />
                    {link.label}
                  </motion.a>
                ))}
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center justify-between w-full gap-3 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutGrid className="size-4 text-gray-500" />
                      Categories
                    </div>
                    <ChevronDown
                      className={`size-4 text-gray-500 transition-transform ${
                        isCategoryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-1 pl-8"
                      >
                        {categories.map((category) => (
                          <a
                            key={category.name}
                            onClick={() => {
                              handleCategoryClick(category.name);
                              document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            }}
                            className="p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {category.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <div className="h-px bg-gray-200 my-1"></div>
                <motion.a
                  href="/wishlist"
                  variants={itemVariants}
                  className="flex items-center gap-3 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Heart className="size-4 text-gray-500" />
                  Wishlist
                </motion.a>
                <motion.a
                  href="/cart"
                  variants={itemVariants}
                  className="flex items-center gap-3 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ShoppingCart className="size-4 text-gray-500" />
                  Cart
                </motion.a>
              </motion.div>
            </PopoverContent>
          </Popover>

          {/* Logo (Desktop) */}
          <a href="/" className="hidden lg:flex items-center gap-0">
            <img src="/img.png" alt="ShopNest Logo" className="h-7 w-7" />
            <span className="font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 bg-clip-text">
              ShopNest
            </span>
          </a>

          {/* Desktop Navigation menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.isScrollLink ? undefined : link.href}
                    onClick={(e) => {
                      if (link.isScrollLink) {
                        e.preventDefault();
                        document.getElementById(link.targetId)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-white hover:text-primary py-1.5 font-medium text-sm"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-primary py-1.5 font-medium text-sm flex items-center gap-1"
                    >
                      Categories <ChevronDown className="size-4 mt-1" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-0">
                    <div className="flex flex-col gap-1">
                      {categories.map((category) => (
                        <a
                          key={category.name}
                          onClick={() => {
                            handleCategoryClick(category.name);
                            // Close the popover after clicking a category
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                          }}
                          className="p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Centered Logo (Mobile) */}
        <div className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <a href="/" className="flex items-center gap-0">
            <img src="/img.png" alt="ShopNest Logo" className="h-7 w-7" />
            <span className="font-bold text-xl text-transparent bg-linear-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 bg-clip-text">
              ShopNest
            </span>
          </a>
        </div>

        {/* Center: Search form (Desktop) */}
        <div className="flex-1 justify-center px-4 hidden lg:flex">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end gap-2">
          {/* Search and Sign In (Mobile) */}
          <div className="flex lg:hidden items-center gap-2">
            <SearchBar />
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" className="rounded-full bg-blue-50 text-blue-600 border border-blue-100 p-1">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="size-5" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-0">
                  <div className="p-3 border-b border-gray-100 mb-2">
                    <p className="text-sm font-black text-gray-900 truncate">{user.displayName || 'User'}</p>
                    <p className="text-[10px] font-bold text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                asChild
                size="sm"
                className="text-sm px-3 py-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
              >
                <a href="/login">
                  <User className="size-4" />
                  <span className="sr-only">Sign In</span>
                </a>
              </Button>
            )}
          </div>

          {/* Wishlist, Cart, Sign In (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-white">
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <a href="/wishlist" className="flex items-center gap-1">
                <Heart className="size-4" />
                Wishlist
              </a>
            </Button>

            <Button asChild variant="ghost" size="sm" className="text-sm">
              <a href="/cart" className="flex items-center gap-1">
                <ShoppingCart className="size-4" />
                Cart
              </a>
            </Button>
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors p-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User className="size-5" />
                      )}
                    </div>
                    <span className="font-bold text-sm hidden xl:block">{user.displayName || 'Account'}</span>
                    <ChevronDown className="size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-64 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-0 ring-1 ring-black/5">
                  <div className="flex items-center gap-3 p-3 border-b border-gray-100 mb-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-black">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-gray-900 truncate">{user.displayName || 'Member'}</p>
                      <p className="text-[10px] font-bold text-gray-400 truncate tracking-tight">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <a href="/dashboard" className="flex items-center gap-3 p-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors group">
                      <Settings className="size-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      Dashboard
                    </a>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors group"
                    >
                      <LogOut className="size-4 opacity-70 group-hover:scale-110 transition-transform" />
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                asChild
                size="sm"
                className="text-sm px-3 py-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
              >
                <a href="/login" className="flex items-center gap-2">
                  <User className="size-4" />
                  <span className="font-semibold tracking-wide">Sign In</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}