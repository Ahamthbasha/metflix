// src/controllers/userController/interfaces/IUserMovieController.ts
import { Request, Response } from 'express';

export interface IUserMovieController {
  searchMovies(req: Request, res: Response): Promise<void>;
  getPopularMovies(req: Request, res: Response): Promise<void>;
  getFavourites(req: Request, res: Response): Promise<void>;
  toggleFavorite(req: Request, res: Response): Promise<void>;
}