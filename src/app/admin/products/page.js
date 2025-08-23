"use client";
import { useState, useEffect } from "react";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const seedProducts = async () => {
        setSeeding(true);
        try {
            const response = await fetch('/api/products/seed', {
                method: 'POST',
            });
            const data = await response.json();
            
            if (data.success) {
                alert(`✅ ${data.message}`);
                fetchProducts(); // Refresh the list
            } else {
                alert(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
        setSeeding(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin - Product Management</h1>
            
            <div className="mb-6 flex gap-4">
                <button
                    onClick={fetchProducts}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Loading...' : 'Refresh Products'}
                </button>
                
                <button
                    onClick={seedProducts}
                    disabled={seeding}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    {seeding ? 'Seeding...' : 'Seed Database'}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Products in Database: {products.length}
                </h2>
                
                {loading ? (
                    <div className="text-center py-8">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No products found in database.</p>
                        <p className="mt-2">Click "Seed Database" to add sample products.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div key={product._id} className="border rounded-lg p-4">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-32 object-cover rounded mb-2"
                                />
                                <h3 className="font-semibold text-sm">{product.name}</h3>
                                <p className="text-gray-600 text-xs">{product.artisanName}</p>
                                <p className="text-gray-600 text-xs">{product.location}</p>
                                <p className="text-green-600 font-bold">₹{product.price}</p>
                                <p className="text-xs text-gray-500">Category: {product.category}</p>
                                <p className="text-xs text-gray-500">
                                    Added: {new Date(product.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
