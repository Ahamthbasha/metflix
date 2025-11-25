import { Request, Response } from 'express';
import { IUserMovieService } from '../../services/userService/interfaces/IUserMovieService'; 
import { IUserMovieController } from './interfaces/IUserMovieController';
import { MESSAGES } from '../../utils/constants';
import { StatusCode } from '../../utils/enums';

export class UserMovieController implements IUserMovieController {
  private readonly movieService: IUserMovieService;

  constructor(movieService: IUserMovieService) {
    this.movieService = movieService;
  }

  async searchMovies(req: Request, res: Response): Promise<void> {
    try {
      const { q, page = '1' } = req.query;

      if (!q || typeof q !== 'string') {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: MESSAGES.SEARCH_QUERY_REQUIRED,
        });
        return;
      }

      const pageNum = parseInt(page as string, 10);
      if (isNaN(pageNum) || pageNum < 1) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: MESSAGES.INVALID_PAGE_NUMBER,
        });
        return;
      }

      const result = await this.movieService.searchMovies(q, pageNum);

      if (result.Response === 'False') {
        res.status(StatusCode.NOT_FOUND).json({
          success: false,
          error: result.Error || MESSAGES.NO_MOVIES_FOUND,
        });
        return;
      }

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.MOVIES_FOUND,
        data: result,
      });
    } catch (error: any) {
      console.error('Search movies error:', error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: MESSAGES.SEARCH_FAILED,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  async getFavourites(_req: Request, res: Response): Promise<void> {
    try {
      const favorites = this.movieService.getFavoriteIds();

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.FAVORITES_RETRIEVED,
        data: { favorites },
        count: favorites.length,
      });
    } catch (error: any) {
      console.error('Get favorites error:', error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: MESSAGES.FETCH_FAVORITES_FAILED,
      });
    }
  }

  async toggleFavorite(req: Request, res: Response): Promise<void> {
    try {
      const { imdbID } = req.body;

      if (!imdbID || typeof imdbID !== 'string' || !imdbID.startsWith('tt')) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: MESSAGES.INVALID_IMDB_ID,
        });
        return;
      }

      const result = this.movieService.toggleFavorite(imdbID);

      res.status(StatusCode.OK).json({
        success: true,
        message: result.added ? MESSAGES.FAVORITE_ADDED : MESSAGES.FAVORITE_REMOVED,
        data: {
          imdbID,
          added: result.added,
          action: result.added ? 'added_to_favorites' : 'removed_from_favorites',
        },
      });
    } catch (error: any) {
      console.error('Toggle favorite error:', error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: MESSAGES.TOGGLE_FAVORITE_FAILED,
      });
    }
  }
}