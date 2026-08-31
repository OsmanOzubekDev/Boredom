import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  // Express'in hata middleware'ini tanıması için next parametresi şarttır!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction 
) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || 'Something went wrong in server.';

  console.error(`[Error Handler] ${req.method} ${req.url} -> Status: ${statusCode} | Message: ${message}`);

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
};