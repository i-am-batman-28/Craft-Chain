import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";

export async function POST(request) {
    try {
        await dbConnect();

        const data = await request.json();
        const { name, description, price, category, imageUrl, artisanAddress } =
            data;

        // Create new product
        const product = await Product.create({
            name,
            description,
            price,
            category,
            imageUrl,
            artisanAddress,
        });

        // Update artisan's products array
        await User.findOneAndUpdate(
            { walletAddress: artisanAddress },
            { $push: { products: product._id } }
        );

        return NextResponse.json({ product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
