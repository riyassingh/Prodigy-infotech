// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/db.js';
import './config/cloudinary.js'; // Ensure cloudinary is configured
import userRouter from './routes/authRouter.js';
import categoryRouter from './routes/CategoryRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import ListSchema from './routes/MyListRoute.js';
import adminRouter from './routes/adminRoute.js'; // Import admin router


dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This is important for form-data
app.use(cookieParser());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use(morgan('dev'));

// Routes
app.use('/api/user', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/List', ListSchema);
app.use('/api/admin',adminRouter);

// Test Route
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${process.env.PORT || 8000}` });
});

// Connect to database and start server
const PORT = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});