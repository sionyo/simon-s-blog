import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import authController from './controllers/authController.js';

const app = express();
connectDB();

authController.initializeAdmin();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://simonsblog20.netlify.app/'] 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req,res) => {
    res.json({
        message: 'server is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!'});
})

process.on('unhandledRejection', (err,promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', err)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});