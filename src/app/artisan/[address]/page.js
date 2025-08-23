"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";

// Dynamically import QRCode with no SSR
const QRCode = dynamic(() => import('react-qr-code'), {
    ssr: false,
});

export default function ArtisanProfile() {
    const params = useParams();
    const [artisan, setArtisan] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const artisanData = {
            "0x742d35Cc6634C0532925a3b844Bc454e4438f44e": {
                name: "Ramesh Kumar",
                location: "Jaipur, Rajasthan",
                specialty: "Pottery",
                experience: "25 years",
                bio: "Master potter specializing in traditional Rajasthani pottery techniques",
                paymentLink: "https://craftchain.pay/artisan/0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            },
            "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99": {
                name: "Fatima Begum",
                location: "Srinagar, Kashmir",
                specialty: "Textiles",
                experience: "20 years",
                bio: "Expert in traditional Kashmiri Pashmina weaving",
                paymentLink: "https://craftchain.pay/artisan/0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99"
            },
            "0x3B9D6A6C8D2E1F4A5B7C9E8D0F2A4B6C8E0D2F1": {
                name: "Vishnu Prajapati",
                location: "Moradabad, UP",
                specialty: "Metalwork",
                experience: "15 years",
                bio: "Skilled metalworker specializing in traditional brass work",
                paymentLink: "https://craftchain.pay/artisan/0x3B9D6A6C8D2E1F4A5B7C9E8D0F2A4B6C8E0D2F1"
            },
            "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0": {
                name: "Lakshmi Devi",
                location: "Madhubani, Bihar",
                specialty: "Art",
                experience: "30 years",
                bio: "Master artist preserving traditional Madhubani painting techniques",
                paymentLink: "https://craftchain.pay/artisan/0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0"
            }
        };

        if (params.address) {
            setArtisan(artisanData[params.address]);
        }
    }, [params.address]);

    if (!mounted || !artisan) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-4">{artisan.name}</h1>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Location:</span> {artisan.location}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <span className="font-medium">Specialty:</span> {artisan.specialty}
                            </p>
                            <p className="text-gray-600 mb-4">
                                <span className="font-medium">Experience:</span> {artisan.experience}
                            </p>
                            <p className="text-gray-700">{artisan.bio}</p>
                        </div>
                        {mounted && (
                            <div className="flex flex-col items-center">
                                <QRCode
                                    value={artisan.paymentLink}
                                    size={150}
                                    className="mb-2 cursor-pointer"
                                    onClick={() => window.open(artisan.paymentLink, '_blank')}
                                />
                                <p className="text-sm text-gray-500 text-center mb-2">
                                    Scan to pay
                                </p>
                                <p className="text-sm text-gray-500 break-all text-center">
                                    {params.address}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}