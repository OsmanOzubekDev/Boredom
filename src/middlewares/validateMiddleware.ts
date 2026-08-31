import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// POST ve PUT için Zorunlu Alan Şeması
export const createBookSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required and cannot be empty'),
  author: z
    .string()
    .min(1, 'Author is required and cannot be empty'),
  isbn: z.string().optional(),
  description: z.string().optional()
});

// PATCH (Kısmi Güncelleme) için Bütün Alanları Opsiyonel Yapan Şema
export const updateBookPatchSchema = createBookSchema.partial();

// Express için Jenerik Middleware Fonksiyonu
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation Error',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      next(error);
    }
  };
};