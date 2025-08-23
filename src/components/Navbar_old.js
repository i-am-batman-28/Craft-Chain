"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import Image from "next/image";

export default function Navbar() {
    // Move all hooks to the top level
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    // Move useSelector to top level
    const { isAuthenticated, userType, walletAddress, name } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
        setIsProfileDropdownOpen(false);
    };

    const isActivePath = (path) => pathname === path;

    const navLinks = [
        { path: "/marketplace", label: "Marketplace" },

        { path: "/about", label: "About" },
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/logo.png"
                                    alt="CraftChain"
                                    width={40}
                                    height={40}
                                    className="mr-2"
                                />
                                <span className="text-2xl font-bold text-[#2C3E50]">
                                    CraftChain
                                </span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActivePath(link.path)
                                            ? "border-[#8B4513] text-[#8B4513]"
                                            : "border-transparent text-[#2C3E50] hover:text-[#8B4513] hover:border-[#8B4513]"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Section */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {!isAuthenticated ? (
                            <Link
                                href="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#8B4513] hover:bg-[#6B3410] transition-colors"
                            >
                                Login / Register
                            </Link>
                        ) : (
                            <div className="ml-3 relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setIsProfileDropdownOpen(
                                            !isProfileDropdownOpen
                                        )
                                    }
                                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] transition-all"
                                >
                                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-[#2C3E50] bg-white hover:bg-gray-50">
                                        <span className="mr-2">{name || "User"}</span>
                                        <span className="text-xs text-gray-500">({userType})</span>
                                    </span>
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-[#2C3E50] hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href={userType === "artisan" ? "/dashboard" : "/my-purchases"}
                                            className="block px-4 py-2 text-sm text-[#2C3E50] hover:bg-gray-100"
                                        >
                                            {userType === "artisan" ? "Dashboard" : "My Purchases"}
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#2C3E50] hover:text-[#8B4513] hover:bg-gray-100"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
                <div className="pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                isActivePath(link.path)
                                    ? "border-[#8B4513] text-[#8B4513] bg-gray-50"
                                    : "border-transparent text-[#2C3E50] hover:bg-gray-50 hover:border-[#8B4513]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
