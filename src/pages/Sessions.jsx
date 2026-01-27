import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSessions } from '@/hooks/useSessions';

// Sessions banner image
const sessionsBannerImage = '/assets/Library Banner.jpg';

// Chevron icons for carousel controls
const ChevronLeft = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

function Sessions() {
  const { sessions, loading, error } = useSessions();
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Carousel functions
  const nextSlide = useCallback(() => {
    setCurrentSlide(0); // Only one slide for sessions
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(0); // Only one slide for sessions
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
        <span className="ml-4 text-gray-700">Loading sessions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-red-500 text-center p-6 max-w-md bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Error Loading Sessions</h2>
          <p className="mb-4">We couldn't load the sessions. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-main text-white rounded-md hover:bg-accent transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full">
      {/* Full Screen Sessions Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Sessions Banner Slide */}
        <div className="relative w-full h-full">
          <div
            className={`absolute inset-0 transition-opacity duration-1000 opacity-100`}
          >
            <img
              src={sessionsBannerImage}
              alt="Sessions Banner"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              onError={(e) => {
                console.error('Sessions banner image failed to load:', sessionsBannerImage);
              }}
            />
            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          </div>
        </div>

        {/* Sessions Banner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
            Wellness Library
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mb-8 md:mb-12 drop-shadow-lg animate-fade-in-delay">
            Listen or watch guided content designed to nurture your mind, body, and soul.
          </p>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          <button
            onClick={() => goToSlide(0)}
            className="w-3 h-3 rounded-full transition-all bg-white w-8"
            aria-label="Go to slide 1"
          />
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-8 right-8 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </section>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sessions Content */}
          <div className="py-8 sm:py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sessions</h2>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                Listen or watch guided content designed to nurture your mind, body, and soul.
              </p>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {sessions.map((session) => (
                <Link
                  key={session._id}
                  to={`/sessions/${session._id}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative bg-gray-100">
                      {session.thumbnail ? (
                        <img 
                          src={session.thumbnail} 
                          alt={session.title || 'Session thumbnail'}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : session.mediaType === 'audio' ? (
                        <div className="w-full h-48 bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎧</div>
                            <span className="text-gray-600">Audio Session</span>
                          </div>
                        </div>
                      ) : session.mediaType === 'video' ? (
                        <div className="w-full h-48 bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎥</div>
                            <span className="text-gray-600">Video Session</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <span className="text-gray-400">No media available</span>
                        </div>
                      )}
                      {session.mediaType && (
                        <span className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full capitalize">
                          {session.mediaType}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {session.title || 'Untitled session'}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {session.description || 'No description'}
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-purple-600 capitalize">
                            {session.mediaType || 'unknown'}
                          </span>
                          {session.duration && (
                            <span className="text-sm text-gray-500">
                              {session.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Categories Section */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-12 border border-purple-500/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">Explore by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Mind', 'Body', 'Soul'].map((category) => (
                  <Link 
                    to={`/${category.toLowerCase()}`} 
                    key={category}
                    className="group block"
                  >
                    <div className="bg-white/95 hover:bg-white rounded-xl p-6 transition-all duration-300 h-full border border-purple-200/50 hover:border-purple-400/50 hover:shadow-xl hover:scale-105">
                      <h3 className="text-xl md:text-2xl font-bold text-purple-700 mb-3 group-hover:text-purple-800 transition-colors">{category} Programs</h3>
                      <p className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors">
                        Discover our curated selection of {category.toLowerCase()} programs designed to help you thrive.
                      </p>
                      <span className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 group-hover:underline transition-all">
                        Explore {category}
                        <svg 
                          className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Sessions;
