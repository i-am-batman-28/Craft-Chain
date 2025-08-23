import { NextResponse } from "next/server";

// Simulated OTP storage (in production, use Redis or database)
const otpStore = new Map();

export async function POST(request) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json(
                { success: false, message: "Phone number is required" },
                { status: 400 }
            );
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP with expiration (5 minutes)
        otpStore.set(phone, {
            otp,
            expires: Date.now() + 5 * 60 * 1000, // 5 minutes
            attempts: 0
        });

        // In production, send SMS via Twilio, MSG91, or similar service
        console.log(`OTP for ${phone}: ${otp}`);
        
        // For demo purposes, we'll just log it
        // In production, integrate with SMS service:
        /*
        const response = await fetch('https://api.msg91.com/api/v2/sendsms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authkey': process.env.MSG91_API_KEY
            },
            body: JSON.stringify({
                sender: 'CRAFTC',
                route: 4,
                country: 91,
                sms: [{
                    message: `Your CraftChain verification code is: ${otp}`,
                    to: [phone]
                }]
            })
        });
        */

        return NextResponse.json({ 
            success: true, 
            message: "OTP sent successfully" 
        });
    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to send OTP" 
        }, { status: 500 });
    }
}
