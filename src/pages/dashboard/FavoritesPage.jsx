import { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiX, FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import { collection, getDocs, doc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Link } from 'react-router-dom';

const FavoriteItem = ({ item, onRemove }) => {
  return (
    <div className="svasam-card svasam-card-hover p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-shrink-0 h-40 w-full md:w-48 bg-gray-100 rounded-lg overflow-hidden mb-4 md:mb-0">
          <img
            src={item.imageUrl || '/placeholder-program.jpg'}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2 capitalize">{item.category}</p>
              
              <div className="flex items-center space-x-4 mt-3">
                {item.duration && (
                  <span className="inline-flex items-center text-sm text-gray-600">
                    <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                    {item.duration}
                  </span>
                )}
                {item.price ? (
                  <span className="inline-flex items-center text-sm font-medium text-gray-900">
                    <FiDollarSign className="mr-1 h-4 w-4 text-green-600" />
                    {item.price.toLocaleString()}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Free
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove from favorites"
              >
                <FiX className="h-5 w-5" />
              </button>
              <Link 
                to={`/programs/${item.slug || item.id}`}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-main hover:bg-main/90"
              >
                View Details
                <FiArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
          
          {item.description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = auth.currentUser;

  // Fetch user's favorite programs
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    const favoritesQuery = query(
      collection(db, 'users', user.uid, 'favorites')
    );

    const unsubscribe = onSnapshot(
      favoritesQuery,
      (snapshot) => {
        try {
          const favs = [];
          snapshot.docs.forEach(doc => {
            if (doc.id !== 'programs') { // Skip the programs document if it exists
              favs.push({ id: doc.id, ...doc.data() });
            }
          });
          setFavorites(favs);
          setError(null);
        } catch (err) {
          console.error('Error processing favorites:', err);
          setError('Failed to load favorites. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorites. Please refresh the page.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleRemoveFavorite = async (id) => {
    if (!user) return;
    
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
      // No need to update state here as the snapshot listener will handle it
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Failed to remove from favorites. Please try again.');
    }
  };

  const clearAllFavorites = async () => {
    if (!user) return;
    
    if (!window.confirm('Are you sure you want to remove all favorites?')) {
      return;
    }

    try {
      const batch = [];
      const snapshot = await getDocs(collection(db, 'users', user.uid, 'favorites'));
      
      snapshot.docs.forEach(doc => {
        if (doc.id !== 'programs') { // Skip the programs document if it exists
          batch.push(deleteDoc(doc.ref));
        }
      });
      
      await Promise.all(batch);
      // No need to update state here as the snapshot listener will handle it
    } catch (err) {
      console.error('Error clearing favorites:', err);
      alert('Failed to clear favorites. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Favorites</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Favorites</h2>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="text-sm font-medium text-red-600 hover:text-red-700"
            disabled={loading}
          >
            Clear All
          </button>
        )}
      </div>
      
      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((item) => (
            <FavoriteItem
              key={item.id}
              item={item}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiHeart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No favorites yet</h3>
          <p className="text-gray-500 mb-6">
            You haven't added any items to your favorites.
          </p>
          <Link 
            to="/sessions" 
            className="inline-flex items-center px-4 py-2 bg-main text-white rounded-md hover:bg-main/90 transition-colors"
          >
            Browse Programs
            <FiArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
