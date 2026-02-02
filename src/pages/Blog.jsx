import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BlogPosts from '../components/BlogPosts';
import { t } from '../i18n';

// Blog banner image
const blogBannerImage = '/assets/Blog page banner.jpg';

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

function Blog() {
  // No carousel state needed for fixed banner

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
        </div>
      </div>
    </main>
  );
}

export default Blog;
