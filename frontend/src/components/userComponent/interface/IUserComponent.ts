export interface MovieCardProps {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  type: "movie" | "series";
  onToggleFavorite: (imdbID: string) => void;
  isFavorite?: boolean;
}