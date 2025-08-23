import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

// Simulated OTP storage (in production, use Redis or database)
const otpStore = new Map();

export async function POST(request) {
    try {
        await dbConnect();
        
        const { phone, otp, action, userData } = await request.json();

        if (!phone || !otp) {
            return NextResponse.json(
                { success: false, message: "Phone and OTP are required" },
                { status: 400 }
            );
        }

        const storedData = otpStore.get(phone);

        if (!storedData) {
            return NextResponse.json(
                { success: false, message: "OTP not found or expired" },
                { status: 400 }
            );
        }

        if (Date.now() > storedData.expires) {
            otpStore.delete(phone);
            return NextResponse.json(
                { success: false, message: "OTP expired" },
                { status: 400 }
            );
        }

        if (storedData.attempts >= 3) {
            otpStore.delete(phone);
            return NextResponse.json(
                { success: false, message: "Too many attempts. Please request new OTP" },
                { status: 400 }
            );
        }

        if (storedData.otp !== otp) {
            storedData.attempts++;
            return NextResponse.json(
                { success: false, message: "Invalid OTP" },
                { status: 400 }
            );
        }

        // OTP verified successfully, remove from store
        otpStore.delete(phone);

        if (action === "register") {
            // Create new user for registration
            const existingUser = await User.findOne({ phone });
            
            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: "Phone number already registered" },
                    { status: 400 }
                );
            }

            const user = await User.create({
                phone,
                name: userData.name,
                userType: userData.userType,
                bio: userData.bio || "",
                products: [],
                purchasedProducts: [],
            });

            const { password: _, ...userWithoutPassword } = user.toObject();

            return NextResponse.json({ 
                success: true, 
                user: userWithoutPassword 
            });
        } else if (action === "login") {
            // Find existing user for login
            const user = await User.findOne({ phone });
            
            if (!user) {
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                );
            }

            const { password: _, ...userWithoutPassword } = user.toObject();

            return NextResponse.json({ 
                success: true, 
                user: userWithoutPassword 
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid action" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to verify OTP" 
        }, { status: 500 });
    }
}
