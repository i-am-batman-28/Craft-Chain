import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(request) {
    if (!process.env.MONGODB_URI) {
        return NextResponse.json(
            { error: "Database configuration error" },
            { status: 500 }
        );
    }

    try {
        await dbConnect();
        const data = await request.json();
        const { walletAddress, name, bio, userType } = data;

        const updatedUser = await User.findOneAndUpdate(
            { walletAddress },
            {
                $set: {
                    name,
                    bio,
                    userType,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}
