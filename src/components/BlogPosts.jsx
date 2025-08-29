import { useSanityData } from '../hooks/useSanityData';

export default function BlogPosts() {
  // Example GROQ query to fetch blog posts with author information
  const query = `*[_type == "blogPost"] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image.asset->url
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
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          {post.mainImage && (
            <img 
              src={post.mainImage.asset?.url} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
            {post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}
            <div className="flex items-center mt-4">
              {post.authorImage && (
                <img 
                  src={post.authorImage} 
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{post.authorName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
