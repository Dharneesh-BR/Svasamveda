import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogPosts from '../components/BlogPosts';
import { t } from '../i18n';

// Blog banner image
const blogBannerImage = '/assets/Blog page banner.jpg';
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

function Blog() {
  // No carousel state needed for fixed banner

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

  return (
    <main className="relative min-h-screen w-full">
      {/* Fixed Blog Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Blog Banner Image */}
        <div className="relative w-full h-full">
          <img
            src={blogBannerImage}
            alt="Blog Banner"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            onError={(e) => {
              console.error('Blog banner image failed to load:', blogBannerImage);
            }}
          />
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Blog Banner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
            Journals for Self-Realisation
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mb-8 md:mb-12 drop-shadow-lg animate-fade-in-delay">
            Reflections and insights to guide you gently inward.
          </p>
        </div>
      </section>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Content */}
          <div className="py-8 sm:py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('blog.title')}</h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
                {t('blog.description')}
              </p>
            </div>
            
            <BlogPosts />
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
    </main>
  );
}

export default Blog;
