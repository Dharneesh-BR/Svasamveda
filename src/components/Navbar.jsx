import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { logOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import SvasamLogo from '../assets/Logo.png';
import CartIcon from './CartIcon';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Function to refresh the page
  const refreshPage = () => {
    navigate(window.location.pathname);
    window.location.reload();
  };

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    refreshPage();
  };

  return (
    <>
    <nav className="bg-background shadow px-4 sm:px-6 py-3 sm:py-4 flex items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2" aria-label="Svasam Home">
          <img src={SvasamLogo} alt="Svasam Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-xl sm:text-2xl font-bold text-main">Svasam</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-4 lg:gap-6 font-medium text-accent flex-1 justify-center">
        <li className="relative group">
          <button className="flex items-center gap-1 hover:text-main transition font-semibold focus:outline-none">
            Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute left-0 mt-3 w-48 bg-gradient-to-br from-background to-white rounded-xl shadow-2xl border border-accent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transform scale-95 group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200 z-30 hover:opacity-100 hover:pointer-events-auto hover:scale-100">
            <div className="py-2">
              <Link to="/mind" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold">Mind</Link>
              <Link to="/body" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold">Body</Link>
              <Link to="/soul" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold">Soul</Link>
            </div>
          </div>
        </li>
        <li><Link to="/store" className="hover:text-main transition font-semibold">Spiritual Store</Link></li>
        <li><Link to="/sessions" className="hover:text-main transition font-semibold">Personal Sessions</Link></li>
        <li><Link to="/blog" className="hover:text-main transition font-semibold">Blog</Link></li>
      </ul>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        {/* Cart Icon */}
        <div className="relative">
          <CartIcon />
        </div>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="hidden lg:flex px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 via-purple-200 to-blue-100 text-main font-semibold shadow border border-purple-200 text-sm">
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {user?.displayName || user?.email || 'User'}
            </span>
            <Link to="/dashboard" className="px-3 py-2 rounded-full bg-main text-white font-semibold shadow border border-main hover:brightness-105 transition text-sm">Dashboard</Link>
            <button onClick={handleLogout} className="px-3 py-2 rounded-full bg-main text-white font-semibold shadow border border-main hover:brightness-105 transition text-sm">Logout</button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-main text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 border border-main text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="hidden lg:inline">My Sessions</span>
            <span className="lg:hidden">Login</span>
          </Link>
        )}
      </div>
    </nav>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-background border-t border-accent/20 shadow-lg">
        <div className="px-4 py-2 space-y-1">
          <div className="py-2">
            <p className="text-xs font-semibold text-accent/60 uppercase tracking-wider mb-2">Categories</p>
            <div className="space-y-1 pl-2">
              <Link to="/mind" className="block px-3 py-2 rounded-lg text-main hover:bg-accent/20 transition font-medium">Mind</Link>
              <Link to="/body" className="block px-3 py-2 rounded-lg text-main hover:bg-accent/20 transition font-medium">Body</Link>
              <Link to="/soul" className="block px-3 py-2 rounded-lg text-main hover:bg-accent/20 transition font-medium">Soul</Link>
            </div>
          </div>
          <Link to="/store" className="block px-3 py-2 rounded-lg hover:bg-accent/20 transition font-medium">Svasam Store</Link>
          <Link to="/sessions" className="block px-3 py-2 rounded-lg hover:bg-accent/20 transition font-medium">Svasam Sessions</Link>
          <Link to="/blog" className="block px-3 py-2 rounded-lg hover:bg-accent/20 transition font-medium">Blog</Link>
          
          {/* Mobile Auth Section */}
          <div className="border-t border-accent/20 pt-2 mt-2">
            <Link to="/cart" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/20 transition font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Link>
            
            {user ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm text-accent">
                  {user?.displayName || user?.email || 'User'}
                </div>
                <Link to="/dashboard" className="block px-3 py-2 rounded-lg bg-main text-white font-medium hover:brightness-105 transition">Dashboard</Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg bg-main text-white font-medium hover:brightness-105 transition">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-lg bg-main text-white font-medium hover:brightness-105 transition text-center">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
