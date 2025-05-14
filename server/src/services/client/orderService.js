import { createOrderInRepository, updateProductStock } from "../../repositories/client/orderRepository.js";


export const createOrder = async(userId, address, cartItems, totalAmount) => {
    // Create order
    const newOrder = await createOrderInRepository(userId, address, cartItems, totalAmount);

    // Update product stock
    for (const item of cartItems) {
        await updateProductStock(item.product, item.quantity);
    }

    return newOrder;
};