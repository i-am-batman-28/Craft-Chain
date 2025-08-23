import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(request, { params }) {
    if (!process.env.MONGODB_URI) {
        return NextResponse.json(
            { error: "Database configuration error" },
            { status: 500 }
        );
    }

    try {
        await dbConnect();
        const address = params.id;

        const transactions = await Transaction.find({
            $or: [{ buyerAddress: address }, { sellerAddress: address }],
        })
            .sort({ date: -1 })
            .populate("productId");

        return NextResponse.json({ transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json(
            { error: "Failed to fetch transactions" },
            { status: 500 }
        );
    }
}
