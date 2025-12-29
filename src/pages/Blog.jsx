import React from 'react';
import BlogPosts from '../components/BlogPosts';
import { t } from '../i18n';

function Blog() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t('blog.title')}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.description')}
          </p>
        </div>
        
        <BlogPosts />
      </div>
    </div>
  );
}

export default Blog;
