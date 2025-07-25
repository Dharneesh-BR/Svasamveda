import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logoutUser } from '../utils/auth';
import SvasamLogo from '../assets/svasam logo copy.png';

// Custom Link component that reloads the page
const ReloadLink = ({ to, children, ...props }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
    window.location.reload();
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to refresh the page
  const refreshPage = () => {
    navigate(window.location.pathname);
    window.location.reload();
  };

  // Listen for auth changes and refresh when they occur
  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getUser());
      refreshPage();
    };

    // Listen to storage events for login/logout in other tabs
    window.addEventListener('storage', handleAuthChange);
    
    // Initial auth check
    setUser(getUser());

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [navigate]);

  useEffect(() => {
    setUser(getUser());
    // Listen to storage events for login/logout in other tabs
    const handler = () => setUser(getUser());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    refreshPage();
  };

  return (
    <nav className="bg-background shadow px-6 py-4 flex items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center" aria-label="Svasam Home">
          <img src={SvasamLogo} alt="Svasam Logo" className="h-10 w-auto" />
        </Link>
      </div>
      <ul className="flex gap-6 font-medium text-accent flex-1 justify-center">
        <li className="relative group">
          <button className="flex items-center gap-1 hover:text-main transition focus:outline-none">
            Categories
            <svg className="w-4 h-4 text-main group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute left-0 mt-3 w-48 bg-gradient-to-br from-background to-white rounded-xl shadow-2xl border border-accent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transform scale-95 group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200 z-30">
            <ul className="py-3 px-1">
              <li><ReloadLink to="/mind" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold">Mind</ReloadLink></li>
              <li><ReloadLink to="/body" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold">Body</ReloadLink></li>
              <li><ReloadLink to="/soul" className="block px-5 py-2 rounded-lg text-main hover:bg-accent hover:text-background transition font-semibold">Soul</ReloadLink></li>
            </ul>
          </div>
        </li>
        <li><ReloadLink to="/store" className="hover:text-main transition">Svasam Store</ReloadLink></li>
        <li><ReloadLink to="/sessions" className="hover:text-main transition">Svasam Sessions</ReloadLink></li>
        
        
        <li><ReloadLink to="/blog" className="hover:text-main transition">Blog</ReloadLink></li>
      </ul>
      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <button
          onClick={() => navigate('/cart')}
          className="p-2 rounded-full hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="View Cart"
        >
          {/* Heroicons solid shopping cart SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-main">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.016m0 0L6.6 8.25m-.505-3.398l1.772 6.617A2.25 2.25 0 009.06 13.5h7.19a2.25 2.25 0 002.193-1.783l1.218-6.09A1.125 1.125 0 0018.56 4.5H6.6m0 0L5.995 2.852A1.125 1.125 0 004.91 2.25H2.25m16.5 16.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-10.5 0a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" />
          </svg>
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 via-purple-200 to-blue-100 text-main font-semibold shadow-lg border border-purple-200">
              <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {user.name || 'User'}
            </span>
            <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold shadow border border-red-200 hover:bg-red-200 transition">Logout</button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 via-purple-200 to-blue-100 text-main font-semibold shadow-lg hover:shadow-xl hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 border border-purple-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            My Registration / Login
          </Link>
        )}
      </div>
    </nav>
  );
}
