import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger Dokümantasyonu (http://localhost:3000/api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Merkezi Hata Yakalayıcı (Tüm rotaların EN ALTINDA olmalı!)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});