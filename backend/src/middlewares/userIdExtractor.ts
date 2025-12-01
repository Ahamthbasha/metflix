import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const extractUserId = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    res.status(400).json({
      success: false,
      error: 'User ID is required in X-User-ID header',
    });
    return;
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
    res.status(400).json({
      success: false,
      error: 'Invalid User ID format',
    });
    return;
  }

  req.userId = userId;
  next();
};