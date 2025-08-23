import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

// Server-side cache
let serverCache = {
    data: null,
    timestamp: 0,
    duration: 2 * 60 * 1000 // 2 minutes
};

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const ids = searchParams.get("ids")?.split(",");
        const cacheKey = ids ? `ids_${ids.join('_')}` : 'all';
        
        // Check server cache first (only for 'all' products to keep it simple)
        if (!ids && serverCache.data && (Date.now() - serverCache.timestamp) < serverCache.duration) {
            console.log('💾 Server cache HIT for products_all');
            const response = NextResponse.json({ products: serverCache.data });
            
            // Set aggressive browser caching headers
            response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
            
            return response;
        }

        console.log(`💾 Server cache MISS for products_${cacheKey}`);
        await dbConnect();

        let products;
        if (ids) {
            products = await Product.find({ _id: { $in: ids } });
        } else {
            products = await Product.find().sort({ createdAt: -1 });
            
            // Cache the 'all' products result
            serverCache.data = products;
            serverCache.timestamp = Date.now();
            console.log(`✅ Server cached products_${cacheKey} with ${products.length} items`);
        }

        const response = NextResponse.json({ products });
        
        // Set aggressive caching headers
        response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
        response.headers.set('Vary', 'Accept-Encoding');
        
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
