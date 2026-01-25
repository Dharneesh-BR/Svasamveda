import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanityClient';

export default function SessionDetail() {
  const { slug } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!slug) {
        setError('No session selected');
        setLoading(false);
        return;
      }

      try {
        // Query to fetch a single session by _id (since sessions don't have slugs)
        const query = `*[_type == "session" && _id == $sessionId][0]{
          _id,
          title,
          description,
          mediaType,
          // dereference file asset url
          "fileUrl": file.asset->url,
          // dereference thumbnail asset url
          "thumbnail": thumbnail.asset->url
        }`;

        const result = await client.fetch(query, { sessionId: slug });
        
        console.log('SessionDetail - slug:', slug);
        console.log('SessionDetail - result:', result);
        
        if (result) {
          setSession(result);
        } else {
          setError('Session not found');
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load session');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link 
            to="/sessions" 
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Sessions
          </Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session not found</h2>
          <p className="text-gray-600 mb-4">The session you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/sessions"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Sessions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link 
          to="/sessions" 
          className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sessions
        </Link>

        {/* Session Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{session.title}</h1>
          <div className="flex items-center text-gray-600 space-x-4">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 capitalize">
              {session.mediaType}
            </span>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative bg-gray-100">
            {session.mediaType === 'video' && session.fileUrl ? (
              <div className="aspect-video bg-black">
                <video 
                  controls 
                  className="w-full h-full" 
                  src={session.fileUrl} 
                  preload="metadata"
                  poster={session.thumbnail}
                />
              </div>
            ) : session.mediaType === 'audio' && session.fileUrl ? (
              <div className="p-3">
                <div className="mb-3">
                  {session.thumbnail && (
                    <img 
                      src={session.thumbnail} 
                      alt={session.title}
                      className="w-full max-w-xs mx-auto rounded-lg shadow-md mb-3"
                    />
                  )}
                </div>
                <audio controls className="w-full max-w-xs mx-auto" src={session.fileUrl} preload="metadata">
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {session.mediaType === 'audio' ? '🎧' : session.mediaType === 'video' ? '🎥' : '📄'}
                  </div>
                  <p className="text-gray-600">No media available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Session</h2>
          <p className="text-gray-700">
            {session.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  );
}
