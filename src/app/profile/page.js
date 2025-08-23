"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/Navbar";
import { connectWallet } from "@/redux/features/authSlice";

export default function Profile() {
    const { walletAddress, userType, name } = useSelector((state) => state.auth);
    const purchases = useSelector((state) => state.purchases?.purchases || []);
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-6">Buyer Profile</h1>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">Name:</label>
                            <p className="text-gray-700">Karthik</p>
                        </div>

                        <div>
                            <label className="font-medium">Wallet Address:</label>
                            <p className="text-gray-700 break-all">{walletAddress}</p>
                        </div>

                        <div>
                            <label className="font-medium">Account Type:</label>
                            <p className="text-gray-700">{userType || 'buyer'}</p>
                        </div>
                    </div>

                    {/* Purchase History Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
                        <div className="space-y-4">
                            {purchases && purchases.length > 0 ? (
                                purchases.map(purchase => (
                                    <div key={purchase.id} className="bg-gray-50 p-4 rounded-lg">
                                        <p className="font-medium">{purchase.productName}</p>
                                        <p className="text-gray-600">Price: {purchase.price} ETH</p>
                                        <p className="text-gray-600">Date: {purchase.date}</p>
                                        <p className="text-gray-600">Status: {purchase.status}</p>
                                        <p className="text-gray-600 text-sm">Transaction: {purchase.transactionHash}</p>
                                        {purchase.feedback && (
                                            <div className="mt-2 pt-2 border-t">
                                                <p className="text-sm text-gray-500">Your Rating: {purchase.feedback.rating}/5</p>
                                                {purchase.feedback.comment && (
                                                    <p className="text-sm text-gray-500 mt-1">{purchase.feedback.comment}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-500">No purchases yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
