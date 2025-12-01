import { IOMDBSearchResponse, IMovie } from '../../../types/IMovie';
export interface IUserMovieService {
  searchMovies(query: string, page?: number): Promise<IOMDBSearchResponse>;
  getPopularMovies(): Promise<IMovie[]>;
  getFavoriteIds(sessionId: string): string[];
  toggleFavorite(sessionId: string, imdbID: string): { added: boolean };
  getFavoriteStatus(sessionId: string, imdbIDs: string[]): Record<string, boolean>;
  getFavoritesWithDetails(sessionId: string, imdbIDs: string[]): Promise<IMovie[]>;
}