import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// JSON formatındaki istekleri okuyabilmek için middleware
app.use(express.json());

// Şemadaki "Health Endpoints" (Sağlık Kontrolü)
app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy and running!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});