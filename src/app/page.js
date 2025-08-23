"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const router = useRouter();
    
    // Hero Images Carousel Data
    const heroImages = [
        {
            src: "/crf.jpg",
            alt: "Traditional Indian Crafts",
            title: "Master Craftsmanship",
            subtitle: "Centuries of Tradition"
        },
        {
            src: "/22.jpg",
            alt: "Authentic Artisan Work",
            title: "Authentic Artistry",
            subtitle: "Handcrafted Excellence"
        },
        {
            src: "/23.jpg",
            alt: "Indian Heritage Crafts",
            title: "Heritage & Culture",
            subtitle: "Living Traditions"
        },
        {
            src: "/24.jpg",
            alt: "Traditional Craftsmanship",
            title: "Timeless Beauty",
            subtitle: "Artisan Expertise"
        },
        {
            src: "/25.jpg",
            alt: "Handmade Indian Art",
            title: "Creative Legacy",
            subtitle: "Skilled Hands"
        },
        {
            src: "/26.jpg",
            alt: "Cultural Heritage",
            title: "Cultural Treasures",
            subtitle: "Authentic Origins"
        }
    ];

    // Bulletproof carousel with CSS-only transitions
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    
    // Ensure component is mounted (client-side only)
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // Ultra-smooth transition system with perfect timing
    useEffect(() => {
        if (!isMounted) return;
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5 seconds for comfortable viewing

        return () => clearInterval(interval);
    }, [heroImages.length, isMounted]);

    const [products] = useState([
        {
            id: 1,
            name: "Traditional Clay Pottery",
            category: "Pottery",
            price: 1250,
            originalPrice: 1500,
            rating: 4.8,
            reviews: 124,
            imageUrl: "/pottery.jpg",
            artisan: "Ramesh Kumar",
            location: "Jaipur, Rajasthan",
            badge: "Bestseller"
        },
        {
            id: 2,
            name: "Handwoven Pashmina Shawl",
            category: "Textiles",
            price: 3500,
            originalPrice: 4200,
            rating: 4.9,
            reviews: 89,
            imageUrl: "/p.jpg",
            artisan: "Fatima Begum",
            location: "Srinagar, Kashmir",
            badge: "Premium"
        },
        {
            id: 3,
            name: "Brass Temple Bell",
            category: "Metalwork",
            price: 850,
            originalPrice: 1000,
            rating: 4.7,
            reviews: 156,
            imageUrl: "/b.jpg",
            artisan: "Vishnu Prajapati",
            location: "Moradabad, UP",
            badge: "Trending"
        },
        {
            id: 4,
            name: "Madhubani Painting",
            category: "Art",
            price: 2200,
            originalPrice: 2800,
            rating: 4.9,
            reviews: 203,
            imageUrl: "/m.jpg",
            artisan: "Lakshmi Devi",
            location: "Madhubani, Bihar",
            badge: "Featured"
        }
    ]);

    const handleProductClick = (id) => {
        router.push(`/purchase/${id}`);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
            <Navbar />

            {/* Hero Section - Completely Redesigned */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f06b0d' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            {...fadeInUp}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <h1 className="text-5xl lg:text-7xl font-simple font-bold text-neutral-900 leading-tight">
                                    Discover
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 block">
                                        Authentic
                                    </span>
                                    <span className="text-neutral-600">Craftsmanship</span>
                                </h1>
                                
                                <p className="text-xl text-neutral-600 leading-relaxed max-w-xl">
                                    Connect directly with master artisans across India. Every handcrafted piece 
                                    comes with verified authenticity and supports traditional craftsmanship.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/marketplace"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-2xl shadow-luxury hover:shadow-premium transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span>Explore Marketplace</span>
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                
                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-700 font-semibold rounded-2xl border-2 border-neutral-200 shadow-elegant hover:shadow-luxury hover:border-primary-300 transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Learn More
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex items-center space-x-8 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-neutral-900">1000+</div>
                                    <div className="text-sm text-neutral-600">Verified Artisans</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-neutral-900">5000+</div>
                                    <div className="text-sm text-neutral-600">Authentic Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-neutral-900">4.9★</div>
                                    <div className="text-sm text-neutral-600">Customer Rating</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-3xl transform rotate-6 opacity-20"></div>
                                <div className="relative bg-white rounded-3xl shadow-premium overflow-hidden">
                                    {/* Image Carousel - Seamless Crossfade */}
                                    <div className="relative w-full h-[600px] overflow-hidden">
                                        {/* Single Layer with Smooth Crossfade */}
            {/* ZERO-FLASH CSS-Only Carousel - All images permanently mounted */}
            <div className="absolute inset-0 overflow-hidden bg-black">
              {heroImages.map((image, index) => (
                <div
                  key={`image-layer-${index}`}
                  className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    willChange: 'opacity',
                    pointerEvents: 'none'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      display: 'block',
                      maxWidth: 'none'
                    }}
                    loading="eager"
                    decoding="sync"
                  />
                </div>
              ))}
            </div>                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                                        
                                        {/* Image Content with Smooth CSS Transition - Zero Flash */}
                                        <div className="absolute bottom-6 left-6 text-white">
                                            {heroImages.map((image, index) => (
                                                <div
                                                    key={`text-overlay-${index}`}
                                                    className="transition-opacity duration-1000 ease-in-out"
                                                    style={{
                                                        opacity: index === currentImageIndex ? 1 : 0,
                                                        position: index === currentImageIndex ? 'relative' : 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        transform: 'translateZ(0)',
                                                        willChange: 'opacity'
                                                    }}
                                                >
                                                    <div className="text-lg font-semibold drop-shadow-lg">
                                                        {image.title}
                                                    </div>
                                                    <div className="text-sm opacity-90 drop-shadow-md">
                                                        {image.subtitle}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Smooth Carousel Indicators */}
                                        <div className="absolute bottom-6 right-6 flex space-x-2">
                                            {heroImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`h-2 rounded-full transition-all duration-500 backdrop-blur-sm hover:scale-110 ${
                                                        index === currentImageIndex
                                                            ? 'bg-white w-8 shadow-lg'
                                                            : 'bg-white/40 w-2 hover:bg-white/60 hover:w-4'
                                                    }`}
                                                    style={{
                                                        transform: 'translateZ(0)',
                                                        willChange: 'transform, width, background-color'
                                                    }}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Smooth Navigation Arrows */}
                                        <button
                                            onClick={() => setCurrentImageIndex(
                                                currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
                                            )}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:-translate-x-1"
                                            style={{
                                                transform: 'translateY(-50%) translateZ(0)',
                                                willChange: 'transform, opacity, background-color'
                                            }}
                                            aria-label="Previous image"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        <button
                                            onClick={() => setCurrentImageIndex(
                                                currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
                                            )}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:translate-x-1"
                                            style={{
                                                transform: 'translateY(-50%) translateZ(0)',
                                                willChange: 'transform, opacity, background-color'
                                            }}
                                            aria-label="Next image"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
                        {/* Featured Categories */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        {...fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-simple font-bold text-neutral-900 mb-6">
                            Explore by Category
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                            Discover centuries-old traditions preserved by master artisans across different regions of India
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            { 
                                name: "Pottery", 
                                image: "/5.jpg",
                                color: "from-amber-500 to-orange-600", 
                                count: "150+ items" 
                            },
                            { 
                                name: "Textiles", 
                                image: "/6.jpg",
                                color: "from-rose-500 to-pink-600", 
                                count: "300+ items" 
                            },
                            { 
                                name: "Metalwork", 
                                image: "/3.jpg",
                                color: "from-slate-500 to-slate-700", 
                                count: "200+ items" 
                            },
                            { 
                                name: "Embroidery", 
                                image: "/4.jpeg",
                                color: "from-purple-500 to-indigo-600", 
                                count: "180+ items" 
                            }
                        ].map((category, index) => (
                            <motion.div
                                key={category.name}
                                variants={fadeInUp}
                                className="group relative overflow-hidden rounded-3xl bg-white shadow-elegant hover:shadow-premium transition-all duration-500 cursor-pointer"
                                whileHover={{ y: -10 }}
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                                    <div className="absolute top-4 right-4">
                                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                        <p className="text-sm opacity-90">{category.count}</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/10 group-hover:to-primary-600/5 transition-all duration-500"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Products - Completely Redesigned */}
            <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
                <div className="container-custom">
                    <motion.div
                        {...fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-simple font-bold text-neutral-900 mb-6">
                            Featured Masterpieces
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                            Handpicked treasures from our most skilled artisans, each with verified authenticity
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={fadeInUp}
                                className="group bg-white rounded-3xl shadow-elegant hover:shadow-premium transition-all duration-500 overflow-hidden cursor-pointer"
                                onClick={() => handleProductClick(product.id)}
                                whileHover={{ y: -5 }}
                            >
                                <div className="relative overflow-hidden">
                                    {product.badge && (
                                        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                                            product.badge === 'Bestseller' ? 'bg-green-100 text-green-800' :
                                            product.badge === 'Premium' ? 'bg-purple-100 text-purple-800' :
                                            product.badge === 'Trending' ? 'bg-blue-100 text-blue-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                            {product.badge}
                                        </div>
                                    )}
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="text-sm font-medium">{product.artisan}</div>
                                        <div className="text-xs opacity-80">{product.location}</div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                                                {product.category}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-amber-400">★</span>
                                                <span className="text-sm font-medium text-neutral-700">{product.rating}</span>
                                                <span className="text-xs text-neutral-500">({product.reviews})</span>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-neutral-900 text-lg leading-tight group-hover:text-primary-700 transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl font-bold text-neutral-900">₹{product.price.toLocaleString()}</span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-neutral-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                                )}
                                            </div>
                                            {product.originalPrice && (
                                                <div className="text-xs text-green-600 font-medium">
                                                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                            <svg className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        {...fadeInUp}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl shadow-elegant hover:shadow-luxury border-2 border-primary-200 hover:border-primary-300 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            View All Products
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Statistics */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                1000+
                            </p>
                            <p className="mt-2 text-lg font-medium text-primary-100">
                                Artisans
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                28
                            </p>
                            <p className="mt-2 text-lg font-medium text-primary-100">
                                States
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                5000+
                            </p>
                            <p className="mt-2 text-lg font-medium text-primary-100">
                                Products
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white">
                                10K+
                            </p>
                            <p className="mt-2 text-lg font-medium text-primary-100">
                                Customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* India Map Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Our Artisan Network
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Connecting craftspeople across India
                    </p>
                </div>
                <div className="relative h-[600px] w-full">
                    <img
                        src="/india-map.jpg"
                        alt="India Map"
                        className="w-full h-full object-contain rounded-xl"
                    />
                    {/* Add dots for major artisan locations */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                    {/* Add more location dots as needed */}
                </div>
            </div>
            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        {...fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-simple font-bold text-neutral-900 mb-6">
                            Why Choose CraftChain?
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                            We're revolutionizing how authentic Indian crafts reach the world while empowering artisan communities
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-12"
                    >
                        {[
                            {
                                icon: (
                                    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: "Blockchain Verified",
                                description: "Every product comes with an immutable authenticity certificate stored on the blockchain, ensuring genuine craftsmanship."
                            },
                            {
                                icon: (
                                    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: "Fair Trade Guaranteed",
                                description: "We ensure artisans receive fair compensation for their work, supporting sustainable livelihoods and preserving traditions."
                            },
                            {
                                icon: (
                                    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                ),
                                title: "Master Artisans Only",
                                description: "Each creator is carefully vetted for skill, authenticity, and traditional knowledge passed down through generations."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="text-center group"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-luxury transition-all duration-300 border border-primary-200">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Artisan Spotlight */}
            <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        {...fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-simple font-bold mb-6">
                            Meet Our Master Artisans
                        </h2>
                        <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                            The skilled hands and creative minds behind every authentic piece in our marketplace
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                name: "Ramesh Kumar",
                                craft: "Potter",
                                location: "Jaipur, Rajasthan",
                                experience: "25+ years",
                                image: "/karthik.jpg",
                                quote: "Clay speaks to me, and I help it tell its story."
                            },
                            {
                                name: "Fatima Begum",
                                craft: "Weaver",
                                location: "Srinagar, Kashmir",
                                experience: "30+ years",
                                image: "/aarohi.jpg",
                                quote: "Every thread carries the warmth of our heritage."
                            },
                            {
                                name: "Lakshmi Devi",
                                craft: "Painter",
                                location: "Madhubani, Bihar",
                                experience: "20+ years",
                                image: "/harshita.jpg",
                                quote: "Colors are the language of our ancestors."
                            }
                        ].map((artisan, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center group hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-400 group-hover:border-primary-300 transition-colors">
                                    <img
                                        src={artisan.image}
                                        alt={artisan.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{artisan.name}</h3>
                                <div className="text-primary-300 font-medium mb-1">{artisan.craft}</div>
                                <div className="text-neutral-400 text-sm mb-4">{artisan.location} • {artisan.experience}</div>
                                <p className="text-neutral-300 italic leading-relaxed">"{artisan.quote}"</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container-custom relative z-10 text-center text-white">
                    <motion.div
                        {...fadeInUp}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl lg:text-6xl font-simple font-bold mb-8">
                            Start Your Journey Today
                        </h2>
                        <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
                            Join thousands of conscious buyers supporting authentic craftsmanship and preserving cultural heritage
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/marketplace"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl shadow-luxury hover:shadow-premium transform hover:-translate-y-1 transition-all duration-300 text-lg"
                            >
                                Shop Now
                                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </Link>
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white/30 hover:border-white hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 text-lg"
                            >
                                Become an Artisan
                                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
