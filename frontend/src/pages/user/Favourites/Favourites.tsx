import { useState, useEffect } from "react";
import MovieCard from "../../../components/userComponent/MovieCard";
import { Heart, Loader2, RefreshCw } from "lucide-react";
import { getFavourites, toggleFavourite } from "../../../api/action/userAction";
import { toast } from "react-toastify";
import type { Movie } from "../interface/IHome";

const Favourites = () => {
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      const res = await getFavourites();
      
      if (res.success) {
        setFavourites(res.data?.favorites || []);
        
        if (showRefreshIndicator && res.data?.favorites?.length > 0) {
          toast.success("Favourites refreshed");
        }
      } else {
        toast.error(res.error || "Failed to load favourites");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to load favourites";
      toast.error(errorMessage);
      console.error("Load favourites error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleToggleFavorite = async (imdbID: string) => {
    try {
      const res = await toggleFavourite(imdbID);
      
      if (res.success) {
        if (!res.data?.added) {
          setFavourites(prevFavourites => 
            prevFavourites.filter(movie => movie.imdbID !== imdbID)
          );
          toast.success("Removed from Favourites");
        } else {
          setFavourites(prevFavourites =>
            prevFavourites.map(movie =>
              movie.imdbID === imdbID ? { ...movie, isFavorite: true } : movie
            )
          );
          toast.success("Added to Favourites");
        }
      } else {
        toast.error(res.error || "Failed to update favorite");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to update favorite";
      toast.error(errorMessage);
      console.error("Toggle favorite error:", error);
    }
  };

  const handleRefresh = () => {
    loadFavourites(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with refresh button */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Heart className="w-10 h-10 text-red-600 fill-red-600" />
              <h1 className="text-4xl font-bold">My Favourites</h1>
              {favourites.length > 0 && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {favourites.length}
                </span>
              )}
            </div>

            {/* Refresh button */}
            {favourites.length > 0 && (
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Refresh favourites"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-16 h-16 animate-spin text-red-600 mb-4" />
              <p className="text-gray-400">Loading your favourites...</p>
            </div>
          ) : favourites.length > 0 ? (
            /* Movies grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {favourites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  imdbID={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                  type={movie.Type as "movie" | "series"}
                  isFavorite={movie.isFavorite !== undefined ? movie.isFavorite : true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <Heart className="w-20 h-20 text-gray-700 mx-auto mb-6" />
              <p className="text-gray-400 text-xl mb-4">No favourites yet</p>
              <p className="text-gray-500 mb-8">
                Start adding movies to your favourites from the home page!
              </p>
              <a
                href="/"
                className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold text-lg transition transform hover:scale-105"
              >
                Browse Movies
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favourites;