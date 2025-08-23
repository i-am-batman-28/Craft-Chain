"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Marketplace() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // First try to fetch from database
                const response = await fetch('/api/products');
                const data = await response.json();
                
                if (data.products && data.products.length > 0) {
                    // Use database products
                    setProducts(data.products);
                } else {
                    // Fallback to static products if no database products
                    const staticProducts = [
            {
                id: 1,
                name: "Traditional Clay Pottery",
                category: "pottery",
                price: 1250,
                originalPrice: 1500,
                rating: 4.8,
                reviews: 124,
                imageUrl: "/pottery.jpg",
                artisanName: "Ramesh Kumar",
                artisanAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                location: "Jaipur, Rajasthan",
                description: "Hand-crafted clay pottery using traditional techniques passed down through generations",
                badge: "Bestseller",
                inStock: true
            },
            {
                id: 2,
                name: "Handwoven Pashmina Shawl",
                category: "textiles",
                price: 3500,
                originalPrice: 4200,
                rating: 4.9,
                reviews: 89,
                imageUrl: "/p.jpg",
                artisanName: "Fatima Begum",
                artisanAddress: "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99",
                location: "Srinagar, Kashmir",
                description: "Authentic Kashmiri Pashmina shawl with intricate handwoven patterns",
                badge: "Premium",
                inStock: true
            },
            {
                id: 3,
                name: "Brass Temple Bell",
                category: "metalwork",
                price: 850,
                originalPrice: 1000,
                rating: 4.7,
                reviews: 156,
                imageUrl: "/b.jpg",
                artisanName: "Vishnu Prajapati",
                artisanAddress: "0x3B9D6A6C8D2E1F4A5B7C9E8D0F2A4B6C8E0D2F1",
                location: "Moradabad, UP",
                description: "Traditional brass bell crafted using ancient metalworking techniques",
                badge: "Trending",
                inStock: true
            },
            {
                id: 4,
                name: "Madhubani Painting",
                category: "art",
                price: 2200,
                originalPrice: 2800,
                rating: 4.9,
                reviews: 203,
                imageUrl: "/m.jpg",
                artisanName: "Lakshmi Devi",
                artisanAddress: "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0",
                location: "Madhubani, Bihar",
                description: "Traditional Madhubani artwork depicting cultural stories and motifs",
                badge: "Featured",
                inStock: true
            },
            {
                id: 5,
                name: "Wooden Handicraft",
                category: "woodwork",
                price: 1800,
                originalPrice: 2100,
                rating: 4.6,
                reviews: 98,
                imageUrl: "/shopping-2.jpg",
                artisanName: "Suresh Sharma",
                artisanAddress: "0x4F3E2D1C0B9A8F7E6D5C4B3A2E1D0C9B8A7F6E5",
                location: "Saharanpur, UP",
                description: "Intricately carved wooden decorative items made from sustainable wood",
                badge: "Eco-Friendly",
                inStock: true
            },
            {
                id: 6,
                name: "Zari Embroidered Saree",
                category: "textiles",
                price: 4500,
                originalPrice: 5200,
                rating: 4.8,
                reviews: 167,
                imageUrl: "/shopping.jpg",
                artisanName: "Priya Patel",
                artisanAddress: "0x5E4D3C2B1A0F9E8D7C6B5A4E3D2C1B0A9F8E7D6",
                location: "Varanasi, UP",
                description: "Hand-embroidered silk saree with traditional zari work",
                badge: "Luxury",
                inStock: false
            }
        ];
                    setProducts(staticProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
            setLoading(false);
        };
        
        fetchProducts();
    }, []);

    const categories = [
        { id: "all", name: "All Categories", count: products.length },
        { id: "pottery", name: "Pottery", count: products.filter(p => p.category === "pottery").length },
        { id: "textiles", name: "Textiles", count: products.filter(p => p.category === "textiles").length },
        { id: "metalwork", name: "Metalwork", count: products.filter(p => p.category === "metalwork").length },
        { id: "art", name: "Art", count: products.filter(p => p.category === "art").length },
        { id: "woodwork", name: "Woodwork", count: products.filter(p => p.category === "woodwork").length }
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "all" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    const handlePurchase = (product) => {
        // Use _id for database products, fallback to id for static products
        const productId = product._id || product.id;
        router.push(`/purchase/${productId}`);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
                <Navbar />
                <div className="container-custom py-32">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        <span className="ml-4 text-lg text-neutral-600">Loading marketplace...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container-custom relative z-10 text-center text-white">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl lg:text-6xl font-simple font-bold mb-6">
                            Authentic Indian Marketplace
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                            Discover handcrafted treasures from master artisans across India, each verified with blockchain authenticity
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters and Search */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <motion.div {...fadeInUp} className="mb-12">
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for crafts, artisans, or locations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-2xl focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 text-lg"
                                />
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCategory(cat.id)}
                                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                                        category === cat.id
                                            ? "bg-primary-600 text-white shadow-luxury"
                                            : "bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300 shadow-elegant"
                                    }`}
                                >
                                    {cat.name} ({cat.count})
                                </motion.button>
                            ))}
                        </div>

                        {/* Sort Options */}
                        <div className="flex justify-center">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <motion.div {...fadeInUp} className="mb-8">
                        <p className="text-center text-neutral-600">
                            Showing {filteredProducts.length} of {products.length} authentic crafts
                        </p>
                    </motion.div>

                    {/* Products Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product._id || product.id}
                                variants={fadeInUp}
                                className="group bg-white rounded-3xl shadow-elegant hover:shadow-premium transition-all duration-500 overflow-hidden cursor-pointer"
                                onClick={() => handlePurchase(product)}
                                whileHover={{ y: -5 }}
                            >
                                <div className="relative overflow-hidden">
                                    {product.badge && (
                                        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                                            product.badge === 'Bestseller' ? 'bg-green-100 text-green-800' :
                                            product.badge === 'Premium' ? 'bg-purple-100 text-purple-800' :
                                            product.badge === 'Trending' ? 'bg-blue-100 text-blue-800' :
                                            product.badge === 'Luxury' ? 'bg-amber-100 text-amber-800' :
                                            product.badge === 'Eco-Friendly' ? 'bg-emerald-100 text-emerald-800' :
                                            'bg-orange-100 text-orange-800'
                                        }`}>
                                            {product.badge}
                                        </div>
                                    )}
                                    
                                    {!product.inStock && (
                                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                                            Out of Stock
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
                                        <div className="text-sm font-medium">{product.artisanName}</div>
                                        <div className="text-xs opacity-80">{product.location}</div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg capitalize">
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
                                        <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{product.description}</p>
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
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={`/artisan/${product.artisanAddress}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors"
                                                title="View Artisan"
                                            >
                                                <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePurchase(product);
                                                }}
                                                disabled={!product.inStock}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                                    product.inStock
                                                        ? "bg-primary-100 hover:bg-primary-600 hover:text-white"
                                                        : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                                                }`}
                                                title={product.inStock ? "Purchase" : "Out of Stock"}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <motion.div {...fadeInUp} className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">No products found</h3>
                            <p className="text-neutral-600 mb-8">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setCategory("all");
                                }}
                                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
