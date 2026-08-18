import { Request, Response } from 'express';
import { pool } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';

// 1. Kullanıcı Kaydı (Register)
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
    const values = [username, email, hashedPassword];
    
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Kullanıcı başarıyla kaydedildi!',
      user: result.rows[0]
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Kullanıcı adı veya email zaten kullanımda.' });
    }
    res.status(500).json({ error: 'Kayıt işlemi başarısız oldu.' });
  }
};

// 2. Kullanıcı Girişi (Login)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Geçersiz email veya şifre.' });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Geçersiz email veya şifre.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Giriş başarılı!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Giriş işlemi sırasında bir hata oluştu.' });
  }
};

// 3. Kullanıcı Profil Bilgisi (Korumalı Rota Testi)
export const getMe = async (req: AuthRequest, res: Response) => {
  res.status(200).json({
    message: 'Korumalı rotaya erişim başarılı!',
    user: req.user
  });
};