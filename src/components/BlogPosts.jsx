import { useSanityData } from '../hooks/useSanityData';
import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';
import { t } from '../i18n';

const BlogCard = ({ post }) => {
  const imageUrl = (post.thumbnail || post.mainImage)
    ? urlFor(post.thumbnail || post.mainImage).url()
    : null;

  const categoryLabel = post.category || post.tags?.[0] || 'Mind';
  const typeLabel = post.type || post.format || 'Free Class';
  const excerpt = post.shortDescription || post.excerpt || 'Unlock mindful growth with curated guidance and practical steps you can start today.';

  return (
    <div className="h-full w-full">
      <Link 
        to={`/blog/${post.slug?.current}`}
        className="w-full h-full group block"
        aria-label={`Read blog post: ${post.title}`}
      >
        <div className="bg-gradient-to-t from-[#E9D5FF]/70 via-[#F7EEF5] to-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full h-full min-h-[360px] flex flex-col border border-purple-100 overflow-hidden">
          <div className="relative h-56 sm:h-64">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute left-4 bottom-4 text-white">
              <div className="text-2xl font-extrabold drop-shadow-sm line-clamp-2">{post.title}</div>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag, idx) => (
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
              {excerpt}
            </p>
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center justify-center w-full rounded-full border-2 border-purple-400 text-purple-700 font-semibold text-sm py-2 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                Read more
              </span>
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
    shortDescription,
    publishedAt,
    thumbnail,
    mainImage,
    tags
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
