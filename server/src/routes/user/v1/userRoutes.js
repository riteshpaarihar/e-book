import express from 'express';
import { upload } from '../../../middlewares/upload.js';
import { validateRegister } from '../../../middlewares/validateRequest.js';
import { register, login, logout } from '../../../controllers/client/authController.js';


const routes = express.Router();

routes.post('/register', upload.single('profileImage'), validateRegister, register);
routes.post("/login", login);
routes.post("/logout", logout);

export default routes;