"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <div className="min-h-screen bg-[#F5F5F1]">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-[#2C3E50] overflow-hidden">
                <div className="relative max-w-7xl mx-auto h-full flex items-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <h1 className="text-5xl font-bold mb-4">
                            Empowering Artisans Through Technology
                        </h1>
                        <p className="text-xl max-w-2xl">
                            Bridging the gap between traditional craftsmanship
                            and modern markets through blockchain verification
                            and fair trade practices.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                                Our Mission
                            </h2>
                            <p className="text-gray-600 mb-6">
                                At CraftChain, we&apos;re revolutionizing the
                                artisan marketplace by combining centuries-old
                                craftsmanship with cutting-edge blockchain
                                technology. Our platform ensures authenticity,
                                promotes fair trade, and creates direct
                                connections between artisans and conscious
                                consumers.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#F5F5F1] p-4 rounded-lg">
                                    <h3 className="font-bold text-[#8B4513]">
                                        1000+
                                    </h3>
                                    <p className="text-gray-600">
                                        Artisans Empowered
                                    </p>
                                </div>
                                <div className="bg-[#F5F5F1] p-4 rounded-lg">
                                    <h3 className="font-bold text-[#8B4513]">
                                        28
                                    </h3>
                                    <p className="text-gray-600">
                                        States Connected
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/about-mission.jpg"
                                alt="Artisan at work"
                                width={500}
                                height={400}
                                className="rounded-lg shadow-xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-20 bg-[#F5F5F1]">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-[#2C3E50] mb-12"
                    >
                        How CraftChain Works
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Artisan Verification",
                                description:
                                    "Craftspeople undergo a thorough verification process to ensure authenticity and quality.",
                                icon: "🏺",
                            },
                            {
                                title: "Blockchain Authentication",
                                description:
                                    "Each product receives a unique NFT certificate and QR code for instant verification.",
                                icon: "⛓️",
                            },
                            {
                                title: "Fair Trade Guarantee",
                                description:
                                    "Smart contracts ensure direct payments and fair compensation for artisans.",
                                icon: "🤝",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                                className="bg-white p-6 rounded-lg shadow-lg"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-[#2C3E50] mb-12"
                    >
                        Meet Our Team
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
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
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                                className="text-center"
                            >
                                <div className="relative w-48 h-48 mx-auto mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={192}  // Replace layout="fill"
                                        height={192} // Replace objectFit="cover"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-[#2C3E50]">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="py-20 bg-[#2C3E50] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Our Impact
                    </motion.h2>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "5000+", label: "Products" },
                            { number: "₹4.2B", label: "Market Opportunity" },
                            {
                                number: "92%",
                                label: "Care about Sustainability",
                            },
                            { number: "10K+", label: "Customers" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                            >
                                <div className="text-4xl font-bold text-[#8B4513]">
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
