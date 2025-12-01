import { IUserMovieRepo } from "./interfaces/IUserMovieRepo";

export class SessionUserMovieRepo implements IUserMovieRepo {
  private userFavorites: Map<string, Set<string>> = new Map();

  getAllFavoriteIds(sessionId: string): string[] {
    const favorites = this.userFavorites.get(sessionId);
    return favorites ? Array.from(favorites) : [];
  }

  addFavorite(sessionId: string, imdbID: string): void {
    if (!this.userFavorites.has(sessionId)) {
      this.userFavorites.set(sessionId, new Set());
    }
    this.userFavorites.get(sessionId)!.add(imdbID);
  }

  removeFavorite(sessionId: string, imdbID: string): void {
    const favorites = this.userFavorites.get(sessionId);
    if (favorites) {
      favorites.delete(imdbID);
      if (favorites.size === 0) {
        this.userFavorites.delete(sessionId);
      }
    }
  }

  isFavorite(sessionId: string, imdbID: string): boolean {
    const favorites = this.userFavorites.get(sessionId);
    return favorites ? favorites.has(imdbID) : false;
  }

  getTotalUsers(): number {
    return this.userFavorites.size;
  }

  clearUserFavorites(sessionId: string): void {
    this.userFavorites.delete(sessionId);
  }
}