import { useNavigate } from 'react-router-dom';
import { useStoreItems } from '../hooks/useStoreItems';

export default function Store() {
  const navigate = useNavigate();
  const { items, loading, error } = useStoreItems();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-red-500 text-center p-4 max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Store Items</h2>
          <p className="mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-[#704091] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#8e6192] mb-4">Svasam Store</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our collection of spiritual and wellness products to support your journey
          </p>
        </div>
        
        {(!items || items.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items available in the store at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item._id || item.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative pt-[100%] bg-gray-50">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                  {item.compareAtPrice > item.price && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-[#8e6192] mb-2 line-clamp-2" title={item.title}>
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {item.shortDescription || item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-main">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                      {item.compareAtPrice > item.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ₹{item.compareAtPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <button
                      className="px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm shadow hover:bg-[#704091] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
                      onClick={() => item.slug ? navigate(`/store/${item.slug}`) : '#'}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
