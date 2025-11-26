// src/services/userService/UserMovieService.ts
import { IUserMovieService } from './interfaces/IUserMovieService'; 
import { IUserMovieRepo } from '../../repositories/userRepo/interfaces/IUserMovieRepo'; 
import { searchOmdbMovies, getOmdbMovieById } from '../../utils/omdbClient'; 
import { IOMDBSearchResponse, IMovie } from '../../types/IMovie'; 

export class UserMovieService implements IUserMovieService {
  private readonly MOVIES_PER_PAGE = 10;
  private _movieRepo: IUserMovieRepo;
  
  // Popular movie IDs to fetch when no search query is provided
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

    // Fetch from OMDB API
    const result = await searchOmdbMovies(query.trim(), page);

    // If successful, limit results to MOVIES_PER_PAGE
    if (result.Response === 'True' && result.Search) {
      result.Search = result.Search.slice(0, this.MOVIES_PER_PAGE);
    }

    return result;
  }

  /**
   * Get popular movies with favorite status
   * Used for the default home page view
   */
  async getPopularMovies(): Promise<IMovie[]> {
    try {
      // Fetch all popular movie details in parallel
      const moviePromises = this.POPULAR_MOVIE_IDS.map(id => getOmdbMovieById(id));
      const results = await Promise.allSettled(moviePromises);

      // Filter out failed requests and map to IMovie format with favorite status
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

  getFavoriteIds(): string[] {
    return this._movieRepo.getAllFavoriteIds();
  }

  toggleFavorite(imdbID: string): { added: boolean } {
    if (this._movieRepo.isFavorite(imdbID)) {
      this._movieRepo.removeFavorite(imdbID);
      return { added: false };
    } else {
      this._movieRepo.addFavorite(imdbID);
      return { added: true };
    }
  }

  getFavoriteStatus(imdbIDs: string[]): Record<string, boolean> {
    return imdbIDs.reduce((acc, id) => {
      acc[id] = this._movieRepo.isFavorite(id);
      return acc;
    }, {} as Record<string, boolean>);
  }

  /**
   * Fetch full movie details for favorite IDs
   * This method fetches detailed information for each favorite movie from OMDB API
   */
  async getFavoritesWithDetails(imdbIDs: string[]): Promise<IMovie[]> {
    if (imdbIDs.length === 0) {
      return [];
    }

    try {
      // Fetch all movie details in parallel
      const moviePromises = imdbIDs.map(id => getOmdbMovieById(id));
      const results = await Promise.allSettled(moviePromises);

      // Filter out failed requests and map to IMovie format
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