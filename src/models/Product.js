import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: String,
    artisanName: {
        type: String,
        required: true,
    },
    artisanAddress: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    badge: {
        type: String,
        default: "New",
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    contractAddress: String,
    tokenId: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);
