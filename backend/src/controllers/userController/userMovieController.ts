// src/controllers/userController/UserMovieController.ts

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
      const sessionId = req.session.id; // Get session ID

      if (!q || typeof q !== 'string') {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: MESSAGES.SEARCH_QUERY_REQUIRED,
        });
        return;
      }

      if (q.trim().length < 2) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: 'Search query must be at least 2 characters long',
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
        const statusCode = result.Error?.includes('specific') || result.Error?.includes('Too many')
          ? StatusCode.BAD_REQUEST
          : StatusCode.NOT_FOUND;

        res.status(statusCode).json({
          success: false,
          error: result.Error || MESSAGES.NO_MOVIES_FOUND,
        });
        return;
      }

      // Get favorite status for THIS user's session
      const imdbIDs = result.Search?.map(movie => movie.imdbID) || [];
      const favoriteStatus = this.movieService.getFavoriteStatus(sessionId, imdbIDs);

      const moviesWithFavoriteStatus = result.Search?.map(movie => ({
        ...movie,
        isFavorite: favoriteStatus[movie.imdbID] || false,
      }));

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.MOVIES_FOUND,
        data: {
          Search: moviesWithFavoriteStatus,
          totalResults: result.totalResults,
          Response: result.Response,
        },
        pagination: {
          currentPage: pageNum,
          totalResults: parseInt(result.totalResults || '0', 10),
          resultsPerPage: result.Search?.length || 0,
          hasMore: result.Search && parseInt(result.totalResults || '0', 10) > (pageNum * 10),
        }
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

  async getPopularMovies(req: Request, res: Response): Promise<void> {
    try {
      const sessionId = req.session.id; // Get session ID
      const popularMovies = await this.movieService.getPopularMovies();

      if (popularMovies.length === 0) {
        res.status(StatusCode.NOT_FOUND).json({
          success: false,
          error: 'Failed to fetch popular movies',
        });
        return;
      }

      // Get favorite status for THIS user's session
      const imdbIDs = popularMovies.map(movie => movie.imdbID);
      const favoriteStatus = this.movieService.getFavoriteStatus(sessionId, imdbIDs);

      const moviesWithFavoriteStatus = popularMovies.map(movie => ({
        ...movie,
        isFavorite: favoriteStatus[movie.imdbID] || false,
      }));

      res.status(StatusCode.OK).json({
        success: true,
        message: 'Popular movies retrieved successfully',
        data: { movies: moviesWithFavoriteStatus },
        count: moviesWithFavoriteStatus.length,
      });
    } catch (error: any) {
      console.error('Get popular movies error:', error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Failed to fetch popular movies',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  async getFavourites(req: Request, res: Response): Promise<void> {
    try {
      const sessionId = req.session.id; // Get session ID
      
      // Get THIS user's favorite IDs
      const favoriteIds = this.movieService.getFavoriteIds(sessionId);

      if (favoriteIds.length === 0) {
        res.status(StatusCode.OK).json({
          success: true,
          message: 'No favorites found',
          data: { favorites: [] },
          count: 0,
        });
        return;
      }

      // Fetch full movie details
      const moviesWithDetails = await this.movieService.getFavoritesWithDetails(
        sessionId, 
        favoriteIds
      );

      const moviesWithFavoriteStatus = moviesWithDetails.map(movie => ({
        ...movie,
        isFavorite: true,
      }));

      res.status(StatusCode.OK).json({
        success: true,
        message: MESSAGES.FAVORITES_RETRIEVED,
        data: { favorites: moviesWithFavoriteStatus },
        count: moviesWithFavoriteStatus.length,
      });
    } catch (error: any) {
      console.error('Get favorites error:', error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: MESSAGES.FETCH_FAVORITES_FAILED,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  async toggleFavorite(req: Request, res: Response): Promise<void> {
    try {
      const { imdbID } = req.body;
      const sessionId = req.session.id; // Get session ID

      if (!imdbID || typeof imdbID !== 'string' || !imdbID.startsWith('tt')) {
        res.status(StatusCode.BAD_REQUEST).json({
          success: false,
          error: MESSAGES.INVALID_IMDB_ID,
        });
        return;
      }

      // Toggle for THIS user's session
      const result = this.movieService.toggleFavorite(sessionId, imdbID);

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