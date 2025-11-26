import { useState } from "react";
import { Heart, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {type MovieCardProps } from "./interface/IUserComponent";

const MovieCard = ({
  imdbID,
  title,
  year,
  poster,
  type,
  onToggleFavorite,
  isFavorite = false,
}: MovieCardProps) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
    onToggleFavorite(imdbID);
  };

  const handleClick = () => {
    navigate(`/movie/${imdbID}`);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  // Check if poster is valid
  const isValidPoster = poster && poster !== "N/A" && !imgError;

  return (
    <div
      className="group relative cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      {/* Poster Image or Fallback */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
        {isValidPoster ? (
          <img
            src={poster}
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          // Fallback UI for broken/missing images
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-gray-400">
            <Film className="w-16 h-16 mb-3 opacity-50" />
            <p className="text-center text-sm font-medium line-clamp-2">
              {title}
            </p>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {title}
            </p>
            <p className="text-gray-300 text-xs">
              {year} • {type === "movie" ? "Movie" : "Series"}
            </p>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all z-10"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFav ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Type Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs font-semibold text-white uppercase">
          {type}
        </div>
      </div>

      {/* Title and Year (below poster) */}
      <div className="mt-3 px-1">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-gray-400 text-xs">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;