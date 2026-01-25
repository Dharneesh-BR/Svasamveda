import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { PortableText } from '@portabletext/react';
import { client } from '../sanityClient';
import { urlFor } from '../sanityClient';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError('No product selected');
        setLoading(false);
        return;
      }

      try {
        // Query to fetch a single product by slug
        const query = `*[_type == "storeItem" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          shortDescription,
          price,
          compareAtPrice,
          imageUrl,
          images,
          category,
          tags,
          body,
          inStock,
          sku
        }`;

        const result = await client.fetch(query, { slug });
        
        if (result) {
          setProduct(result);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.slug,
      title: product.title,
      price: product.price || 0,
      quantity,
      image: product.imageUrl,
      slug: product.slug?.current
    });
  };

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
            to="/store" 
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/store"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Store
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
          to="/store" 
          className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Store
        </Link>

        {/* Product Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>
          <div className="flex items-center text-gray-600">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 mr-3">
              {product.category}
            </span>
            {product.inStock !== false && (
              <span className="text-green-400 text-sm">In Stock</span>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              {product.imageUrl ? (
                <img
                  src={urlFor(product.imageUrl).url()}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={urlFor(image).url()}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Price */}
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₹{product.compareAtPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              {product.body ? (
                <div className="prose max-w-none">
                  <PortableText value={product.body} />
                </div>
              ) : (
                <p className="text-gray-700">
                  {product.description || product.shortDescription || 'No description available.'}
                </p>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6">
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Add to Cart
                </button>

                {/* Product Meta */}
                {product.sku && (
                  <p className="text-sm text-gray-600">
                    SKU: {product.sku}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
