import { Link } from 'react-router-dom';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { t } from '../i18n';
import { useEffect, useState } from 'react';

const ProgramsCarousel = () => {
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch programs for each category and combine them
  const { programs: mindPrograms, loading: mindLoading } = useProgramsByCategory('mind');
  const { programs: bodyPrograms, loading: bodyLoading } = useProgramsByCategory('body');
  const { programs: soulPrograms, loading: soulLoading } = useProgramsByCategory('soul');

  useEffect(() => {
    console.log('Loading states:', { mindLoading, bodyLoading, soulLoading });
    console.log('Programs data:', { mindPrograms, bodyPrograms, soulPrograms });
    
    if (!mindLoading && !bodyLoading && !soulLoading) {
      // Combine all programs from different categories
      const combined = [...(mindPrograms || []), ...(bodyPrograms || []), ...(soulPrograms || [])];
      console.log('Combined programs:', combined);
      setAllPrograms(combined);
      setLoading(false);
    }
  }, [mindLoading, bodyLoading, soulLoading, mindPrograms, bodyPrograms, soulPrograms]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
        <p className="mt-4 text-text">Loading programs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">Error loading programs. Please try again later.</p>
      </div>
    );
  }

  if (allPrograms.length === 0) {
    console.log('No programs to display');
    return (
      <div className="py-8 text-center">
        <p>No programs available at the moment.</p>
        <p className="text-gray-500 text-sm mt-2">(Check browser console for debugging info)</p>
      </div>
    );
  }

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-main">Our Programs</h2>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto pb-4 -mx-2">
            <div className="flex space-x-4 px-2">
              {allPrograms.map((program) => (
                <Link 
                  key={program._id}
                  to={`/programs/${program.slug}`}
                  className="flex-shrink-0 w-48 group block"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                    {program.imageUrl ? (
                      <img 
                        src={program.imageUrl} 
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-main text-center line-clamp-2 px-1">
                    {program.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsCarousel;
