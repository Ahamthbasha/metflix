import { useState } from "react";
import { Heart } from "lucide-react";
import type { MovieCardProps } from "./interface/IUserComponent";

const MovieCard = ({
  imdbID,
  title,
  year,
  poster,
  type = "movie",
  isFavorite = false,
  onToggleFavorite,
}: MovieCardProps) => {
  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFav(prev => !prev);
    onToggleFavorite?.(imdbID);
  };

  const posterUrl = poster && poster !== "N/A"
    ? poster
    : "https://via.placeholder.com/300x450/111827/ffffff?text=No+Image";

  return (
    <div className="group relative overflow-hidden rounded-lg bg-black/60 border border-gray-800 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-600/50 cursor-pointer">
      {/* Poster */}
      <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Favorite Heart */}
      <button
        onClick={handleFavorite}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isFav
            ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
            : "bg-black/70 text-gray-400 hover:text-white hover:bg-red-600/80"
        }`}
      >
        <Heart
          size={20}
          className={`transition-all ${isFav ? "fill-current" : ""}`}
        />
      </button>

      {/* Info Panel - Slides Up on Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-300 text-sm font-medium">{year}</span>
          {type && (
            <span className="text-xs px-2 py-1 bg-red-600/80 text-white rounded-full">
              {type === "series" ? "Series" : "Movie"}
            </span>
          )}
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );
};

export default MovieCard;