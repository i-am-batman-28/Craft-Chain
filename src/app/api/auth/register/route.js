import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { 
            email, 
            password, 
            phone, 
            name, 
            userType, 
            bio, 
            method,
            walletAddress // for legacy support
        } = body;

        let user;

        if (method === "email" && email && password) {
            // Email registration
            const existingUser = await User.findOne({ email });
            
            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: "Email already registered" },
                    { status: 400 }
                );
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            user = await User.create({
                email,
                password: hashedPassword,
                name,
                userType,
                bio: bio || "",
                products: [],
                purchasedProducts: [],
            });
        } else if (phone) {
            // Phone registration (OTP verified separately)
            const existingUser = await User.findOne({ phone });
            
            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: "Phone number already registered" },
                    { status: 400 }
                );
            }

            user = await User.create({
                phone,
                name,
                userType,
                bio: bio || "",
                products: [],
                purchasedProducts: [],
            });
        } else if (walletAddress) {
            // Legacy wallet registration
            const existingUser = await User.findOne({ walletAddress });
            
            if (existingUser) {
                return NextResponse.json(
                    { error: "User already exists" },
                    { status: 400 }
                );
            }

            user = await User.create({
                walletAddress,
                userType,
                name,
                bio: bio || "",
                products: [],
                purchasedProducts: [],
            });
        } else {
            return NextResponse.json(
                { success: false, message: "Invalid registration method" },
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
        console.error("Registration error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Server error" 
        }, { status: 500 });
    }
}
