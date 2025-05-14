import express from 'express';
import userRoutes from './user/v1/userRoutes.js'
import bookRoutes from './user/v1/bookRoutes.js'
import orderRoutes from './user/v1/orderRoutes.js'
const routes = express.Router();

routes.use('/v1/user', userRoutes);
routes.use('/v1/book', bookRoutes);
routes.use('/v1/order', orderRoutes);
export default routes;