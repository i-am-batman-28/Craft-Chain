import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: String,
    artisanAddress: {
        type: String,
        required: true,
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
