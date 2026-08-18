import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" formatından token'ı al

  if (!token) {
    return res.status(401).json({ error: 'Erişim reddedildi. Token bulunamadı.' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as { id: number; username: string };

    req.user = decoded;
    next(); // İstek bir sonraki middleware veya controller'a geçsin
  } catch (error) {
    return res.status(403).json({ error: 'Geçersiz veya süresi dolmuş token.' });
  }
};