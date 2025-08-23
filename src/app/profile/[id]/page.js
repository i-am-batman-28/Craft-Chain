"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QRCode from "react-qr-code";
import Link from "next/link";

export default function Profile() {
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchProfile();
        }
    }, [params.id]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/users/${params.id}`);
            const data = await response.json();

            if (data.user) {
                setProfile(data.user);
                if (data.user.products?.length) {
                    const productsResponse = await fetch(
                        `/api/products?ids=${data.user.products.join(",")}`
                    );
                    const productsData = await productsResponse.json();
                    setProducts(productsData.products);
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Profile not found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h1 className="text-2xl font-bold mb-4">
                            {profile.name}
                        </h1>
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {profile.userType}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{profile.bio}</p>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">
                                Wallet Address:
                            </p>
                            <p className="font-mono text-sm break-all">
                                {profile.walletAddress}
                            </p>
                        </div>
                        <div className="mb-4">
                            <QRCode
                                value={`${window.location.origin}/profile/${profile.walletAddress}`}
                                size={150}
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Scan to view profile
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                Member since:
                            </p>
                            <p className="text-sm">
                                {new Date(
                                    profile.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <h2 className="text-xl font-bold mb-4">
                        {profile.userType === "artisan"
                            ? "Products"
                            : "Purchased Items"}
                    </h2>
                    {products.length === 0 ? (
                        <p className="text-gray-500">No items to display</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="border rounded-lg p-4"
                                >
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded mb-4"
                                        />
                                    )}
                                    <h3 className="font-bold">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {product.description}
                                    </p>
                                    <p className="font-bold mt-2">
                                        {product.price} ETH
                                    </p>
                                    <Link
                                        href={`/marketplace/${product._id}`}
                                        className="mt-2 text-blue-500 hover:underline block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
