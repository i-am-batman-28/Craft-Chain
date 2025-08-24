"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#F1F3F4]">
            <Navbar />
            {/* Hero Section */}
            <div className="relative h-[70vh] bg-gradient-to-r from-[#1A252F] via-[#2C3E50] to-[#34495E] overflow-hidden pt-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto h-full flex items-center px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-white max-w-4xl"
                    >
                        <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
                            Empowering Artisans Through
                            <span className="block font-semibold text-[#E8B86D]">Modern Technology</span>
                        </h1>
                        <p className="text-lg lg:text-xl max-w-3xl text-gray-200 leading-relaxed">
                            Bridging the gap between traditional craftsmanship and contemporary markets 
                            through blockchain verification, authentic storytelling, and fair trade practices.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-light text-[#2C3E50] mb-6">
                                Our <span className="font-semibold">Mission</span>
                            </h2>
                            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                                At CraftChain, we're revolutionizing the artisan marketplace by combining 
                                centuries-old craftsmanship with cutting-edge blockchain technology. Our platform 
                                ensures authenticity, promotes fair trade, and creates direct connections between 
                                artisans and conscious consumers worldwide.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-2xl font-semibold text-[#8B4513] mb-2">
                                        1000+
                                    </h3>
                                    <p className="text-gray-600 font-medium">
                                        Artisans Empowered
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-2xl font-semibold text-[#8B4513] mb-2">
                                        28
                                    </h3>
                                    <p className="text-gray-600 font-medium">
                                        States Connected
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="/about-mission.jpg"
                                alt="Artisan at work"
                                width={500}
                                height={400}
                                className="rounded-lg shadow-xl object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-24 bg-gradient-to-b from-[#F8F9FA] to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-light text-[#2C3E50] mb-4">
                            How <span className="font-semibold">CraftChain</span> Works
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our three-step process ensures authenticity, transparency, and fair compensation
                        </p>
                    </motion.div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Artisan Verification",
                                description:
                                    "Craftspeople undergo a thorough verification process to ensure authenticity and quality standards.",
                                icon: "🏺",
                            },
                            {
                                title: "Blockchain Authentication",
                                description:
                                    "Each product receives a unique NFT certificate and QR code for instant verification and provenance.",
                                icon: "⛓️",
                            },
                            {
                                title: "Fair Trade Guarantee",
                                description:
                                    "Smart contracts ensure direct payments and fair compensation for artisans without intermediaries.",
                                icon: "🤝",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                viewport={{ once: true }}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#E8B86D]/30"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E8B86D]/20 to-[#8B4513]/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#2C3E50] mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-light text-[#2C3E50] mb-4">
                            Meet Our <span className="font-semibold">Team</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Passionate individuals dedicated to empowering artisans and preserving traditional crafts
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Karthik",
                                role: "Technical Lead",
                                image: "/karthik.jpg",
                            },
                            {
                                name: "Aarohi",
                                role: "Business Strategy",
                                image: "/aarohi.jpg",
                            },
                            {
                                name: "Harshita",
                                role: "Product Design",
                                image: "/harshita.jpg",
                            },
                            {
                                name: "Viksa",
                                role: "Marketing and Growth",
                                image: "/viksa.jpeg",
                            },
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                viewport={{ once: true }}
                                className="group text-center"
                            >
                                <div className="relative w-52 h-52 mx-auto mb-6 overflow-hidden rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                                    <div className="absolute inset-0 rounded-full ring-4 ring-white group-hover:ring-[#E8B86D]/30 transition-all duration-300"></div>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={208}
                                        height={208}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center center'
                                        }}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 font-medium">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="py-20 bg-[#2C3E50] text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Our Impact
                    </motion.h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "5000+", label: "Authentic Products" },
                            { number: "₹4.2B", label: "Market Opportunity" },
                            { number: "92%", label: "Care about Sustainability" },
                            { number: "10K+", label: "Happy Customers" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold text-[#E8B86D] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
