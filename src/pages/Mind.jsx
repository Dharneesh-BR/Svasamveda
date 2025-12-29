import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';

function Mind() {
  const navigate = useNavigate();
  const { programs, loading, error } = useProgramsByCategory('mind');
  const [favourites, setFavourites] = useState(() => new Set());

  const toggleFavourite = (programKey) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(programKey)) next.delete(programKey);
      else next.add(programKey);
      return next;
    });
  };

  const getProgramKey = useMemo(
    () => (program) => program?._id || program?.slug?.current || program?.slug || program?.title,
    []
  );

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
          <h2 className="text-xl font-bold mb-2">Error Loading Programs</h2>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-main text-white rounded hover:brightness-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-background/80">
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#8e6192] mb-4">Mind Wellness Programs</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our transformative programs designed to enhance your mental well-being and unlock your full potential.
          </p>
        </div>
        
        {(!programs || programs.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No mind programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              (() => {
                const programKey = getProgramKey(program);
                const isFavourite = favourites.has(programKey);

                return (
              <div
                key={program._id || program.title}
                className="relative bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <button
                  type="button"
                  aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                  className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavourite(programKey);
                  }}
                >
                  {isFavourite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
                {program.imageUrl && (
                  <img 
                    src={program.imageUrl} 
                    alt={program.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#8e6192] mb-3">{program.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {program.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    {(() => {
                      const hasPrice = typeof program?.price === 'number' && !Number.isNaN(program.price);
                      const hasDiscount = typeof program?.discountPrice === 'number' && !Number.isNaN(program.discountPrice);
                      const showDiscount = hasPrice && hasDiscount && program.discountPrice < program.price;
                      const displayPrice = showDiscount ? program.discountPrice : program.price;

                      if (!hasPrice || program.price === 0) {
                        return (
                          <span className="text-lg font-semibold text-purple-700">
                            Free
                          </span>
                        );
                      }

                      return (
                        <span className="text-lg font-semibold text-purple-700">
                          ₹{displayPrice.toLocaleString('en-IN')}
                          {showDiscount ? (
                            <span className="ml-2 text-sm text-gray-500 line-through font-semibold">
                              ₹{program.price.toLocaleString('en-IN')}
                            </span>
                          ) : null}
                        </span>
                      );
                    })()}
                    <button
                      className="px-4 py-2 bg-accent text-white rounded-lg font-semibold shadow hover:bg-[#704091] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
                      onClick={() => program.slug ? navigate(`/programs/${program.slug.current || program.slug}`) : '#'}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
                );
              })()
            ))}
          </div>
        )}
        </div>
      </div>
    </main>
  );
}

export default Mind;
