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
        <h2 className="text-3xl font-bold text-center text-white mb-4">Featured Sessions</h2>
        <p className="text-center text-white/70 mb-12 max-w-3xl mx-auto">
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
              bulletActiveClass: 'bg-white w-6',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-12"
          >
            {allPrograms.map((program) => (
              <SwiperSlide key={program._id} className="h-full">
                <Link to={`/programs/${program.slug}`} className="block h-full">
                  <div className="rounded-2xl overflow-hidden bg-[#F7EEF5] shadow-[0_18px_45px_-25px_rgba(0,0,0,0.55)] border border-black/5 h-full min-h-[480px] mx-2 group flex flex-col">
                    <div className="relative h-52 flex-shrink-0">
                      <img
                        src={program.imageUrl || '/placeholder-program.jpg'}
                        alt={program.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-white text-2xl font-extrabold leading-tight line-clamp-2">
                            {program.title}
                          </h3>
                          {program.category ? (
                            <div className="mt-2 text-white/95 text-base font-extrabold uppercase tracking-wide line-clamp-1">
                              {String(program.category)}
                            </div>
                          ) : null}
                        </div>

                        <button
                          onClick={(e) => toggleFavorite(program._id, e)}
                          className={`absolute top-3 right-3 p-2 rounded-full ${
                            program.isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
                          } transition-colors duration-200 shadow-md`}
                          aria-label={program.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {program.isFavorite ? <FiCheck size={18} /> : <FiHeart size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-r from-[#2B0B3C] via-[#6B1E70] to-[#B42A6B] text-white px-4 py-3">
                      <div className="text-sm font-semibold">
                        <span className="font-extrabold">700+</span> Lives Transformed
                      </div>
                    </div>

                    <div className="px-4 pt-4 flex flex-wrap gap-3 min-h-[52px] max-h-[72px] overflow-hidden">
                      {(Array.isArray(program.tags) ? program.tags : [program.category]).filter(Boolean).slice(0, 3).map((tag, idx) => (
                        <span
                          key={`${tag}-${idx}`}
                          className="px-4 py-2 rounded-full text-xs font-extrabold tracking-wide border border-[#D6B0CF] text-gray-800 bg-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="px-4 pb-5 pt-4 mt-auto">
                      <div className="grid grid-cols-2 gap-4 items-start">
                        <div>
                          <div className="text-xl font-extrabold text-gray-900">{program.duration || 'Self paced'}</div>
                          <div className="text-base text-gray-700">Sessions & Recording</div>
                        </div>

                        <div className="border-l border-black/10 pl-4">
                          {(() => {
                            const price = program.price;
                            const discountPrice = program.discountPrice;
                            const hasPrice = typeof price === 'number' && !Number.isNaN(price);
                            const hasDiscount = typeof discountPrice === 'number' && !Number.isNaN(discountPrice);
                            const showDiscount = hasPrice && hasDiscount && discountPrice < price;
                            const displayPrice = showDiscount ? discountPrice : price;

                            if (!hasPrice || price === 0) {
                              return (
                                <div className="text-2xl font-extrabold text-gray-900">Free</div>
                              );
                            }

                            return (
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <div className="text-2xl font-extrabold text-gray-900">
                                  ₹{displayPrice.toLocaleString('en-IN')}
                                </div>
                                <div className="text-xs text-gray-600">per session</div>
                                {showDiscount ? (
                                  <div className="w-full text-sm text-gray-600 line-through">
                                    ₹{price.toLocaleString('en-IN')}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })()}
                          <div className="text-base text-gray-700 mt-1">Recording Available</div>
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
                    index === Math.floor(activeIndex / 6) ? 'bg-white w-6' : 'bg-gray-300'
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
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
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
