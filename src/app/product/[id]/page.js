"use client";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function ProductDetails() {
    const { id } = useParams();
    const products = useSelector((state) => state?.products?.products || []);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
    }, [id, products]);

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <p>Product not found</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="space-y-2 mb-6">
                            <p><span className="font-medium">Artisan:</span> {product.artisan}</p>
                            <p><span className="font-medium">Price:</span> {product.price} ETH</p>
                            <p><span className="font-medium">Location:</span> {product.location}</p>
                            <p><span className="font-medium">Category:</span> {product.category}</p>
                            <p><span className="font-medium">Stock:</span> {product.stock} available</p>
                        </div>
                        <Link 
                            href="/my-purchases" 
                            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Purchase Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}