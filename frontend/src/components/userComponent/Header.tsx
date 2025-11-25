import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../api/auth/userAuth"; 
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { clearUserDetails } from "../../redux/slices/userSlice"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, name } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!email;

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUserDetails());
      toast.success("Logged out successfully");
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

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
            <button onClick={() => navigate("/")} className="hover:text-red-500 transition text-lg font-medium">
              Home
            </button>
            {isLoggedIn && (
              <button onClick={() => navigate("/favourites")} className="hover:text-red-500 transition text-lg font-medium">
                Favourites
              </button>
            )}
            {isLoggedIn ? (
              <>
                <span className="font-medium text-white">Hi, {name || "User"}</span>
                <button onClick={handleLogout} className="hover:text-red-500 transition text-lg font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/user/signup")} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-medium transition">
                  Sign Up
                </button>
                <button onClick={() => navigate("/user/login")} className="text-white hover:text-red-500 transition font-medium">
                  Log In
                </button>
              </>
            )}
          </nav>

          {/* Mobile Navigation Button */}
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
            <button onClick={() => { setIsOpen(false); navigate("/"); }} className="block w-full text-left py-2 text-lg">
              Home
            </button>
            {isLoggedIn && (
              <button onClick={() => { setIsOpen(false); navigate("/favourites"); }} className="block w-full text-left py-2 text-lg">
                Favourites
              </button>
            )}
            {isLoggedIn ? (
              <>
                <div className="text-lg font-bold text-red-500">Hi, {name || "User"}!</div>
                <hr className="border-gray-700" />
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500 font-bold text-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setIsOpen(false); navigate("/user/signup"); }} className="block w-full bg-red-600 py-3 rounded font-bold text-lg">
                  Sign Up
                </button>
                <button onClick={() => { setIsOpen(false); navigate("/user/login"); }} className="block w-full bg-white text-black py-3 rounded font-bold text-lg">
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;