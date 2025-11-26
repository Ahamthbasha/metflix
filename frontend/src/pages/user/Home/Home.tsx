import { useState, useEffect, useCallback, useRef } from "react";
import MovieCard from "../../../components/userComponent/MovieCard";
import { Search, Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { getMovies, getPopularMovies, toggleFavourite } from "../../../api/action/userAction";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import type { Movie, PaginationInfo } from "../interface/IHome";


const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalResults: 0,
    resultsPerPage: 0,
    hasMore: false,
  });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const moviesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const res = await getPopularMovies();
        if (res.success && res.data?.movies) {
          setMovies(res.data.movies);
        } else {
          toast.error("Failed to load popular movies");
        }
      } catch (error) {
        console.error("Failed to load popular movies:", error);
        toast.error("Failed to load popular movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const searchMovies = useCallback(
    debounce(async (searchQuery: string, pageNum: number) => {
      setSearchError(null);
      if (!searchQuery.trim()) {
        setLoading(true);
        try {
          const res = await getPopularMovies();
          if (res.success && res.data?.movies) {
            setMovies(res.data.movies);
          }
        } catch (error) {
          console.error("Failed to load popular movies:", error);
        } finally {
          setLoading(false);
        }
        
        setIsSearchActive(false);
        setPagination({
          currentPage: 1,
          totalResults: 0,
          resultsPerPage: 0,
          hasMore: false,
        });
        return;
      }

      if (searchQuery.trim().length < 2) {
        setSearchError("Please enter at least 2 characters to search");
        setMovies([]);
        setIsSearchActive(true);
        return;
      }

      setLoading(true);
      try {
        const data = await getMovies(searchQuery, pageNum);

        if (data.success && data.data?.Search) {
          setMovies(data.data.Search);
          setIsSearchActive(true);
          setSearchError(null);
          
          if (data.pagination) {
            setPagination(data.pagination);
          } else {
            const totalResults = parseInt(data.data.totalResults || '0', 10);
            setPagination({
              currentPage: pageNum,
              totalResults,
              resultsPerPage: data.data.Search.length,
              hasMore: totalResults > pageNum * 10,
            });
          }
        } else {
          setMovies([]);
          setIsSearchActive(true);
          setPagination({
            currentPage: pageNum,
            totalResults: 0,
            resultsPerPage: 0,
            hasMore: false,
          });
          const errorMessage = data.error || "No movies found";
          setSearchError(errorMessage);
          if (errorMessage.includes("specific") || errorMessage.includes("characters")) {
            toast.warning(errorMessage);
          } else {
            toast.info(errorMessage);
          }
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || "Search failed. Please try again.";
        toast.error(errorMessage);
        setSearchError(errorMessage);
        setMovies([]);
        setIsSearchActive(true);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (query || page > 1) {
      searchMovies(query, page);
    }
  }, [query, page, searchMovies]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleToggleFavorite = async (imdbID: string) => {
    try {
      const res = await toggleFavourite(imdbID);
      if (res.success) {
        setMovies(prevMovies => 
          prevMovies.map(movie => 
            movie.imdbID === imdbID 
              ? { ...movie, isFavorite: res.data?.added }
              : movie
          )
        );
        
        toast.success(res.data?.added ? "Added to Favorites" : "Removed from Favorites");
      }
    } catch {
      toast.error("Failed to update favorite");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && query.trim().length >= 2) {
      setPage(1);
      searchMovies(query, 1);
    } else if (query.trim().length < 2) {
      toast.warning("Please enter at least 2 characters to search");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      // Smooth scroll to movies section
      moviesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextPage = () => {
    if (pagination.hasMore) {
      setPage(page + 1);
      // Smooth scroll to movies section
      moviesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalPages = Math.ceil(pagination.totalResults / 10);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 mb-10">
            Watch anywhere. Cancel anytime.
          </p>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, TV shows..."
                  className="w-full px-6 py-5 pr-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 text-lg focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/30 transition-all"
                  minLength={2}
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-10 py-5 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={query.trim().length < 2}
              >
                Search
              </button>
            </div>
            
            {/* Hint text */}
            {query.length > 0 && query.length < 2 && (
              <p className="text-yellow-400 text-sm mt-3">
                Enter at least 2 characters to search
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Movies Section */}
      <section ref={moviesSectionRef} className="py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">
              {query ? `Results for "${query}"` : "Popular Movies"}
            </h2>
            
            {/* Results info */}
            {isSearchActive && pagination.totalResults > 0 && (
              <p className="text-gray-400 text-lg hidden md:block">
                Showing {((page - 1) * 10) + 1}-{Math.min(page * 10, pagination.totalResults)} of {pagination.totalResults} results
              </p>
            )}
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-16 h-16 animate-spin text-red-600" />
            </div>
          )}

          {/* Error Message */}
          {!loading && searchError && movies.length === 0 && (
            <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-1">Search Issue</h3>
                  <p className="text-gray-300">{searchError}</p>
                  {searchError.includes("specific") && (
                    <p className="text-gray-400 text-sm mt-2">
                      Try searching with more specific terms, like "The Dark Knight" instead of just "a"
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Movies Grid */}
          {!loading && (
            <>
              {movies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      imdbID={movie.imdbID}
                      title={movie.Title}
                      year={movie.Year}
                      poster={movie.Poster}
                      type={movie.Type as "movie" | "series"}
                      isFavorite={movie.isFavorite || false}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : !searchError && (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-xl">No movies found. Try a different search.</p>
                </div>
              )}

              {/* Pagination Controls */}
              {isSearchActive && pagination.totalResults > 0 && (
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition ${
                      page === 1
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 transform hover:scale-105"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  <span className="text-gray-300 text-lg font-medium">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={!pagination.hasMore}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition ${
                      !pagination.hasMore
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 transform hover:scale-105"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;