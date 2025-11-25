export interface IUserMovieRepo {
  getAllFavoriteIds(): string[];
  addFavorite(imdbID: string): void;
  removeFavorite(imdbID: string): void;
  isFavorite(imdbID: string): boolean;
}