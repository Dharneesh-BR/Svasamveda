import { useSanityData } from '../hooks/useSanityData';
import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';
import { t } from '../i18n';

const BlogCard = ({ post }) => {
  return (
    <div className="h-full w-full">
      <Link 
        to={`/blog/${post.slug?.current}`}
        className="w-full h-full group block"
        aria-label={`Read blog post: ${post.title}`}
      >
        {/* Mobile View - Compact Card */}
        <div className="md:hidden bg-white rounded-2xl shadow-xl p-3 w-full flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-100 mx-auto max-w-sm">
          <div className="h-32 w-32 mb-2 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200"></div>
            {(post.thumbnail || post.mainImage) ? (
              <img 
                src={post.thumbnail ? urlFor(post.thumbnail).url() : urlFor(post.mainImage).url()} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            )}
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center line-clamp-2">
            {post.title}
          </h2>
        </div>

        {/* Desktop View - Elegant Card */}
        <div className="hidden md:flex bg-white rounded-3xl shadow-xl p-2 hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full h-[320px] flex-col border border-purple-100 mx-auto max-w-md">
          <div className="h-44 w-44 mx-auto mb-1 flex-shrink-0 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200"></div>
            {(post.thumbnail || post.mainImage) ? (
              <img 
                src={post.thumbnail ? urlFor(post.thumbnail).url() : urlFor(post.mainImage).url()} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-20 h-20 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 px-2">
              {post.title}
            </h2>
          </div>
          
          <div className="mt-2 pt-2 border-t border-purple-100">
            <div className="flex items-center justify-center text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
              <span className="mr-2">Read More</span>
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
    <div className="relative">
      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden px-4 sm:px-6 mt-8">
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
          {posts.map((post) => (
            <div key={post._id} className="flex-shrink-0 w-72">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 px-4 sm:px-6 lg:px-8">
        {posts.map((post) => (
          <div key={post._id} className="w-full">
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
