import React, { useEffect, useState, useRef } from 'react';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FiHeart, FiCheck } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

const TestPrograms = () => {
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const swiperRef = useRef(null);
  const user = auth.currentUser;

  // Fetch programs for each category
  const { programs: mindPrograms, loading: mindLoading } = useProgramsByCategory('mind');
  const { programs: bodyPrograms, loading: bodyLoading } = useProgramsByCategory('body');
  const { programs: soulPrograms, loading: soulLoading } = useProgramsByCategory('soul');

  // Load user's favorites
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) return;
      
      try {
        const favoritesRef = doc(db, 'users', user.uid, 'favorites', 'programs');
        const docSnap = await getDoc(favoritesRef);
        if (docSnap.exists()) {
          setFavorites(docSnap.data());
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    };
    
    loadFavorites();
  }, [user]);

  // Combine programs and add favorite status
  useEffect(() => {
    if (!mindLoading && !bodyLoading && !soulLoading) {
      try {
        // Combine all programs
        const combined = [
          ...(mindPrograms || []),
          ...(bodyPrograms || []),
          ...(soulPrograms || [])
        ];
        
        // Add favorite status to each program
        const programsWithFavorites = combined.map(program => ({
          ...program,
          isFavorite: !!favorites[program._id]
        }));
        
        setAllPrograms(programsWithFavorites);
        setError(null);
      } catch (err) {
        console.error('Error combining programs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [mindLoading, bodyLoading, soulLoading, mindPrograms, bodyPrograms, soulPrograms, favorites]);
  
  // Toggle favorite status
  const toggleFavorite = async (programId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login or show login modal
      alert('Please log in to save favorites');
      return;
    }
    
    try {
      const favoritesRef = doc(db, 'users', user.uid, 'favorites', 'programs');
      const isFavorite = favorites[programId];
      
      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(doc(db, 'users', user.uid, 'favorites', programId));
        setFavorites(prev => {
          const newFavorites = { ...prev };
          delete newFavorites[programId];
          return newFavorites;
        });
      } else {
        // Add to favorites
        const program = allPrograms.find(p => p._id === programId);
        if (program) {
          await setDoc(doc(db, 'users', user.uid, 'favorites', programId), {
            ...program,
            addedAt: new Date().toISOString()
          });
          setFavorites(prev => ({
            ...prev,
            [programId]: true
          }));
        }
      }
      
      // Update local state
      setAllPrograms(prev => 
        prev.map(p => 
          p._id === programId 
            ? { ...p, isFavorite: !p.isFavorite } 
            : p
        )
      );
      
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

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
        <h2 className="text-3xl font-bold text-center text-main mb-4">Featured Sessions</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore our carefully curated programs designed to nurture your mind, body, and soul
        </p>
        
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, Grid]}
            spaceBetween={30}
            slidesPerView={1}
            grid={{
              rows: 2,
              fill: 'row'
            }}
            breakpoints={{
              640: { 
                slidesPerView: 1,
                grid: {
                  rows: 2,
                  fill: 'row'
                }
              },
              768: { 
                slidesPerView: 2,
                grid: {
                  rows: 2,
                  fill: 'row'
                }
              },
              1024: { 
                slidesPerView: 3,
                grid: {
                  rows: 2,
                  fill: 'row'
                }
              },
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
              <SwiperSlide key={program._id} className="h-auto">
                <Link to={`/programs/${program.slug}`} className="block h-full">
                  <div className="svasam-card svasam-card-hover overflow-hidden h-full mx-2 group flex flex-col">
                    <div className="h-48 w-full overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={program.imageUrl || '/placeholder-program.jpg'} 
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <button 
                        onClick={(e) => toggleFavorite(program._id, e)}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          program.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
                        } transition-colors duration-200 shadow-md`}
                        aria-label={program.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {program.isFavorite ? <FiCheck size={18} /> : <FiHeart size={18} />}
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-main rounded-full">
                          {program.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-main transition-colors min-h-[40px] flex items-center">
                        {program.title}
                      </h3>
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            {program.duration || '4 Weeks'}
                          </span>
                          <div className="flex items-center gap-2">
                            {(() => {
                              const price = program.price;
                              const mrp = program.originalPrice;
                              const hasPrice = typeof price === 'number' && !Number.isNaN(price);
                              const hasMrp = typeof mrp === 'number' && !Number.isNaN(mrp) && mrp > 0;
                              const showMrp = hasPrice && hasMrp && mrp > price;
                              const discountPct = showMrp ? Math.round(((mrp - price) / mrp) * 100) : null;

                              if (!hasPrice || price === 0) {
                                return (
                                  <span className="inline-flex items-center text-sm font-bold text-main">
                                    Free
                                  </span>
                                );
                              }

                              return (
                                <>
                                  {discountPct ? (
                                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                      {discountPct}% OFF
                                    </span>
                                  ) : null}

                                  <div className="flex items-baseline gap-2">
                                    <span className="inline-flex items-center text-sm font-bold text-main">
                                      ₹{price.toLocaleString('en-IN')}
                                    </span>
                                    {showMrp ? (
                                      <span className="text-xs text-gray-500 line-through">
                                        ₹{mrp.toLocaleString('en-IN')}
                                      </span>
                                    ) : null}
                                  </div>
                                </>
                              );
                            })()}
                            <svg className="w-3 h-3 text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
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
              {Array.from({ length: Math.ceil(allPrograms.length / 6) }).map((_, index) => (
                <span 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === Math.floor(activeIndex / 6) ? 'bg-main w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => swiperRef.current?.swiper.slideTo(index * 6)}
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
