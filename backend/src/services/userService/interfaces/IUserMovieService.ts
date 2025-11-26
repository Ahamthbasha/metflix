import { IOMDBSearchResponse, IMovie } from '../../../types/IMovie';

export interface IUserMovieService {
  searchMovies(query: string, page?: number): Promise<IOMDBSearchResponse>;
  getPopularMovies(): Promise<IMovie[]>
  getFavoriteIds(): string[];
  toggleFavorite(imdbID: string): { added: boolean };
  getFavoriteStatus(imdbIDs: string[]): Record<string, boolean>;
  getFavoritesWithDetails(imdbIDs: string[]): Promise<IMovie[]>;
}