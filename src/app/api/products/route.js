import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const ids = searchParams.get("ids")?.split(",");

        let products;
        if (ids) {
            products = await Product.find({ _id: { $in: ids } });
        } else {
            products = await Product.find().sort({ createdAt: -1 });
        }

        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
