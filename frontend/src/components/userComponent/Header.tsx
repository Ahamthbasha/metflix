// src/components/layout/Header.tsx or wherever you keep it
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm text-white z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-3xl font-bold tracking-tight cursor-pointer hover:text-red-500 transition"
            onClick={() => navigate("/")}
          >
            METFLIX
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className="hover:text-red-500 transition text-lg font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/user/favourites")}
              className="hover:text-red-500 transition text-lg font-medium"
            >
              Favourites
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-red-500 transition"
          >
            {isOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/");
              }}
              className="block w-full text-left py-2 text-lg hover:text-red-500 transition"
            >
              Home
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/user/favourites");
              }}
              className="block w-full text-left py-2 text-lg hover:text-red-500 transition"
            >
              Favourites
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;