"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { addProduct } from "@/store/slices/productSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, walletAddress } = useSelector((state) => state.auth);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!walletAddress) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            setIsSubmitting(true);
            const productData = {
                ...newProduct,
                artisanAddress: walletAddress,
            };

            const response = await fetch("/api/products/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error("Failed to create product");
            }

            const data = await response.json();

            if (data.product) {
                dispatch(addProduct(data.product));
                setNewProduct({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    imageUrl: "",
                });
                alert("Product created successfully!");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Artisan Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    description: e.target.value,
                                })
                            }
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price (ETH)
                        </label>
                        <input
                            type="number"
                            step="0.001"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    category: e.target.value,
                                })
                            }
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="pottery">Pottery</option>
                            <option value="textiles">Textiles</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="woodwork">Woodwork</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="url"
                            value={newProduct.imageUrl}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    imageUrl: e.target.value,
                                })
                            }
                            placeholder="https://example.com/image.jpg"
                            className="mt-1 block w-full p-2 border rounded-md"
                            required
                        />
                        {newProduct.imageUrl && (
                            <img
                                src={newProduct.imageUrl}
                                alt="Preview"
                                className="mt-2 h-32 object-cover rounded"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Creating..." : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
    );
}
