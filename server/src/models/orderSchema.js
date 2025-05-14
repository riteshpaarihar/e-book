import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cartItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        default: "Processing",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Order", orderSchema);