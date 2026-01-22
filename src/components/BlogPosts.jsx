import { useSanityData } from '../hooks/useSanityData';
import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';

export default function BlogPosts() {
  // Example GROQ query to fetch blog posts with author information and thumbnail
  const query = `*[_type == "blogPost"] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    thumbnail,
    mainImage
  } | order(publishedAt desc)`;

  const { data: posts, loading, error } = useSanityData(query);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error('Sanity API Error Details:', {
      message: error.message,
      status: error.statusCode,
      response: error.responseBody,
      query: query
    });
    
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        <p className="font-bold">Error loading blog posts</p>
        <p className="text-sm mt-1">Status: {error.statusCode || 'Unknown'}</p>
        <p className="text-sm">Message: {error.message || 'An unknown error occurred'}</p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-2 text-xs">
            <summary className="cursor-pointer text-blue-600">Show details</summary>
            <pre className="mt-1 p-2 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(error.responseBody || {}, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="text-gray-500">No blog posts found.</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link 
          key={post._id} 
          to={`/blog/${post.slug?.current}`}
          className="block group"
        >
          <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col md:flex-row">
            {/* Content on the left */}
            <div className="flex-1 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {post.excerpt && (
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
              
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group-hover:scale-105">
                Read Our Blog
                <svg 
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Image on the right */}
            {(post.thumbnail || post.mainImage) && (
              <div className="md:w-1/3 lg:w-2/5">
                <img 
                  src={post.thumbnail ? urlFor(post.thumbnail).url() : urlFor(post.mainImage).url()} 
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}
          </article>
        </Link>
      ))}
    </div>
  );
}
