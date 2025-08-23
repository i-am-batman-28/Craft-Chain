"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/Navbar";
import { FaStar } from "react-icons/fa";
import { updateFeedback } from "@/redux/features/purchaseSlice";

export default function MyPurchases() {
    const purchases = useSelector((state) => state.purchases?.purchases || []);
    const dispatch = useDispatch();
    const [tempFeedback, setTempFeedback] = useState({});

    const handleRating = (purchaseId, rating) => {
        setTempFeedback(prev => ({
            ...prev,
            [purchaseId]: {
                ...prev[purchaseId],
                rating
            }
        }));
    };

    const handleFeedbackSubmit = (purchaseId) => {
        const feedback = tempFeedback[purchaseId];
        if (feedback) {
            dispatch(updateFeedback({
                id: purchaseId,
                rating: feedback.rating,
                comment: feedback.comment
            }));
            alert('Feedback submitted successfully!');
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Purchases</h1>
                
                <div className="space-y-6">
                    {purchases.map((purchase) => (
                        <div key={purchase.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-1">
                                    <img
                                        src={purchase.imageUrl}
                                        alt={purchase.productName}
                                        className="w-full rounded-lg"
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <h2 className="text-xl font-bold">{purchase.productName}</h2>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-medium">Artisan:</span> {purchase.artisanName}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Price:</span> {purchase.price} ETH
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Purchase Date:</span> {purchase.date}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Status:</span> {purchase.status}
                                    </p>
                                    <p className="text-gray-600 break-all">
                                        <span className="font-medium">Transaction:</span> {purchase.transactionHash}
                                    </p>
                                    <p className="text-gray-600 mt-2">{purchase.description}</p>
                                </div>

                                <div className="md:col-span-1">
                                    {!purchase.feedback ? (
                                        <div className="border-t md:border-t-0 pt-4 md:pt-0">
                                            <h3 className="text-lg font-semibold mb-2">Leave Feedback</h3>
                                            <div className="flex space-x-1 mb-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`cursor-pointer ${
                                                            (tempFeedback[purchase.id]?.rating || 0) >= star
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                        onClick={() => handleRating(purchase.id, star)}
                                                    />
                                                ))}
                                            </div>
                                            <textarea
                                                className="w-full p-2 border rounded-lg mb-2"
                                                placeholder="Write your feedback..."
                                                value={tempFeedback[purchase.id]?.comment || ''}
                                                onChange={(e) => setTempFeedback(prev => ({
                                                    ...prev,
                                                    [purchase.id]: {
                                                        ...prev[purchase.id],
                                                        comment: e.target.value
                                                    }
                                                }))}
                                            />
                                            <button
                                                onClick={() => handleFeedbackSubmit(purchase.id)}
                                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Submit Feedback
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-t md:border-t-0 pt-4 md:pt-0">
                                            <h3 className="text-lg font-semibold mb-2">Your Feedback</h3>
                                            <div className="flex space-x-1 mb-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`${
                                                            purchase.feedback.rating >= star
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-600">{purchase.feedback.comment}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}