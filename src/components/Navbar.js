"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isAuthenticated, userType, name } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/marketplace", label: "Marketplace" },
        { href: "/about", label: "About" },
    ];

    const userNavLinks = isAuthenticated ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/my-purchases", label: "My Purchases" },
        { href: "/profile", label: "Profile" },
    ] : [];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                pathname === "/" 
                    ? "bg-white/95 backdrop-blur-md shadow-luxury border-b border-neutral-200/50"
                    : (isScrolled 
                        ? "bg-white/95 backdrop-blur-md shadow-luxury border-b border-neutral-200/50" 
                        : "bg-transparent")
            }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-3"
                    >
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="relative bg-white rounded-xl p-1 shadow-sm">
                                <img
                                    src="/logo.png"
                                    alt="CraftChain"
                                    className="w-10 h-10 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div 
                                    className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg hidden"
                                    style={{ display: 'none' }}
                                >
                                    C
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-2xl font-bold leading-tight ${
                                    pathname === "/" 
                                        ? "text-[#8B4513]" 
                                        : (isScrolled ? "text-[#8B4513]" : "text-white")
                                } font-fancy`}>
                                    CraftChain
                                </span>
                                <span className={`text-xs font-medium leading-none hidden sm:block ${
                                    pathname === "/" 
                                        ? "text-[#A0522D] opacity-80" 
                                        : (isScrolled ? "text-[#A0522D] opacity-80" : "text-orange-200 opacity-90")
                                }`}>
                                    Authentic Indian Crafts
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <motion.div
                                key={link.href}
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`font-medium transition-colors duration-200 ${
                                        pathname === link.href
                                            ? (pathname === "/" 
                                                ? "text-primary-600" 
                                                : (isScrolled ? "text-primary-600" : "text-primary-200"))
                                            : (pathname === "/" 
                                                ? "text-neutral-700 hover:text-primary-600" 
                                                : (isScrolled 
                                                    ? "text-neutral-700 hover:text-primary-600" 
                                                    : "text-white hover:text-primary-200"))
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* User Menu / Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                {userNavLinks.map((link) => (
                                    <motion.div
                                        key={link.href}
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`font-medium transition-colors duration-200 ${
                                                pathname === link.href
                                                    ? (pathname === "/" 
                                                        ? "text-primary-600" 
                                                        : (isScrolled ? "text-primary-600" : "text-primary-200"))
                                                    : (pathname === "/" 
                                                        ? "text-neutral-700 hover:text-primary-600" 
                                                        : (isScrolled 
                                                            ? "text-neutral-700 hover:text-primary-600" 
                                                            : "text-white hover:text-primary-200"))
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                <div className="flex items-center space-x-3">
                                    <div className={`text-sm font-medium ${
                                        pathname === "/" 
                                            ? "text-neutral-700" 
                                            : (isScrolled ? "text-neutral-700" : "text-white")
                                    }`}>
                                        Welcome, {name || "User"}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-200 shadow-elegant"
                                    >
                                        Logout
                                    </motion.button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/login"
                                        className={`px-4 py-2 font-medium rounded-xl transition-colors duration-200 ${
                                            pathname === "/" 
                                                ? "text-neutral-700 hover:text-primary-600 hover:bg-primary-50" 
                                                : (isScrolled 
                                                    ? "text-neutral-700 hover:text-primary-600 hover:bg-primary-50" 
                                                    : "text-white hover:bg-white/10")
                                        }`}
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/signup"
                                        className="px-6 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-200 shadow-elegant"
                                    >
                                        Sign Up
                                    </Link>
                                </motion.div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${
                            pathname === "/" 
                                ? "text-neutral-700 hover:bg-neutral-100" 
                                : (isScrolled 
                                    ? "text-neutral-700 hover:bg-neutral-100" 
                                    : "text-white hover:bg-white/10")
                        }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-neutral-200/20 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-luxury mt-4"
                        >
                            <div className="py-6 space-y-4">
                                {[...navLinks, ...userNavLinks].map((link) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block px-6 py-3 font-medium rounded-xl mx-4 transition-colors duration-200 ${
                                                pathname === link.href
                                                    ? "text-primary-600 bg-primary-50"
                                                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                {isAuthenticated ? (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="px-6 pt-4 border-t border-neutral-200"
                                    >
                                        <div className="text-sm text-neutral-600 mb-3">
                                            Welcome, {name || "User"}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="px-6 pt-4 border-t border-neutral-200 space-y-3"
                                    >
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block w-full px-4 py-3 text-center text-neutral-700 font-medium border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-colors duration-200"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/signup"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block w-full px-4 py-3 bg-primary-600 text-white font-medium text-center rounded-xl hover:bg-primary-700 transition-colors duration-200"
                                        >
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
