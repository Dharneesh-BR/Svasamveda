import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSanityData } from '../hooks/useSanityData';
import { FaArrowLeft, FaCalendar } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../sanityClient';

export default function BlogPost() {
  const { slug } = useParams();
  
  // Query to fetch a single blog post by slug
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{
      name,
      image
    },
    mainImage,
    thumbnail,
    body,
    categories[]->{
      title
    }
  }`;

  const { data: post, loading, error } = useSanityData(query, { slug });

  // Debug logging
  React.useEffect(() => {
    console.log('BlogPost - slug:', slug);
    console.log('BlogPost - loading:', loading);
    console.log('BlogPost - error:', error);
    console.log('BlogPost - post data:', post);
    if (post) {
      console.log('BlogPost - mainImage:', post.mainImage);
      console.log('BlogPost - thumbnail:', post.thumbnail);
      console.log('BlogPost - mainImage URL:', post.mainImage ? urlFor(post.mainImage).url() : 'No mainImage');
      console.log('BlogPost - thumbnail URL:', post.thumbnail ? urlFor(post.thumbnail).url() : 'No thumbnail');
    }
  }, [slug, loading, error, post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg max-w-4xl mx-auto mt-8">
        <p className="font-bold">Error loading blog post</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800 underline">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to blog
        </Link>

        {/* Blog post header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured image */}
          {post.mainImage || post.thumbnail ? (
            <img 
              src={post.mainImage ? urlFor(post.mainImage).url() : urlFor(post.thumbnail).url()} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully');
              }}
            />
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-600">Blog post image not available</p>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            )}

            {/* Meta information */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                {post.author?.image && (
                  <img 
                    src={post.author.image.asset?.url} 
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {post.author?.name || 'Anonymous'}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog content */}
            <div className="prose prose-lg max-w-none">
              {post.body && (
                <PortableText 
                  value={post.body}
                  components={{
                    block: {
                      normal: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                      h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold mb-3 text-gray-900">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold mb-2 text-gray-900">{children}</h3>,
                    },
                    list: {
                      bullet: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>,
                      number: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>,
                    },
                    listItem: {
                      bullet: ({children}) => <li className="mb-2">{children}</li>,
                      number: ({children}) => <li className="mb-2">{children}</li>,
                    }
                  }}
                />
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
