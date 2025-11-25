export interface MovieCardProps {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  type?: "movie" | "series";
  isFavorite?: boolean;
  onToggleFavorite?: (imdbID: string) => void;
}