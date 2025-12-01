// src/pages/user/Home.tsx

import { useState, useEffect, useRef } from "react";
import MovieCard from "../../../components/userComponent/MovieCard";
import { Search, Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { getMovies, getPopularMovies, toggleFavourite } from "../../../api/action/userAction";
import { toast } from "react-toastify";
import useDebounce from "../../../hooks/useDebounce";
import type { Movie } from "../interface/IHome";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading = true
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false); // Track if user is searching

  const debouncedQuery = useDebounce(query.trim(), 600);
  const moviesSectionRef = useRef<HTMLDivElement>(null);

  // Load Popular Movies on Mount
  useEffect(() => {
    const loadPopular = async () => {
      try {
        setLoading(true);
        const res = await getPopularMovies();

        if (res.success && res.data?.movies?.length > 0) {
          setMovies(res.data.movies);
          setTotalResults(res.data.movies.length);
          setError(null);
        } else {
          toast.info("Could not load popular movies");
          setMovies([]);
        }
      } catch (err) {
        toast.error("Failed to load popular movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadPopular();
  }, []);

  // Handle Search or go back to popular
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery) {
        // User cleared search → reload popular movies
        setIsSearching(false);
        setPage(1);
        const res = await getPopularMovies();
        if (res.success) {
          setMovies(res.data.movies || []);
          setTotalResults(res.data.movies?.length || 0);
          setError(null);
        }
        return;
      }

      if (debouncedQuery.length < 2) {
        setError("Type at least 2 characters");
        setMovies([]);
        setIsSearching(true);
        return;
      }

      setIsSearching(true);
      setLoading(true);
      setError(null);

      try {
        const res = await getMovies(debouncedQuery, page);

        if (res.success && res.data?.Search) {
          setMovies(res.data.Search);
          setTotalResults(parseInt(res.data.totalResults || "0", 10));
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(res.error || "No movies found");
        }
      } catch (err: any) {
        const msg = err.response?.data?.error || "Search failed";
        setError(msg);
        toast.error(msg);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const handleToggleFavorite = async (imdbID: string) => {
    try {
      const res = await toggleFavourite(imdbID);
      if (res.success) {
        const added = res.data.added;
        setMovies((prev) =>
          prev.map((m) => (m.imdbID === imdbID ? { ...m, isFavorite: added } : m))
        );
        toast.success(added ? "Added to favorites" : "Removed from favorites");
      }
    } catch {
      toast.error("Failed to update favorite");
    }
  };

  const totalPages = Math.ceil(totalResults / 10);
  const hasMore = totalResults > page * 10;

  const sectionTitle = isSearching
    ? `Results for "${debouncedQuery}"`
    : "Popular Movies";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900/30 via-black to-black">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 mb-12">
            Watch anywhere. Cancel anytime.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies or TV shows..."
                className="w-full px-8 py-6 pr-16 text-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-full focus:outline-none focus:ring-4 focus:ring-red-600/60 placeholder-gray-400"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
            </div>
            {query.length > 0 && query.length < 2 && (
              <p className="text-yellow-400 text-sm mt-3">
                Please enter at least 2 characters
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section ref={moviesSectionRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-10">{sectionTitle}</h2>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-32">
              <Loader2 className="w-16 h-16 animate-spin text-red-600" />
            </div>
          )}

          {/* Error */}
          {error && !loading && movies.length === 0 && (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
              <p className="text-xl text-gray-300">{error}</p>
            </div>
          )}

          {/* Movies Grid */}
          {!loading && movies.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    imdbID={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    type={movie.Type as "movie" | "series"}
                    isFavorite={movie.isFavorite}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {/* Pagination - only show in search mode */}
              {isSearching && totalResults > 10 && (
                <div className="flex justify-center items-center gap-8 mt-16">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-semibold disabled:bg-gray-800 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-5 h-5" /> Previous
                  </button>

                  <span className="text-lg font-medium">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!hasMore}
                    className="flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-semibold disabled:bg-gray-800 disabled:cursor-not-allowed transition"
                  >
                    Next <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Results counter */}
              {isSearching && (
                <p className="text-center text-gray-400 mt-8">
                  Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, totalResults)} of{" "}
                  {totalResults.toLocaleString()} results
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;