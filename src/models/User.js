import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows null values while maintaining uniqueness
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true, // Allows null values while maintaining uniqueness
        trim: true,
    },
    password: {
        type: String,
        // Only required for email-based accounts
    },
    walletAddress: {
        type: String,
        unique: true,
        sparse: true, // For backward compatibility
    },
    userType: {
        type: String,
        enum: ["buyer", "artisan"],
        required: true,
    },
    bio: String,
    profileImage: String,
    products: [
        {
            type: String, // Product IDs
        },
    ],
    purchasedProducts: [
        {
            type: String, // Product IDs
        },
    ],
    emailVerified: {
        type: Boolean,
        default: false,
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
});

// Pre-save middleware to set verification status
UserSchema.pre('save', function(next) {
    if (this.phone && !this.phoneVerified) {
        this.phoneVerified = true; // Phone is verified via OTP
    }
    if (this.isModified('lastLogin') === false) {
        this.lastLogin = new Date();
    }
    next();
});

// Ensure at least one authentication method is provided
UserSchema.pre('validate', function(next) {
    if (!this.email && !this.phone && !this.walletAddress) {
        next(new Error('At least one authentication method (email, phone, or wallet) is required'));
    } else {
        next();
    }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
