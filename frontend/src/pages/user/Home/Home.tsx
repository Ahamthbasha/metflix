import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../../components/userComponent/MovieCard";
import { Search } from "lucide-react";

const defaultMovies = [
  { imdbID: "tt0111161", Title: "The Shawshank Redemption", Year: "1994", Poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt0068646", Title: "The Godfather", Year: "1972", Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAyNy00MTc1LWIxOTktZWIxN2Y0ZjFjYWI3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt0468569", Title: "The Dark Knight", Year: "2008", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt0109830", Title: "Forrest Gump", Year: "1994", Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODZlN2EtZTVkMS00ZjY1LWJlNzItZjQ3ZmQ1ZDQ3OTM1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt0133093", Title: "The Matrix", Year: "1999", Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt1375666", Title: "Inception", Year: "2010", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt0167260", Title: "The Lord of the Rings: The Return of the King", Year: "2003", Poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", Type: "movie" },
  { imdbID: "tt0120737", Title: "The Lord of the Rings: The Fellowship of the Ring", Year: "2001", Poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg", Type: "movie" },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(defaultMovies);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies(defaultMovies);
      return;
    }

    const filtered = defaultMovies.filter(movie =>
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleToggleFavorite = (imdbID: string) => {
    console.log("Favorite toggled:", imdbID);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Search */}
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

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, TV shows..."
                  className="w-full px-6 py-5 pr-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 text-lg focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/30 transition-all"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-10 py-5 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-10">
            {searchQuery ? `Results for "${searchQuery}"` : "Featured Today"}
          </h2>

          {filteredMovies.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-3xl text-gray-500">No movies found</p>
              <p className="text-gray-400 mt-4">Try searching for something else!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  imdbID={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                  type={movie.Type as "movie" | "series"}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;