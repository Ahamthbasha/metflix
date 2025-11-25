import { IOMDBSearchResponse } from '../../../types/IMovie';

export interface IUserMovieService {
  searchMovies(query: string, page?: number): Promise<IOMDBSearchResponse>;
  getFavoriteIds(): string[];
  toggleFavorite(imdbID: string): { added: boolean };
  getFavoriteStatus(imdbIDs: string[]): Record<string, boolean>;
}