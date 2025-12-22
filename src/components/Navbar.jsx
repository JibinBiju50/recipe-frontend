import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full shadow-sm flex items-center justify-between px-6 py-4 z-10 bg-[var(--color-bg)]">
      <div>
        <img src={logo} alt="Logo" className="w-20 h-12" />
      </div>

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
        <a
          href="#"
          className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#recipe-list"
          className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200"
        >
          Recipe
        </a>
        <a
          href="#about"
          className="text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium transition-colors duration-200"
        >
          About Us
        </a>
      </div>

      {/* Mobile menu dropdown (only on mobile) */}
      <div
        className={`absolute top-full left-0 w-full bg-[var(--color-bg)] shadow-md flex flex-col items-center py-4 md:hidden z-20 transition-all duration-300 ease-in-out transform ${menuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
        style={{ transformOrigin: 'top' }}
      >
        <a
          href="#"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>
        <a
          href="#recipe-list"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          Recipe
        </a>
        <a
          href="#about"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </a>
        <a
          href="#community"
          className="py-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] font-medium w-full text-center"
          onClick={() => setMenuOpen(false)}
        >
          Community
        </a>
      </div>
    </nav>
  );
}

export default Navbar;