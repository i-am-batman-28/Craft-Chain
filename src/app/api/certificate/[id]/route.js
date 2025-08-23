import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const tokenId = searchParams.get('tokenId');
        const paymentId = searchParams.get('paymentId');

        if (!tokenId && !paymentId) {
            return NextResponse.json(
                { error: "Token ID or Payment ID required" },
                { status: 400 }
            );
        }

        // Simulate certificate lookup (in production, query your database)
        const certificate = {
            tokenId: tokenId || `${Date.now()}`,
            contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            network: "Polygon Mumbai",
            status: "minted",
            createdAt: new Date().toISOString(),
            metadata: {
                name: "Authenticity Certificate - Traditional Clay Pottery",
                description: "Official authenticity certificate for handcrafted item",
                verified: true,
                artisan: "Ramesh Kumar",
                location: "Jaipur, Rajasthan"
            },
            explorerUrl: `https://mumbai.polygonscan.com/token/0x742d35Cc6634C0532925a3b844Bc454e4438f44e?a=${tokenId}`,
            owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
        };

        return NextResponse.json({
            success: true,
            certificate
        });

    } catch (error) {
        console.error("Certificate lookup error:", error);
        return NextResponse.json(
            { error: "Failed to lookup certificate" },
            { status: 500 }
        );
    }
}
