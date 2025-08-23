import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount, productId, buyerId) => {
    try {
        const options = {
            amount: amount * 100, // Amount in paise (INR)
            currency: "INR",
            receipt: `product_${productId}_${Date.now()}`,
            notes: {
                productId: productId.toString(),
                buyerId: buyerId.toString(),
                platform: "CraftChain",
            },
        };

        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error("Razorpay order creation failed:", error);
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
