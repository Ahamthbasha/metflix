// src/services/userService/UserMovieService.ts

import { IUserMovieService } from './interfaces/IUserMovieService'; 
import { IUserMovieRepo } from '../../repositories/userRepo/interfaces/IUserMovieRepo'; 
import { searchOmdbMovies, getOmdbMovieById } from '../../utils/omdbClient'; 
import { IOMDBSearchResponse, IMovie } from '../../types/IMovie'; 

export class UserMovieService implements IUserMovieService {
  private readonly MOVIES_PER_PAGE = 10;
  private _movieRepo: IUserMovieRepo;
  
  private readonly POPULAR_MOVIE_IDS = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0468569', // The Dark Knight
    'tt0071562', // The Godfather Part II
    'tt0167260', // The Lord of the Rings: The Return of the King
    'tt0110912', // Pulp Fiction
    'tt0108052', // Schindler's List
    'tt1375666', // Inception
  ];
  
  constructor(movieRepo: IUserMovieRepo) {
    this._movieRepo = movieRepo;
  }

  async searchMovies(query: string, page: number = 1): Promise<IOMDBSearchResponse> {
    if (!query?.trim()) {
      return { Response: 'False', Error: 'Search query is required' };
    }

    const result = await searchOmdbMovies(query.trim(), page);

    if (result.Response === 'True' && result.Search) {
      result.Search = result.Search.slice(0, this.MOVIES_PER_PAGE);
    }

    return result;
  }

  async getPopularMovies(): Promise<IMovie[]> {
    try {
      const moviePromises = this.POPULAR_MOVIE_IDS.map(id => getOmdbMovieById(id));
      const results = await Promise.allSettled(moviePromises);
      const movies: IMovie[] = results
        .filter((result): result is PromiseFulfilledResult<any> => 
          result.status === 'fulfilled' && result.value.Response === 'True'
        )
        .map(result => ({
          imdbID: result.value.imdbID,
          Title: result.value.Title,
          Year: result.value.Year,
          Poster: result.value.Poster,
          Type: result.value.Type,
        }));

      return movies;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  }

  // Updated to accept sessionId
  getFavoriteIds(sessionId: string): string[] {
    return this._movieRepo.getAllFavoriteIds(sessionId);
  }

  // Updated to accept sessionId
  toggleFavorite(sessionId: string, imdbID: string): { added: boolean } {
    if (this._movieRepo.isFavorite(sessionId, imdbID)) {
      this._movieRepo.removeFavorite(sessionId, imdbID);
      return { added: false };
    } else {
      this._movieRepo.addFavorite(sessionId, imdbID);
      return { added: true };
    }
  }

  // Updated to accept sessionId
  getFavoriteStatus(sessionId: string, imdbIDs: string[]): Record<string, boolean> {
    return imdbIDs.reduce((acc, id) => {
      acc[id] = this._movieRepo.isFavorite(sessionId, id);
      return acc;
    }, {} as Record<string, boolean>);
  }

  async getFavoritesWithDetails(sessionId: string, imdbIDs: string[]): Promise<IMovie[]> {
    if (imdbIDs.length === 0) {
      return [];
    }

    try {
      const moviePromises = imdbIDs.map(id => getOmdbMovieById(id));
      const results = await Promise.allSettled(moviePromises);
      const movies: IMovie[] = results
        .filter((result): result is PromiseFulfilledResult<any> => 
          result.status === 'fulfilled' && result.value.Response === 'True'
        )
        .map(result => ({
          imdbID: result.value.imdbID,
          Title: result.value.Title,
          Year: result.value.Year,
          Poster: result.value.Poster,
          Type: result.value.Type,
        }));

      return movies;
    } catch (error) {
      console.error('Error fetching favorites with details:', error);
      return [];
    }
  }
}