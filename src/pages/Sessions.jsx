import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSessions } from '@/hooks/useSessions';
import { t } from '../i18n';

// Sessions banner image
const sessionsBannerImage = '/assets/Library Banner.jpg';
const MindImg = '/assets/Mind.png';
const SoulImg = '/assets/New soul.png';
const BodyImg = '/assets/Body.png';

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

const CategoryCard = ({ to, title, description, image, alt, subtitle }) => {
  return (
    <div className="h-full w-full">
      <Link 
        to={to} 
        className="w-full h-full group block"
        aria-label={t('categories.exploreAriaLabel', { title })}
      >
        {/* Mobile View - Compact Card */}
        <div className="md:hidden bg-white rounded-2xl shadow-xl p-4 w-full flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-100 mx-auto max-w-36">
          <div className="h-16 w-16 mb-3 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full"></div>
            <img 
              src={image} 
              alt={alt}
              className="w-full h-full object-contain relative z-10"
              loading="lazy"
            />
          </div>
          <h2 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
            {title}
          </h2>
        </div>

        {/* Desktop View - Elegant Card */}
        <div className="hidden md:flex bg-white rounded-3xl shadow-xl p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full h-[320px] flex flex-col border border-purple-100 mx-auto max-w-md">
          <div className="h-36 w-36 mx-auto mb-3 flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl"></div>
            <img 
              src={image} 
              alt={alt}
              className="w-full h-full object-contain relative z-10"
              loading="lazy"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-center text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 px-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base text-gray-600 font-medium px-2 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="mt-2 pt-2 border-t border-purple-100">
            <div className="flex items-center justify-center text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
              <span className="mr-2">{t('categories.explore')}</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

function Sessions() {
  const { sessions, loading, error } = useSessions();

  const categories = [
    {
      id: 'mind',
      title: t('categories.mind.title'),
      description: t('categories.mind.description'),
      subtitle: 'Master your Mind. Elevate your Life',
      image: MindImg,
      alt: t('categories.mind.alt')
    },
    {
      id: 'body',
      title: t('categories.body.title'),
      description: t('categories.body.description'),
      subtitle: 'Train the Body. Extend Life',
      image: BodyImg,
      alt: t('categories.body.alt')
    },
    {
      id: 'soul',
      title: t('categories.soul.title'),
      description: t('categories.soul.description'),
      subtitle: 'Awaken the Soul. Live Fully',
      image: SoulImg,
      alt: t('categories.soul.alt')
    }
  ];

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
      {/* Fixed Sessions Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Sessions Banner Image */}
        <div className="relative w-full h-full">
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

        {/* Sessions Banner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
            A Gift for Your Inner Journey
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mb-8 md:mb-12 drop-shadow-lg animate-fade-in-delay">
            Explore guided meditation audio and video sessions, offered freely to help you reconnect with your breath and inner self.
          </p>
        </div>
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
                  <div className="bg-gradient-to-t from-[#E9D5FF]/70 via-[#F7EEF5] to-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full h-full min-h-[360px] flex flex-col border border-purple-100 overflow-hidden">
                    <div className="relative h-56 sm:h-64 w-full">
                      {session.thumbnail ? (
                        <img 
                          src={session.thumbnail} 
                          alt={session.title || 'Session thumbnail'}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : session.mediaType === 'audio' ? (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎧</div>
                            <span className="text-gray-600">Audio Session</span>
                          </div>
                        </div>
                      ) : session.mediaType === 'video' ? (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎥</div>
                            <span className="text-gray-600">Video Session</span>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <span className="text-gray-400">No media available</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute left-4 bottom-4 text-white">
                        <div className="text-2xl font-extrabold drop-shadow-sm line-clamp-2">
                          {session.title || 'Untitled session'}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      {session.mediaType && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 mb-3">
                          <span className="capitalize">{session.mediaType}</span>
                        </div>
                      )}
                      {session.tags && session.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {session.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={`${tag}-${idx}`}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {session.shortDescription || 'No description'}
                      </p>
                      <div className="mt-auto pt-4">
                        <div className="flex justify-between items-center">
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
            <div className="mb-12">
              <div className="mb-8 text-center">
                <p className="text-white/70 text-lg max-w-2xl mx-auto">Explore our transformative wellness programs designed to nurture your mind, body, and soul</p>
              </div>
              
              {/* Categories Grid */}
              <div className="relative">
                {/* Mobile View - Single Line */}
                <div className="md:hidden px-4 sm:px-6 mt-8">
                  <div className="flex justify-between gap-2 pb-4">
                    {categories.map((category) => (
                      <div key={category.id} className="flex-1">
                        <CategoryCard
                          to={`/${category.id}`}
                          title={category.title}
                          description={category.description}
                          subtitle={category.subtitle}
                          image={category.image}
                          alt={category.alt}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop View - Grid */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 px-4 sm:px-6 lg:px-8">
                  {categories.map((category) => (
                    <div key={category.id} className="w-full">
                      <CategoryCard
                        to={`/${category.id}`}
                        title={category.title}
                        description={category.description}
                        subtitle={category.subtitle}
                        image={category.image}
                        alt={category.alt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Sessions;
