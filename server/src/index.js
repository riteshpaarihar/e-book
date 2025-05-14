import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes.js'
const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",

        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// ✅ Middleware to accept different data types
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.text()); // text/plain
app.use(morgan('dev'));
app.use(bodyParser.json());


// ✅ API routes
app.use('/api', apiRoutes);

// ✅ Vlogging check route
app.get('/', (req, res) => {
    res.send('eBook API is running!');
});




app.listen(PORT, async() => {
    await connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
});