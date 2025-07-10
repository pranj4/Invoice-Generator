// creating the server for project

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import pdfRoutes from "./routes/pdf";
import invoiceRoutes from './routes/invoiceRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ;

mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use("/api", pdfRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});