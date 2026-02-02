import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { useSessions } from '../hooks/useSessions';

export default function SessionDetail() {
  const { slug } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sessions: allSessions } = useSessions();

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
          shortDescription,
          body,
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

        {/* Media and Content Section */}
        <div className="bg-gradient-to-br from-white/95 to-purple-50/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Media Section - Left */}
            <div className="p-6 bg-gray-100">
              <div className="relative rounded-2xl overflow-hidden">
                {session.mediaType === 'video' && session.fileUrl ? (
                  <div className="aspect-video bg-black">
                    <video 
                      controls 
                      className="w-full h-full" 
                      src={session.fileUrl} 
                      preload="metadata"
                      poster={session.thumbnail}
                      controlsList="nodownload"
                      disablePictureInPicture
                    />
                  </div>
                ) : session.mediaType === 'audio' && session.fileUrl ? (
                  <div className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
                    {session.thumbnail && (
                      <div className="relative mb-6 group">
                        <img 
                          src={session.thumbnail} 
                          alt={session.title}
                          className="w-full max-w-lg rounded-2xl shadow-xl transform transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                      </div>
                    )}
                    <div className="w-full max-w-lg">
                      <audio controls className="w-full" src={session.fileUrl} preload="metadata" controlsList="nodownload">
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-6 animate-pulse">
                        {session.mediaType === 'audio' ? '🎧' : session.mediaType === 'video' ? '🎥' : '📄'}
                      </div>
                      <p className="text-gray-600 text-lg font-medium">No media available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section - Right */}
            <div className="p-10 flex flex-col bg-gradient-to-br from-white to-purple-50/30">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  About This Session
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              </div>
              <div className="prose prose-lg max-w-none overflow-y-auto max-h-[500px]">
                {session.body ? (
                  <PortableText 
                    value={session.body}
                    components={{
                      block: {
                        normal: ({children}) => <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>,
                        h1: ({children}) => <h1 className="text-4xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{children}</h1>,
                        h2: ({children}) => <h2 className="text-3xl font-bold mb-4 text-gray-900">{children}</h2>,
                        h3: ({children}) => <h3 className="text-2xl font-bold mb-3 text-gray-900">{children}</h3>,
                      },
                      list: {
                        bullet: ({children}) => <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">{children}</ul>,
                        number: ({children}) => <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">{children}</ol>,
                      },
                      listItem: {
                        bullet: ({children}) => <li className="mb-3 text-lg">{children}</li>,
                        number: ({children}) => <li className="mb-3 text-lg">{children}</li>,
                      }
                    }}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg italic">
                      {session.shortDescription || 'No description available.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      {allSessions && allSessions.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">You Might Also Like</h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Explore more wellness sessions to nurture your mind, body, and soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allSessions
              .filter(s => s._id !== session?._id)
              .slice(0, 6)
              .map((relatedSession) => (
                <Link
                  key={relatedSession._id}
                  to={`/sessions/${relatedSession._id}`}
                  className="group block h-full"
                >
                  <div className="bg-gradient-to-t from-[#E9D5FF]/70 via-[#F7EEF5] to-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full h-full min-h-[360px] flex flex-col border border-purple-100 overflow-hidden">
                    <div className="relative h-56 sm:h-64 w-full">
                      {relatedSession.thumbnail ? (
                        <img 
                          src={relatedSession.thumbnail} 
                          alt={relatedSession.title || 'Session thumbnail'}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : relatedSession.mediaType === 'audio' ? (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎧</div>
                            <span className="text-gray-600">Audio Session</span>
                          </div>
                        </div>
                      ) : relatedSession.mediaType === 'video' ? (
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
                          {relatedSession.title || 'Untitled session'}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      {relatedSession.mediaType && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 mb-3">
                          <span className="capitalize">{relatedSession.mediaType}</span>
                        </div>
                      )}
                      {relatedSession.tags && relatedSession.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedSession.tags.slice(0, 3).map((tag, idx) => (
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
                        {relatedSession.shortDescription || 'No description'}
                      </p>
                      <div className="mt-auto pt-4">
                        <div className="flex justify-between items-center">
                          {relatedSession.duration && (
                            <span className="text-sm text-gray-500">
                              {relatedSession.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
