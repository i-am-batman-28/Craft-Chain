import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/utils/razorpay";

export async function POST(request) {
    try {
        console.log('💳 Payment API called');
        const { productId, buyerId, amount, productName } = await request.json();
        
        console.log('💳 Payment request data:', { productId, buyerId, amount, productName });

        if (!productId || !buyerId || !amount) {
            console.error('❌ Missing required fields:', { productId, buyerId, amount });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        console.log('💳 Creating Razorpay order...');
        // Create Razorpay order
        const razorpayOrder = await createRazorpayOrder(
            amount,
            productId,
            buyerId
        );

        console.log('✅ Order created successfully');
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
        console.error("❌ Create order error:", error);
        return NextResponse.json(
            { error: "Failed to create order: " + error.message },
            { status: 500 }
        );
    }
}
