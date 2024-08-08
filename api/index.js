import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import paymentRoutes from "./routes/payment.route.js"
import buypacksRoutes from "./routes/buypacks.route.js"
import referrelRoutes from "./routes/referrel.route.js"
import leaderboardRoutes from "./routes/leaderboard.route.js"
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './config/db.js';
import cors from "cors"

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const port = process.env.PORT || 3000;


// mongoose
//   .connect("mongodb+srv://RealEstate:RealEstate@realestate.n8dpbzv.mongodb.net/Auth?retryWrites=true&w=majority&appName=RealEstate")
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

connectDB()

const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



app.listen(3000, () => {
  console.log(`Server listening on port 3000 `);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes)
app.use('/api/buypacks', buypacksRoutes)
app.use('/api/referrel', referrelRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
