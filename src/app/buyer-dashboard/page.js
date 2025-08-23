"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function BuyerDashboard() {
    const { user } = useSelector((state) => state.auth);
    const purchasedProducts = useSelector(
        (state) =>
            state.products?.items.filter((product) =>
                user?.purchasedProducts?.includes(product.id)
            ) || []
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">My Purchases</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {purchasedProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        )}
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p className="text-gray-600 mt-2">
                            {product.description}
                        </p>
                        <p className="text-lg font-bold mt-2">
                            {product.price} ETH
                        </p>

                        <div className="mt-4">
                            <QRCode
                                value={JSON.stringify({
                                    type: "product",
                                    id: product.id,
                                    artisanAddress: product.artisanAddress,
                                    owner: user.walletAddress,
                                    profileUrl: `${window.location.origin}/profile/${product.artisanAddress}`,
                                })}
                                size={100}
                            />
                        </div>

                        <div className="mt-4">
                            <Link
                                href={`/profile/${product.artisanAddress}`}
                                className="text-blue-500 hover:underline"
                            >
                                View Artisan
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
