import express from "express";
import { placeOrder } from "../../../controllers/client/orderController.js";

const router = express.Router();

// Save an order
router.post("/", placeOrder);

export default router;