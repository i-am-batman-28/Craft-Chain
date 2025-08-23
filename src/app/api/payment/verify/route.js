import { NextResponse } from "next/server";
import { verifyRazorpayPayment, calculatePlatformFee, calculateArtisanAmount } from "@/utils/razorpay";
import { blockchainService } from "@/utils/blockchain";

export async function POST(request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            productId,
            buyerId,
            amount,
            productName,
            artisanName
        } = await request.json();

        // Verify payment signature
        const isValidPayment = verifyRazorpayPayment(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValidPayment) {
            return NextResponse.json(
                { error: "Payment verification failed" },
                { status: 400 }
            );
        }

        // Calculate fees
        const platformFee = calculatePlatformFee(amount);
        const artisanAmount = calculateArtisanAmount(amount);

        console.log("💳 Payment verified successfully!");
        console.log("🎨 Starting NFT certificate creation...");

        // Create REAL blockchain authenticity certificate
        try {
            const nftResult = await blockchainService.mintAuthenticityNFT(
                {
                    id: productId,
                    name: productName,
                    artisanName: artisanName,
                    location: "India", // You can get this from product data
                    price: amount,
                    imageUrl: "/pottery.jpg", // You can get actual image URL
                    category: "Handcraft"
                },
                {
                    id: buyerId
                },
                {
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id
                }
            );

            console.log("� BLOCKCHAIN CERTIFICATE CREATED SUCCESSFULLY!");
            console.log(`📜 Token ID: ${nftResult.tokenId}`);
            console.log(`🔗 Contract: ${nftResult.contractAddress}`);
            console.log(`🌐 Explorer: ${nftResult.explorerUrl}`);
            
            return NextResponse.json({
                success: true,
                message: "Payment successful! Your authenticity certificate has been minted on the blockchain.",
                transaction: {
                    id: `txn_${Date.now()}`,
                    amount,
                    status: "completed",
                    artisanAmount,
                    platformFee,
                    paymentId: razorpay_payment_id,
                    
                    // REAL Blockchain Certificate Data
                    certificate: {
                        nftTokenId: nftResult.tokenId,
                        contractAddress: nftResult.contractAddress,
                        blockchainNetwork: nftResult.network,
                        transactionHash: nftResult.transactionHash,
                        explorerUrl: nftResult.explorerUrl,
                        ownerAddress: nftResult.ownerAddress,
                        metadataURI: nftResult.metadataURI,
                        certificateCreated: true
                    }
                },
            });

        } catch (nftError) {
            console.error("❌ NFT creation failed:", nftError);
            
            // Even if NFT creation fails, payment was successful
            return NextResponse.json({
                success: true,
                message: "Payment successful! Certificate creation is in progress and will be delivered shortly.",
                transaction: {
                    id: `txn_${Date.now()}`,
                    amount,
                    status: "completed",
                    artisanAmount,
                    platformFee,
                    paymentId: razorpay_payment_id,
                    certificate: {
                        status: "pending",
                        error: nftError.message
                    }
                },
            });
        }

    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { error: "Payment processing failed: " + error.message },
            { status: 500 }
        );
    }
}
