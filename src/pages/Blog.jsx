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
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.stayUpdated')}</h3>
          <p className="text-gray-700 mb-6">{t('blog.subscribeText')}</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t('blog.emailPlaceholder')}
              className="flex-1 px-3 py-2 sm:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              required
            />
            <button 
              type="submit"
              className="bg-main text-white px-4 py-2 sm:px-6 rounded-lg hover:brightness-105 transition-colors text-sm sm:text-base"
            >
              {t('blog.subscribe')}
            </button>
          </form>
          
          <div className="mt-8 text-gray-600">
            <p>{t('blog.email')}</p>
            <p>{t('blog.phone')}</p>
            <p>{t('blog.supportHours')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
