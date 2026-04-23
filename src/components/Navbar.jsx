import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth, logout as logoutAPI } from '../service/authAPI';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setAuthenticated(await checkAuth());
    })();
  }, []);

  const handleLogout = async () => {
    await logoutAPI();
    setAuthenticated(false);
    toast.success('Logged out');
    navigate('/login');
  };
  return (
    <nav className="fixed top-0 left-0 w-full shadow-sm flex items-center justify-between px-6 py-4 z-10 bg-[var(--color-bg)]">
      <Link to="/" aria-label="Go to home">
        <img src={logo} alt="Logo" className="w-20 h-12" />
      </Link>

      {/* Mobile menu button - only visible on screens smaller than md */}
      <div className="md:!hidden">
        <button
          className="flex justify-center items-center w-10 h-10 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <FontAwesomeIcon icon={faXmark} className="text-2xl text-[var(--color-primary)] transition-all duration-200" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="text-2xl text-[var(--color-primary)] transition-all duration-200" />
          )}
        </button>
      </div>

      {/* Desktop nav links - only visible on md and larger screens */}
      <div className="!hidden md:!flex space-x-4">
        <Link to="/" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200">Home</Link>
        <Link to="/#recipe-list" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200">Recipe</Link>
        <Link to="/#about" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200">About Us</Link>
        {authenticated && (
          <Link to="/profile" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200">Profile</Link>
        )}
        {authenticated ? (
          <button onClick={handleLogout} className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200">Login</Link>
            <Link to="/register" className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200">Register</Link>
          </>
        )}
      </div>

      {/* Mobile menu dropdown (only on mobile) */}
      <div
        className={`absolute top-full left-0 w-full bg-[var(--color-bg)] shadow-md flex flex-col items-center py-4 md:hidden z-20 transition-all duration-300 ease-in-out transform ${menuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
        style={{ transformOrigin: 'top' }}
      >
        <Link
          to="/"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/#recipe-list"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          Recipe
        </Link>
        <Link
          to="/#about"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>
        {authenticated && (
          <Link
            to="/profile"
            className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
        )}
        {authenticated ? (
          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
