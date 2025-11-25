import { IUserMovieService } from './interfaces/IUserMovieService'; 
import { IUserMovieRepo } from '../../repositories/userRepo/interfaces/IUserMovieRepo'; 
import { searchOmdbMovies } from '../../utils/omdbClient'; 
import { IOMDBSearchResponse } from '../../types/IMovie'; 

export class UserMovieService implements IUserMovieService {
  constructor(private readonly movieRepo: IUserMovieRepo) {}

  async searchMovies(query: string, page: number = 1): Promise<IOMDBSearchResponse> {
    if (!query?.trim()) {
      return { Response: 'False', Error: 'Search query is required' };
    }

    return await searchOmdbMovies(query.trim(), page);
  }

  getFavoriteIds(): string[] {
    return this.movieRepo.getAllFavoriteIds();
  }

  toggleFavorite(imdbID: string): { added: boolean } {
    if (this.movieRepo.isFavorite(imdbID)) {
      this.movieRepo.removeFavorite(imdbID);
      return { added: false };
    } else {
      this.movieRepo.addFavorite(imdbID);
      return { added: true };
    }
  }

  getFavoriteStatus(imdbIDs: string[]): Record<string, boolean> {
    return imdbIDs.reduce((acc, id) => {
      acc[id] = this.movieRepo.isFavorite(id);
      return acc;
    }, {} as Record<string, boolean>);
  }
}