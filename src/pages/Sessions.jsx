import React from 'react';
import { Link } from 'react-router-dom';
import { useSessions } from '@/hooks/useSessions';

function Sessions() {
  const { sessions, loading, error } = useSessions();

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
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main mb-4">Sessions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Listen or watch guided content designed to nurture your mind, body, and soul.
          </p>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sessions.map((session) => (
            <div 
              key={session._id}
              className="group block h-full"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative bg-gray-100">
                  {session.thumbnail ? (
                    <img 
                      src={session.thumbnail} 
                      alt={session.title || 'Session thumbnail'}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  ) : session.mediaType === 'audio' && session.fileUrl ? (
                    <div className="p-4">
                      <audio controls className="w-full" src={session.fileUrl} preload="none" />
                    </div>
                  ) : session.mediaType === 'video' && session.fileUrl ? (
                    <div className="aspect-video bg-black">
                      <video controls className="w-full h-full" src={session.fileUrl} preload="none" />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                      <span className="text-gray-400">No media available</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-main transition-colors">
                    {session.title || 'Untitled session'}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {session.description || 'No description'}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-main capitalize">
                        {session.mediaType || 'unknown'}
                      </span>
                      {session.fileUrl ? (
                        <a 
                          href={session.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-gray-500 hover:text-main"
                        >
                          Open file
                          <svg 
                            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">No file</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Section (optional keep) */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-main mb-8 text-center">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Mind', 'Body', 'Soul'].map((category) => (
              <Link 
                to={`/${category.toLowerCase()}`} 
                key={category}
                className="group block"
              >
                <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-colors h-full">
                  <h3 className="text-xl font-bold text-main mb-3">{category} Programs</h3>
                  <p className="text-gray-600 mb-4">
                    Discover our curated selection of {category.toLowerCase()} programs designed to help you thrive.
                  </p>
                  <span className="inline-flex items-center text-main font-medium group-hover:underline">
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

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-main mb-8 text-center">Why Choose Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expert Guidance',
                description: 'Learn from certified practitioners with years of experience in their fields.'
              },
              {
                title: 'Flexible Learning',
                description: 'Access programs at your own pace, anytime and anywhere.'
              },
              {
                title: 'Holistic Approach',
                description: 'Programs designed to address mind, body, and soul for complete wellbeing.'
              },
              {
                title: 'Proven Results',
                description: 'Join thousands who have transformed their lives through our programs.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-main text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sessions;
