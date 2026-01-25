import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStoreItems } from '../hooks/useStoreItems';
import { t } from '../i18n';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function Store() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  // Category definitions and mapping
  const CATEGORIES = useMemo(() => [
    { slug: 'all', title: 'All' },
    { slug: 'bracelets', title: 'Bracelets' },
    { slug: 'rudraksha', title: 'Rudraksha' },
    { slug: 'murti', title: 'Murti' },
    { slug: 'anklet', title: 'Anklet' },
    { slug: 'frames', title: 'Frames' },
    { slug: 'karungali', title: 'Karungali' },
    { slug: 'zodiac', title: 'Zodiac' },
    { slug: 'pyrite', title: 'Pyrite' },
    { slug: 'gemstones', title: 'Gemstones' },
    { slug: 'pendant', title: 'Pendant' }
  ], []);

  // Image helper
  const imageFor = useCallback((slug) => {
    const special = {
      bracelets: '/assets/Bracelet.jpg',
      rudraksha: '/assets/Rudraksha.jpg',
      murti: '/assets/Murti.jpg',
      anklet: '/assets/Anklet.jpg',
      frames: '/assets/Frames.jpg',
      karungali: '/assets/karungali.jpg',
      pyrite: '/assets/Pyrite.jpg',
      gemstones: '/assets/Gemstones.jpg',
      pendant: '/assets/Pendant.jpg',
      zodiac: '/assets/Zodiac.jpg',
    };
    return special[slug] || `/assets/categories/${slug}.png`;
  }, []);

  // Preload category images
  useEffect(() => {
    CATEGORIES.forEach(cat => {
      const img = new Image();
      img.src = imageFor(cat.slug);
    });
  }, [CATEGORIES, imageFor]);

  // Scroll carousel controls
  const carouselRef = useRef(null);
  const scrollByAmount = 260;
  const scrollLeft = useCallback(() => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  }, []);
  const scrollRight = useCallback(() => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  }, []);

  const selectedSlug = searchParams.get('category') || 'all';
  const selectedCategoryTitle = useMemo(() => {
    if (selectedSlug === 'all') return null;
    const found = CATEGORIES.find(c => c.slug === selectedSlug);
    return found ? found.title : null;
  }, [selectedSlug, CATEGORIES]);

  const { items, loading, error } = useStoreItems(selectedCategoryTitle);

  // Search
  const initialQ = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQ);

  // Debounced search syncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) params.set('q', searchTerm);
      else params.delete('q');
      setSearchParams(params, { replace: true });
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // SEO title
  useEffect(() => {
    document.title = selectedCategoryTitle
      ? `${selectedCategoryTitle} | Svasam Store`
      : 'Svasam Store';
  }, [selectedCategoryTitle]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!items) return [];
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const hay = [it.title, it.shortDescription, it.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, searchParams]);

  const handleSelectCategory = useCallback((slug) => {
    if (slug === 'all') {
      navigate('/store');
      return;
    }
    const pathSlug = slug === 'rudraksha' ? 'rudrakshas' : slug;
    navigate(`/store/${pathSlug}`);
  }, [navigate]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  const handleAddToCart = useCallback((item) => {
    addToCart({
      id: item._id || item.slug || item.title,
      title: item.title,
      price: item.price || 0,
      quantity: 1,
      image: item.imageUrl,
    });
  }, [addToCart]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" aria-label={t('common.loading')}></div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-red-500 text-center p-4 max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Store Items</h2>
          <p className="mb-4">{error.message}</p>
          <button 
            onClick={handleRetry} 
            className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-[#704091] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="pt-16 pb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Svasam Store</h1>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Discover our collection of spiritual and wellness products to support your journey
          </p>
        </div>

        {/* Search box */}
        <div className="mb-4">
          <div className="max-w-sm ml-auto">
            <label htmlFor="store-search" className="sr-only">Search products</label>
            <div className="relative">
              <input
                id="store-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-accent/30 bg-white px-3 py-2 pr-9 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-xs"
              />
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Sticky Category Carousel - z-30 to stay below mobile menu */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-accent/10 -mx-4 px-4 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto relative">
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-10 md:px-12"
              role="tablist"
              aria-label="Product categories"
              style={{
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For IE and Edge
              }}
            >
              {CATEGORIES.map(cat => {
                const isActive = cat.slug === selectedSlug;
                const isAll = cat.slug === 'all';
                return (
                  <div key={cat.slug} className="flex-shrink-0 snap-center">
                    <button
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="flex flex-col items-center w-20 sm:w-24 focus:outline-none"
                      title={cat.title}
                    >
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 ${isActive ? 'border-accent ring-2 ring-accent/30' : 'border-accent/20'} bg-white shadow-sm overflow-hidden transition-all`}>
                        {isAll ? (
                          <div className="w-full h-full flex items-center justify-center text-2xl text-main">🛍️</div>
                        ) : (
                          <img
                            src={imageFor(cat.slug)}
                            alt={`${cat.title} thumbnail`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='%23f5f5f5'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'>${cat.title}</text></svg>`;
                              e.currentTarget.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
                            }}
                          />
                        )}
                      </div>
                      <span className={`mt-1.5 text-xs font-medium text-center ${isActive ? 'text-accent font-semibold' : 'text-white'}`}>
                        {cat.title}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-4 sm:py-6">
          {/* Product Grid */}
          {(!filteredItems || filteredItems.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No items {searchTerm ? `matching "${searchTerm}"` : 'available'} {selectedCategoryTitle ? `in ${selectedCategoryTitle}` : 'in the store'}.
              </p>
              <button
                onClick={() => navigate('/store')}
                className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-[#704091] transition"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredItems.map((item) => (
                <Link
                  key={item._id || item.slug}
                  to={`/store/${item.slug?.current || item.slug}`}
                  className="block group"
                >
                  <div
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                  >
                    <div className="relative pt-[100%] bg-gray-50">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <span className="text-sm">No Image</span>
                        </div>
                      )}
                      {item.compareAtPrice > item.price && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          SALE
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors" title={item.title}>
                        {item.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
                        {item.shortDescription || item.description || ''}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{item.price?.toLocaleString('en-IN')}
                          </span>
                          {item.compareAtPrice > item.price && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.compareAtPrice?.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <button
                          className="px-3 py-1.5 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
