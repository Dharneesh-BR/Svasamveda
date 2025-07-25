import React from 'react';
import BlogPosts from '../components/BlogPosts';

function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insightful articles on mind, body, and soul wellness from our experts.
          </p>
        </div>
        
        <BlogPosts />
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-700 mb-6">Get our latest wellness articles straight to your inbox.</p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button 
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <div className="mt-8 text-gray-600">
            <p>Email: support@svasam.com</p>
            <p>Phone: +91 1234567890</p>
            <p>Customer Support Hours: Mon-Sat, 10 AM - 7 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
