import Order from "../../models/orderSchema.js";
import Product from "../../models/bookSchema.js";

export const createOrderInRepository = async(userId, address, cartItems, totalAmount) => {
    const newOrder = new Order({
        user: userId,
        address,
        cartItems,
        totalAmount,
    });

    await newOrder.save();
    return newOrder;
};

export const updateProductStock = async(productId, quantity) => {
    const product = await Product.findById(productId);

    if (product) {
        product.stock -= quantity;
        if (product.stock <= 0) {
            product.stock = 0;
            product.outOfStock = true;
        }
        await product.save();
    }
};