import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useStoreItems } from '../hooks/useStoreItems';
import { useCart } from '../contexts/CartContext';
import { t } from '../i18n';
const MindImg = '/assets/Main page.png';
const SoulImg = '/assets/Soul icon.png';
const BodyImg = '/assets/body icon.png';
const Logo = '/icons/Logo icon.png';
import FAQSection from '../components/FAQSection';
import TestPrograms from '../components/TestPrograms';
import Testimonials from '../components/Testimonials';

const CategoryCard = ({ to, title, description, image, alt }) => (
  <article className="flex flex-col items-center h-full">
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col">
      <img 
        src={image} 
        alt={alt} 
        className="w-36 h-36 mb-6 mx-auto object-contain"
        loading="lazy"
        width={144}
        height={144}
      />
      <div className="flex-grow">
        <h2 className="text-3xl font-bold text-center text-main mb-4">{title}</h2>
        <p className="text-text text-base leading-relaxed text-center mb-6">
          {description}
        </p>
      </div>
      <div className="mt-auto">
        <Link 
          to={to} 
          className="flex items-center justify-center group w-full py-3 text-main hover:text-accent transition-colors text-base font-semibold"
          aria-label={t('categories.exploreAriaLabel', { title })}
        >
          <span className="mr-2 font-medium">{t('categories.explore')}</span>
          <svg 
            className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  </article>
);

export default function Categories() {
  const navigate = useNavigate();
  const { items } = useStoreItems(null);
  const { addToCart } = useCart();

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
    const pathSlug = slug === 'rudraksha' ? 'rudrakshas' : slug;
    navigate(`/store/${pathSlug}`);
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
    <main className="relative min-h-screen w-full bg-background/80">
      {/* Decorative background logo */}
      <img
        src={Logo}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-40 z-0 pointer-events-none select-none"
        draggable={false}
        aria-hidden="true"
      />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Spacer with semantic meaning */}
          <div className="h-12 md:h-16 w-full bg-background" aria-hidden="true" />
          
          {/* Hero Banner with Mind Image */}
          <header className="relative mb-12 md:mb-16 rounded-xl overflow-hidden h-64 md:h-96">
            <div className="absolute inset-0">
              <img 
                src={MindImg}
                alt="Mind category banner"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-main/90 to-accent/80" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('categories.title')}</h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                {t('categories.description')}
              </p>
            </div>
          </header>

          {/* Categories Grid */}
          <section aria-labelledby="categories-heading" className="py-8 md:py-12">
            <h2 id="categories-heading" className="sr-only">{t('categories.heading')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  to={`/${category.id}`}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  alt={category.alt}
                />
              ))}
            </div>
          </section>
          
          {/* Test Programs Section */}
          <div className="py-8">
            <TestPrograms />
          </div>

          {/* Store Categories Carousel (moved below Our Programs) */}
          <section className="mb-12">
            <div className="mb-3 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-main">Store Categories</h2>
              <Link to="/store" className="block mt-2 text-base text-accent hover:text-[#704091] font-semibold">View all</Link>
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label="Scroll categories left"
                onClick={scrollLeft}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
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
                    className="flex-shrink-0 snap-start group w-28 sm:w-36 focus:outline-none"
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
                            const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='%23f5f5f5'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'>${cat.title}</text></svg>`;
                            e.currentTarget.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm font-semibold text-main">{cat.title}</div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Scroll categories right"
                onClick={scrollRight}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-accent/20 shadow hover:bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </section>

          {/* Store Items Two-Row Carousel */}
          <section className="mb-12">
            <div className="mb-3 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-main">Featured Products</h2>
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
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">No Image</div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-[#8e6192] line-clamp-2" title={item.title}>{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 mb-3">
                          {(() => { const t = (item.shortDescription || item.description || '').trim(); return t.length > 80 ? t.slice(0,80) + '…' : t; })()}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-main font-bold">₹{item.price?.toLocaleString('en-IN')}</span>
                          <button
                            className="px-3 py-1.5 bg-main text-white rounded-md text-xs font-semibold hover:brightness-105"
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

          {/* Testimonials Section */}
          <Testimonials />
          
          {/* FAQ Section */}
          <FAQSection />
        </div>
      </div>
    </main>
  );
}
