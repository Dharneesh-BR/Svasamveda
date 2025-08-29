import React, { useEffect, useState, useRef } from 'react';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestPrograms = () => {
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Fetch programs for each category
  const { programs: mindPrograms, loading: mindLoading } = useProgramsByCategory('mind');
  const { programs: bodyPrograms, loading: bodyLoading } = useProgramsByCategory('body');
  const { programs: soulPrograms, loading: soulLoading } = useProgramsByCategory('soul');

  useEffect(() => {
    if (!mindLoading && !bodyLoading && !soulLoading) {
      try {
        // Combine all programs
        const combined = [
          ...(mindPrograms || []),
          ...(bodyPrograms || []),
          ...(soulPrograms || [])
        ];
        setAllPrograms(combined);
        setError(null);
      } catch (err) {
        console.error('Error combining programs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
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
    return (
      <div className="py-8 text-center">
        <p>No programs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-main mb-4">Our Programs</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore our carefully curated programs designed to nurture your mind, body, and soul
        </p>
        
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.programs-pagination',
              bulletClass: 'w-2 h-2 bg-gray-300 rounded-full inline-block mx-1 cursor-pointer',
              bulletActiveClass: 'bg-main w-6',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-12"
          >
            {allPrograms.map((program) => (
              <SwiperSlide key={program._id}>
                <Link to={`/programs/${program.slug}`} className="block h-full">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full mx-2 hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-48">
                      <img 
                        src={program.imageUrl || '/placeholder-program.jpg'} 
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-main rounded-full">
                          {program.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 h-14 group-hover:text-main transition-colors">{program.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 h-16">{program.description}</p>
                      <div className="mt-4">
                        <span className="inline-flex items-center text-lg font-bold text-main">
                          {program.price ? `$${program.price}` : 'Free'}
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination */}
          <div className="flex justify-center mt-8">
            <div className="programs-pagination flex space-x-2">
              {Array.from({ length: Math.ceil(allPrograms.length / 3) }).map((_, index) => (
                <span 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === Math.floor(activeIndex) ? 'bg-main w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => swiperRef.current?.swiper.slideTo(index * 3)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/sessions" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-main hover:bg-accent transition-colors duration-200"
          >
            View All Sessions
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPrograms;
