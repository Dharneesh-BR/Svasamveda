import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStoreItems } from '../hooks/useStoreItems';
import { useCart } from '../contexts/CartContext';
import { t } from '../i18n';

// Carousel banner images
const bannerImages = [
  '/assets/banner.jpg',
  '/assets/MainPageBanner.jpg'
];
const MindImg = '/assets/Mind.png';
const SoulImg = '/assets/New soul.png';
const BodyImg = '/assets/Body.png';
const Logo = '/assets/Svasam vector 2 New.png';
import FAQSection from '../components/FAQSection';
import TestPrograms from '../components/TestPrograms';
import Testimonials from '../components/Testimonials';

// Import Chevron icons
const ChevronLeft = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CategoryCard = ({ to, title, description, image, alt }) => {
  return (
    <div className="h-full w-full">
      <Link 
        to={to} 
        className="w-full h-full group block"
        aria-label={t('categories.exploreAriaLabel', { title })}
      >
        {/* Mobile View - Compact Card */}
        <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 w-full flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-100 mx-auto max-w-sm">
          <div className="h-20 w-20 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full"></div>
            <img 
              src={image} 
              alt={alt}
              className="w-full h-full object-contain relative z-10"
              loading="lazy"
            />
          </div>
          <h2 className="text-base font-semibold text-gray-800 text-center line-clamp-2">
            {title}
          </h2>
        </div>

        {/* Desktop View - Elegant Card */}
        <div className="hidden md:flex bg-white rounded-3xl shadow-xl p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full h-[320px] flex flex-col border border-purple-100 mx-auto max-w-md">
          <div className="h-28 w-28 mx-auto mb-3 flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl"></div>
            <img 
              src={image} 
              alt={alt}
              className="w-full h-full object-contain relative z-10"
              loading="lazy"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-center text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 px-2">
              {title}
            </h2>
          </div>
          
          <div className="mt-2 pt-2 border-t border-purple-100">
            <div className="flex items-center justify-center text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
              <span className="mr-2">{t('categories.explore')}</span>
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

export default function Categories() {
  const navigate = useNavigate();
  const { items } = useStoreItems(null);
  const { addToCart } = useCart();

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Carousel functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Store categories (reuse mapping from Store page)
  const STORE_CATEGORIES = useMemo(() => [
    { slug: 'bracelets', title: 'Bracelets' },
    { slug: 'rudraksha', title: 'Rudraksha' },
    { slug: 'murti', title: 'Murti' },
    { slug: 'anklet', title: 'Anklet' },
    { slug: 'frames', title: 'Frames' },
    { slug: 'karungali', title: 'Karungali' },
    { slug: 'zodiac', title: 'Zodiac' },
    { slug: 'pyrite', title: 'Pyrite' },
    { slug: 'gemstones', title: 'Gemstones' },
    { slug: 'pendant', title: 'Pendant' },
  ], []);

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

  // Preload images
  useEffect(() => {
    STORE_CATEGORIES.forEach(cat => {
      const img = new Image();
      img.src = imageFor(cat.slug);
    });
  }, [STORE_CATEGORIES, imageFor]);

  // Carousel scroll controls
  const carouselRef = useRef(null);
  const scrollByAmount = 260;
  const scrollLeft = useCallback(() => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  }, []);
  const scrollRight = useCallback(() => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  }, []);

  const goToCategory = useCallback((slug) => {
    navigate(`/`);
  }, [navigate]);

  // Two-row items carousel controls
  const itemsRef = useRef(null);
  const itemsScrollLeft = useCallback(() => {
    if (itemsRef.current) itemsRef.current.scrollBy({ left: -640, behavior: 'smooth' });
  }, []);
  const itemsScrollRight = useCallback(() => {
    if (itemsRef.current) itemsRef.current.scrollBy({ left: 640, behavior: 'smooth' });
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

  const categories = [
    {
      id: 'mind',
      title: t('categories.mind.title'),
      description: t('categories.mind.description'),
      image: MindImg,
      alt: t('categories.mind.alt')
    },
    {
      id: 'body',
      title: t('categories.body.title'),
      description: t('categories.body.description'),
      image: BodyImg,
      alt: t('categories.body.alt')
    },
    {
      id: 'soul',
      title: t('categories.soul.title'),
      description: t('categories.soul.description'),
      image: SoulImg,
      alt: t('categories.soul.alt')
    }
  ];

  return (
    <main className="relative min-h-screen w-full">
      {/* Full Screen Carousel Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Carousel Slides */}
        <div className="relative w-full h-full">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
                onError={(e) => {
                  console.error(`Banner image ${index + 1} failed to load:`, image);
                }}
              />
              {/* Dark overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
            </div>
          ))}
        </div>

        {/* Carousel Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
            Reconnect. Realign. Transform.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mb-8 md:mb-12 drop-shadow-lg animate-fade-in-delay">
            Curated programs for inner clarity and conscious performance
          </p>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-8 right-8 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
          aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </section>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Section */}
          <section aria-labelledby="categories-heading" className="w-full py-8 sm:py-12">
            <div className="mb-8 text-center">
              <p className="text-white/70 text-lg max-w-2xl mx-auto">Explore our transformative wellness programs designed to nurture your mind, body, and soul</p>
            </div>
            
            {/* Categories Grid */}
            <div className="relative">
              {/* Mobile View - Horizontal Scroll */}
              <div className="md:hidden px-4 sm:px-6 mt-8">
                <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex-shrink-0 w-72">
                      <CategoryCard
                        to={`/${category.id}`}
                        title={category.title}
                        description={category.description}
                        image={category.image}
                        alt={category.alt}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View - Grid */}
              <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 px-4 sm:px-6 lg:px-8">
                {categories.map((category) => (
                  <div key={category.id} className="w-full">
                    <CategoryCard
                      to={`/${category.id}`}
                      title={category.title}
                      description={category.description}
                      image={category.image}
                      alt={category.alt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Test Programs Section */}
          <div className="py-8">
            <TestPrograms />
          </div>

          {false && (
            <section className="mb-12">
              <div className="mb-3 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">Shop by Category</h2>
                <Link to="/" className="block mt-2 text-base text-white/70 hover:text-white font-semibold">View all</Link>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Scroll categories left"
                  onClick={() => scrollLeft()}
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div
                  ref={carouselRef}
                  className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-10"
                  role="tablist"
                  aria-label="Store categories"
                >
                  {STORE_CATEGORIES.map(cat => (
                    <button
                      key={cat.slug}
                      role="tab"
                      onClick={() => goToCategory(cat.slug)}
                      className="flex-shrink-0 snap-start group w-20 sm:w-28 md:w-36 focus:outline-none"
                      title={cat.title}
                    >
                      <div className="rounded-xl border border-accent/20 bg-white shadow-sm overflow-hidden transition-all">
                        <div className="aspect-square w-full bg-gray-50 overflow-hidden">
                          <img
                            src={imageFor(cat.slug)}
                            alt={`${cat.title} thumbnail`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm" style={{ display: 'none' }}>No Image</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center text-sm font-semibold text-white">{cat.title}</div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Scroll categories right"
                  onClick={() => scrollRight()}
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </section>
          )}

          {false && (
            <section className="mb-12">
              <div className="mb-3 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">Featured Products</h2>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Scroll items left"
                  onClick={itemsScrollLeft}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>

                <div
                  ref={itemsRef}
                  className="overflow-x-auto no-scrollbar px-2"
                >
                  <div className="grid grid-rows-2 grid-flow-col gap-5 auto-cols-[minmax(220px,260px)]">
                    {(items || []).slice(0, 20).map((item) => (
                      <div key={item._id || item.title} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
                        <div className="relative aspect-[4/3] bg-gray-50">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                          )}
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                          <h3 className="text-sm font-semibold text-[#8e6192] line-clamp-2" title={item.title}>{item.title}</h3>
                          <p className="text-gray-600 text-xs mt-1 mb-2">
                            {(() => { const t = (item.shortDescription || item.description || '').trim(); return t.length > 60 ? t.slice(0,60) + '…' : t; })()}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-white font-bold text-sm">₹{item.price?.toLocaleString('en-IN')}</span>
                            <button
                              className="px-2 py-1 bg-purple-600 text-white rounded-md text-xs font-semibold hover:bg-purple-700"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Scroll items right"
                  onClick={itemsScrollRight}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </section>
          )}

          {/* Testimonials Section */}
          <Testimonials />
          
          {/* FAQ Section */}
          <FAQSection />
        </div>
      </div>
    </main>
  );
}