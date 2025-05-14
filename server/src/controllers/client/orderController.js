import { createOrder } from "../../services/client/orderService.js";

export const placeOrder = async(req, res) => {
    try {
        const { userId, address, cartItems, totalAmount } = req.body;

        const order = await createOrder(userId, address, cartItems, totalAmount);

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while placing order" });
    }
};