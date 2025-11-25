import { IUserMovieRepo } from "./interfaces/IUserMovieRepo"; 

export class InMemoryUserMovieRepo implements IUserMovieRepo {
  private favorites: Set<string> = new Set();

  getAllFavoriteIds(): string[] {
    return Array.from(this.favorites);
  }

  addFavorite(imdbID: string): void {
    this.favorites.add(imdbID);
  }

  removeFavorite(imdbID: string): void {
    this.favorites.delete(imdbID);
  }

  isFavorite(imdbID: string): boolean {
    return this.favorites.has(imdbID);
  }
}