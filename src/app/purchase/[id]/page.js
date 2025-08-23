"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export default function PurchasePage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const products = {
            "1": {
                id: 1,
                name: "Traditional Clay Pottery",
                price: 1250, // Price in INR
                imageUrl: "/pottery.jpg",
                artisanName: "Ramesh Kumar",
                location: "Jaipur, Rajasthan",
                description: "Hand-crafted clay pottery using traditional techniques passed down through generations"
            },
            "2": {
                id: 2,
                name: "Handwoven Pashmina Shawl",
                price: 3500,
                imageUrl: "/p.jpg",
                artisanName: "Fatima Begum",
                location: "Srinagar, Kashmir",
                description: "Authentic Kashmiri Pashmina shawl with intricate handwoven patterns"
            },
            "3": {
                id: 3,
                name: "Brass Temple Bell",
                price: 850,
                imageUrl: "/b.jpg",
                artisanName: "Vishnu Prajapati",
                location: "Moradabad, UP",
                description: "Traditional brass bell crafted using ancient metalworking techniques"
            },
            "4": {
                id: 4,
                name: "Madhubani Painting",
                price: 2200,
                imageUrl: "/m.jpg",
                artisanName: "Lakshmi Devi",
                location: "Madhubani, Bihar",
                description: "Traditional Madhubani artwork depicting cultural stories and motifs"
            },
            "5": {
                id: 5,
                name: "Wooden Handicraft",
                price: 1500,
                imageUrl: "/shopping-2.jpg",
                artisanName: "Suresh Sharma",
                location: "Saharanpur, UP",
                description: "Intricately carved wooden decorative items made from sustainable wood"
            },
            "6": {
                id: 6,
                name: "Zari Embroidered Saree",
                price: 4200,
                imageUrl: "/shopping.jpg",
                artisanName: "Priya Patel",
                location: "Varanasi, UP",
                description: "Hand-embroidered silk saree with traditional zari work"
            }
        };

        setProduct(products[params.id]);
        setLoading(false);
    }, [params.id]);

    const handleRazorpayPayment = async () => {
        setPaymentLoading(true);

        try {
            // Create Razorpay order
            const orderResponse = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    buyerId: "demo_buyer_123", // In real app, get from auth
                    amount: product.price,
                    productName: product.name,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderData.success) {
                throw new Error(orderData.error);
            }

            // Razorpay checkout options
            const options = {
                key: "rzp_test_R7uy1hCdJQqlUk", // Your Razorpay key
                amount: orderData.order.amount,
                currency: "INR",
                name: "CraftChain",
                description: `Purchase: ${product.name}`,
                image: "/logo.png",
                order_id: orderData.order.id,
                handler: async function (response) {
                    // Verify payment on backend
                    try {
                        const verifyResponse = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                productId: product.id,
                                buyerId: "demo_buyer_123",
                                amount: product.price,
                                productName: product.name,
                                artisanName: product.artisanName,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            // Show detailed blockchain certificate information
                            const certificate = verifyData.transaction.certificate;
                            
                            let alertMessage = `🎉 Payment Successful!\n\n`;
                            
                            if (certificate && certificate.certificateCreated) {
                                alertMessage += `🔗 BLOCKCHAIN CERTIFICATE CREATED!\n`;
                                alertMessage += `📜 NFT Token ID: ${certificate.nftTokenId}\n`;
                                alertMessage += `🏢 Smart Contract: ${certificate.contractAddress}\n`;
                                alertMessage += `🌐 Network: ${certificate.blockchainNetwork}\n`;
                                alertMessage += `🔍 Transaction Hash: ${certificate.transactionHash}\n`;
                                alertMessage += `👤 Certificate Owner: ${certificate.ownerAddress}\n\n`;
                                alertMessage += `View on Blockchain Explorer:\n${certificate.explorerUrl}\n\n`;
                            } else if (certificate && certificate.status === "pending") {
                                alertMessage += `⏳ Blockchain certificate is being created...\nYou'll receive it shortly!\n\n`;
                            } else {
                                alertMessage += `📜 Digital certificate created!\nToken ID: ${verifyData.transaction.nftTokenId || 'Generating...'}\n\n`;
                            }
                            
                            alertMessage += `💰 Payment Details:\n`;
                            alertMessage += `💳 Payment ID: ${verifyData.transaction.paymentId}\n`;
                            alertMessage += `👨‍🎨 Artisan receives: ₹${verifyData.transaction.artisanAmount}\n`;
                            alertMessage += `🏢 Platform fee: ₹${verifyData.transaction.platformFee}\n\n`;
                            alertMessage += `Thank you for supporting authentic Indian craftsmanship!`;

                            alert(alertMessage);
                            router.push("/marketplace");
                        } else {
                            throw new Error(verifyData.error);
                        }
                    } catch (verifyError) {
                        console.error("Payment verification failed:", verifyError);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                notes: {
                    productId: product.id,
                    artisan: product.artisanName,
                },
                theme: {
                    color: "#8B4513",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Failed to initiate payment: " + error.message);
        } finally {
            setPaymentLoading(false);
        }
    };

    if (loading || !product) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 text-[#2C3E50]">Purchase Authentic Craft</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full rounded-lg shadow-md"
                            />
                            <div className="mt-4 p-4 bg-[#F5F5F1] rounded-lg">
                                <p className="text-gray-700 font-medium mb-2">About this craft:</p>
                                <p className="text-gray-600">{product.description}</p>
                            </div>
                            
                            {/* Authenticity guarantee */}
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-green-800">Authenticity Guaranteed</p>
                                        <p className="text-green-600 text-sm">Digital NFT certificate included</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-[#2C3E50]">{product.name}</h2>
                                <p className="text-3xl font-bold text-[#8B4513] mt-2">₹{product.price.toLocaleString()}</p>
                            </div>
                            
                            {/* Artisan Information */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Meet Your Artisan</h3>
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">
                                            {product.artisanName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{product.artisanName}</p>
                                        <p className="text-sm text-gray-600">{product.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Benefits */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">What you get:</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Authentic handcrafted product</li>
                                    <li>• Digital authenticity certificate (NFT)</li>
                                    <li>• Direct support to artisan (95% goes to them)</li>
                                    <li>• Secure UPI/Card payment</li>
                                </ul>
                            </div>

                            {/* Payment Methods */}
                            <div className="space-y-3">
                                <p className="font-medium text-gray-800">Pay securely with:</p>
                                <div className="flex space-x-3">
                                    <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                                        <span className="text-sm font-medium">UPI</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                                        <span className="text-sm font-medium">Cards</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                                        <span className="text-sm font-medium">NetBanking</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleRazorpayPayment}
                                disabled={paymentLoading}
                                className="w-full bg-[#8B4513] text-white py-4 rounded-lg hover:bg-[#6B3410] transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {paymentLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    `Pay ₹${product.price.toLocaleString()} & Get NFT Certificate`
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Secure payments by Razorpay • Blockchain certificate • 100% authentic
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}