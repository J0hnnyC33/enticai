// frontend/src/components/Navbar.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-gray-100 border-b border-blue-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300">
              ENTICAI
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" onClick={handleLinkClick} className="hover:text-blue-400 transition duration-300">Home</Link>
            <Link to="/roadmap" onClick={handleLinkClick} className="hover:text-blue-400 transition duration-300">Roadmap</Link>
            <Link to="/about" onClick={handleLinkClick} className="hover:text-blue-400 transition duration-300">About</Link>
            <Link to="/contact" onClick={handleLinkClick} className="hover:text-blue-400 transition duration-300">Contact</Link>
            <Link to="/hiring" onClick={handleLinkClick} className="hover:text-blue-400 transition duration-300">Hiring</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden py-4 space-y-4">
            <Link to="/" onClick={handleLinkClick} className="block hover:text-blue-400 transition duration-300">Home</Link>
            <Link to="/roadmap" onClick={handleLinkClick} className="block hover:text-blue-400 transition duration-300">Roadmap</Link>
            <Link to="/about" onClick={handleLinkClick} className="block hover:text-blue-400 transition duration-300">About</Link>
            <Link to="/contact" onClick={handleLinkClick} className="block hover:text-blue-400 transition duration-300">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 