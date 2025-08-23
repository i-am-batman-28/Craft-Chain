import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log('💳 Razorpay Config:', {
    key_id: process.env.RAZORPAY_KEY_ID ? '✅ Present' : '❌ Missing',
    key_secret: process.env.RAZORPAY_KEY_SECRET ? '✅ Present' : '❌ Missing'
});

export const createRazorpayOrder = async (amount, productId, buyerId) => {
    try {
        console.log('💳 Creating Razorpay order:', { amount, productId, buyerId });
        
        // Create a shorter, safe receipt ID for Razorpay (max 40 chars)
        // Use timestamp + last 8 chars of productId to keep it unique but shorter
        const shortProductId = productId.length > 12 
            ? productId.slice(-8) // Last 8 chars for MongoDB ObjectIDs
            : productId; // Keep as is for simple IDs
            
        const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
        
        const options = {
            amount: amount * 100, // Amount in paise (INR)
            currency: "INR",
            receipt: `craft_${shortProductId}_${timestamp}`, // This will be max 21 chars
            notes: {
                productId: productId, // Keep full ID in notes for reference
                buyerId: buyerId || "guest",
                platform: "CraftChain",
                shortProductId: shortProductId,
                timestamp: timestamp
            },
        };
        
        console.log('💳 Order options:', options);

        const order = await razorpay.orders.create(options);
        console.log('✅ Razorpay order created successfully:', order);
        return order;
    } catch (error) {
        console.error("❌ Razorpay order creation failed:", error);
        console.error("❌ Error details:", error.message);
        throw new Error("Failed to create payment order: " + error.message);
    }
};

export const verifyRazorpayPayment = (
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
) => {
    try {
        const body = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        return expectedSignature === razorpaySignature;
    } catch (error) {
        console.error("Payment verification failed:", error);
        return false;
    }
};

export const calculatePlatformFee = (amount) => {
    const feePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || 5);
    return Math.round((amount * feePercentage) / 100);
};

export const calculateArtisanAmount = (amount) => {
    const platformFee = calculatePlatformFee(amount);
    return amount - platformFee;
};

export default razorpay;
