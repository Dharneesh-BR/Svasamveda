import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import SvasamLogo from '../assets/Logo.png';
import CartIcon from './CartIcon';

export default function Navbar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  // Function to refresh the page
  const refreshPage = () => {
    navigate(window.location.pathname);
    window.location.reload();
  };

  const handleLogout = async () => {
    await logOut();
    refreshPage();
  };

  // Handle navigation and close mobile menu
  const handleNavigation = (e) => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
    // If it's a link, let it handle the navigation
    if (e.target.tagName === 'A') {
      return; // Let the Link component handle the navigation
    }
    // If it's a button, prevent default and use the URL from data-href
    if (e.target.tagName === 'BUTTON' && e.target.dataset.href) {
      e.preventDefault();
      navigate(e.target.dataset.href);
    }
  };

  return (
    <>
    {/* Mobile Navigation */}
    <nav className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-3 py-2 flex justify-between items-center">
        <button 
          className="p-2 -ml-2 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-gray-900">SVASAM</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-gray-700 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
          </Link>
          
          {user ? (
            <Link to="/profile" className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          ) : (
            <Link to="/login" className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex bg-background shadow px-4 sm:px-6 py-2 items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2" aria-label="Svasam Home">
          <img src={SvasamLogo} alt="Svasam Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-xl sm:text-2xl font-bold text-main">Svasam</span>
        </Link>
      </div>

      <ul className="flex gap-4 lg:gap-6 font-medium text-accent flex-1 justify-center">
        <li className="relative group">
          <button className="flex items-center gap-1 hover:text-main transition font-semibold focus:outline-none">
            Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-gradient-to-br from-background to-white rounded-xl shadow-2xl border border-accent opacity-0 invisible group-hover:visible group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
            <div className="py-2">
              <Link to="/mind" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold" onClick={handleNavigation}>Mind</Link>
              <Link to="/body" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold" onClick={handleNavigation}>Body</Link>
              <Link to="/soul" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold" onClick={handleNavigation}>Soul</Link>
            </div>
          </div>
        </li>
        <li><Link to="/sessions" className="hover:text-main transition font-semibold" onClick={handleNavigation}>Wellness Library</Link></li>
        <li><Link to="/blog" className="hover:text-main transition font-semibold" onClick={handleNavigation}>Blog</Link></li>
      </ul>

      <div className="flex items-center gap-2 lg:gap-4">
        <Link to="/cart" className="text-gray-700 relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
        </Link>

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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-main text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 border border-main text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="hidden lg:inline">My Sessions</span>
            <span className="lg:hidden">Login</span>
          </Link>
        )}
      </div>
    </nav>

    {/* Mobile Navigation */}
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Hamburger Menu Button */}
            <button 
              className="p-2 -ml-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            {/* Logo - Matches desktop view */}
            <Link to="/" className="flex items-center gap-2 ml-4" aria-label="Svasam Home">
              <img 
                src={SvasamLogo} 
                alt="Svasam Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10" 
              />
              <span className="text-xl sm:text-2xl font-bold text-main">Svasam</span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="text-gray-700 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
            </Link>
            
            {/* Profile Icon - Links to Dashboard */}
            {user ? (
              <Link to="/dashboard" className="text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Menu - Sidebar */}
    <div 
      className={`md:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      onClick={handleNavigation}
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)} aria-label="Svasam Home">
            <img 
              src={SvasamLogo} 
              alt="Svasam Logo" 
              className="h-8 w-8" 
            />
            <span className="text-xl font-bold text-main">Svasam</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto p-4">
          <div className="space-y-1">
            <div className="mb-2">
              <button 
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">Categories</span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${isMobileCategoriesOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-200 ${isMobileCategoriesOpen ? 'max-h-40' : 'max-h-0'}`}>
                <div className="pl-4 py-2 space-y-1">
                  <Link 
                    to="/mind" 
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mind
                  </Link>
                  <Link 
                    to="/body" 
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Body
                  </Link>
                  <Link 
                    to="/soul" 
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Soul
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/sessions" 
              className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Wellness Library
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center px-3 py-3 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Blog
            </Link>
            
            {/* User Section - Only show user info and logout */}
            {user && (
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-gray-500 font-medium">
                    {user?.displayName || user?.email || 'User'}
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
