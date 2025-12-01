export interface IUserMovieRepo {
  getAllFavoriteIds(sessionId: string): string[];
  addFavorite(sessionId: string, imdbID: string): void;
  removeFavorite(sessionId: string, imdbID: string): void;
  isFavorite(sessionId: string, imdbID: string): boolean;
}