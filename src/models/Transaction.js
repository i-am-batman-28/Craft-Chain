import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    buyerAddress: {
        type: String,
        required: true,
    },
    sellerAddress: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Transaction ||
    mongoose.model("Transaction", TransactionSchema);
