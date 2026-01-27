const BannerImg = '/assets/Main page Banner.jpg';

export default function Hero() {
  return (
    <section className="w-full bg-background min-h-screen md:min-h-0 md:py-16 px-0 md:px-4 flex items-center md:block">
      <div className="max-w-7xl mx-auto">
        {/* Hero Banner with Background Image */}
        <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 mb-8 md:mb-12 shadow-2xl">
          {/* Background Image */}
          <img 
            src={BannerImg}
            alt="Svasam Banner"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
            onError={(e) => {
              console.error('Banner image failed to load:', BannerImg);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Banner image loaded successfully:', BannerImg);
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-700/70 to-indigo-800/80" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
              Discover Your Path
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-3xl mb-6 md:mb-8 drop-shadow-md">
              Explore our holistic wellness categories designed to guide you on your journey to inner peace and transformation
            </p>
            <a 
              href="#categories" 
              className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white text-purple-700 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* Additional Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center px-4 md:px-0">
          {/* Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-main mb-3 md:mb-4">
              Discover Inner Peace with Svasam
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto md:mx-0">
              Connect with trusted guides to transform & uplift your life on Svasam. Meditation, breathwork, and spiritual guidance Svasam.
            </p>
            <a 
              href="#sessions" 
              className="inline-block px-6 py-2 md:px-8 md:py-3 bg-main text-white rounded-lg shadow-lg font-semibold hover:bg-accent transition text-sm md:text-base"
            >
              Book A Session
            </a>
          </div>
          
          {/* Image Content */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-gradient-to-br from-accent/30 via-main/20 to-accent/30 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Featured Programs</h3>
                <p className="text-white/80 text-sm md:text-base text-center">Discover our transformative spiritual journeys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
