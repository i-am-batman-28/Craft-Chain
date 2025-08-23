"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#2C3E50]">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="CraftChain"
                                width={40}
                                height={40}
                                className="mr-2"
                            />
                            <span className="text-2xl font-bold text-white">
                                CraftChain
                            </span>
                        </Link>
                        <p className="text-gray-300 text-base">
                            Empowering artisans through blockchain technology.
                            Connecting traditional craftsmanship with modern
                            authentication.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-[#8B4513]"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            {/* Add more social media icons as needed */}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                    Platform
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="/marketplace"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Marketplace
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/artisans"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Artisans
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                    Support
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="/help"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                    Company
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="/about"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/blog"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                    Legal
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="text-gray-300 hover:text-[#8B4513]"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; {new Date().getFullYear()} CraftChain. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
