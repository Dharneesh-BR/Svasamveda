import { useNavigate } from 'react-router-dom';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';

export default function Soul() {
  const navigate = useNavigate();
  const { programs, loading, error } = useProgramsByCategory('soul');

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
          <p className="mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-main text-white rounded-lg font-semibold hover:brightness-105 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#8e6192] mb-4">Soul Wellness Programs</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our transformative programs designed to nurture your spiritual growth and inner peace.
          </p>
        </div>
        
        {(!programs || programs.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No soul programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program._id || program.title}
                className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {program.imageUrl && (
                  <img 
                    src={program.imageUrl} 
                    alt={program.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                    loading="lazy"
                  />
                )}
                <div className="p-2">
                  <h2 className="text-xl font-bold text-[#8e6192] mb-3">{program.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {program.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    {program.price && (
                      <span className="text-lg font-semibold text-purple-700">
                        ₹{program.price.toLocaleString()}
                      </span>
                    )}
                    <button
                      className="px-4 py-2 bg-main text-white rounded-lg font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 transition"
                      onClick={() => program.slug ? navigate(`/programs/${program.slug.current || program.slug}`) : '#'}
                    >
                      Read More
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
