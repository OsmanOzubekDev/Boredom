import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerSpec } from './config/swagger';
import reviewRoutes from './routes/reviewRoutes';
import mongoose from 'mongoose';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/book_app';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB database connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));


if (!globalThis.crypto) {
  (globalThis as any).crypto = crypto;
}

app.use(express.json());

// Swagger Dokümantasyonu (http://localhost:3000/api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Merkezi Hata Yakalayıcı (Tüm rotaların EN ALTINDA olmalı!)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});