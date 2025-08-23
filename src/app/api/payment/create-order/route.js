import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/utils/razorpay";

export async function POST(request) {
    try {
        const { productId, buyerId, amount, productName } = await request.json();

        if (!productId || !buyerId || !amount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create Razorpay order
        const razorpayOrder = await createRazorpayOrder(
            amount,
            productId,
            buyerId
        );

        return NextResponse.json({
            success: true,
            order: razorpayOrder,
            product: {
                id: productId,
                name: productName,
                price: amount,
            },
        });
    } catch (error) {
        console.error("Create order error:", error);
        return NextResponse.json(
            { error: "Failed to create order: " + error.message },
            { status: 500 }
        );
    }
}
