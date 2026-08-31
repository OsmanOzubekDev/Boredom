import request from 'supertest';
import express from 'express';

// Test ortamı için hafif Express sunucusu
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

describe('API Integration Tests', () => {
  it('GET /health endpoint 200 OK ve status needs to be OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});