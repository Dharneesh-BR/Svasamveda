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

  // Debug logging
  console.log('ProductDetail component loaded, slug:', slug);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError('No product selected');
        setLoading(false);
        return;
      }

      try {
        // Try both schemas - new 'store' and legacy 'storeItem'
        const storeQuery = `*[_type == "store" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          shortDescription,
          price,
          discountedPrice,
          "imageUrl": coalesce(images[0].asset->url, images.asset->url[0]),
          images,
          category,
          categories,
          tags,
          body,
          inStock,
          sku,
          stock
        }`;

        const storeItemQuery = `*[_type == "storeItem" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          shortDescription,
          price,
          compareAtPrice,
          discountedPrice,
          imageUrl,
          images,
          category,
          categories,
          tags,
          body,
          inStock,
          sku,
          stock
        }`;

        // Try new schema first, then fallback to legacy
        let result = await client.fetch(storeQuery, { slug }).catch(() => null);
        
        if (!result) {
          result = await client.fetch(storeItemQuery, { slug }).catch(() => null);
        }
        
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
      price: product.discountedPrice || product.price || 0,
      quantity,
      image: product.imageUrl,
      slug: product.slug?.current
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Product not found</h2>
          <p className="text-gray-300 mb-4">The product you're looking for doesn't exist or has been removed.</p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link 
          to="/store" 
          className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-all duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Store</span>
        </Link>

        {/* Product Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-white/90 text-sm font-medium">Premium Spiritual Product</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center justify-center text-white/70">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
              {product.category || (product.categories && product.categories[0]) || 'General'}
            </span>
            {(product.inStock !== false && product.stock !== 0) && (
              <span className="ml-4 flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                {product.imageUrl ? (
                  <img
                    src={urlFor(product.imageUrl).url()}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-96 bg-white/5 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-white/30">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Additional Images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
                      <img
                        src={urlFor(image).url()}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Price */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-baseline justify-between">
                <div>
                  {product.discountedPrice ? (
                    <>
                      <span className="text-4xl font-bold text-white">
                        ₹{product.discountedPrice?.toLocaleString('en-IN')}
                      </span>
                      <div className="mt-2">
                        <span className="text-xl text-white/60 line-through">
                          ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                        <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          Save ₹{(product.price - product.discountedPrice)?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="mt-2">
                          <span className="text-xl text-white/60 line-through">
                            ₹{product.compareAtPrice?.toLocaleString('en-IN')}
                          </span>
                          <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                            Save ₹{(product.compareAtPrice - product.price)?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm">Premium Quality</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Description
              </h2>
              {product.body ? (
                <div className="prose prose-invert max-w-none">
                  <PortableText value={product.body} />
                </div>
              ) : (
                <p className="text-white/80 leading-relaxed text-lg">
                  {product.description || product.shortDescription || 'Experience the divine energy and spiritual benefits of this premium product, carefully crafted to enhance your meditation and spiritual practice.'}
                </p>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-white font-medium mb-3">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-16 text-center text-2xl font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>

                {/* Product Meta */}
                {product.sku && (
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <span>SKU: {product.sku}</span>
                    <span>Free Shipping</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
