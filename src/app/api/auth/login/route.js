import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { email, password, phone, method, walletAddress } = body;

        let user;

        if (method === "email" && email && password) {
            // Email login
            user = await User.findOne({ email });
            
            if (!user) {
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                );
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return NextResponse.json(
                    { success: false, message: "Invalid password" },
                    { status: 401 }
                );
            }
        } else if (phone) {
            // Phone login (OTP verified separately)
            user = await User.findOne({ phone });
            
            if (!user) {
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                );
            }
        } else if (walletAddress) {
            // Legacy wallet login
            user = await User.findOne({ walletAddress });
            
            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid login method" },
                { status: 400 }
            );
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return NextResponse.json({ 
            success: true, 
            user: userWithoutPassword 
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Server error" 
        }, { status: 500 });
    }
}
