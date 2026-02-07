// Performance optimization utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/assets/banner.jpg', as: 'image' },
    { href: '/assets/Mind.png', as: 'image' },
    { href: '/assets/Body.png', as: 'image' },
    { href: '/assets/New soul.png', as: 'image' },
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'image') {
      link.fetchPriority = 'high';
    }
    document.head.appendChild(link);
  });
};

// Remove loading indicator once app is ready
export const hideLoadingIndicator = () => {
  const loadingElement = document.querySelector('.loading');
  if (loadingElement) {
    loadingElement.style.opacity = '0';
    setTimeout(() => {
      loadingElement.remove();
    }, 300);
  }
};

// Optimize LCP by prioritizing above-the-fold content
export const optimizeLCP = () => {
  // Set fetch priority for hero images
  const heroImages = document.querySelectorAll('img[fetchpriority="high"]');
  heroImages.forEach(img => {
    if (img.complete) {
      img.setAttribute('loading', 'eager');
    }
  });

  // Preload hero section images
  const heroSection = document.querySelector('section');
  if (heroSection) {
    const images = heroSection.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
};

// Intersection Observer for lazy loading
export const setupLazyLoading = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.onload = () => {
            img.classList.add('loaded');
          };
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeLCP();
      setupLazyLoading();
    });
  } else {
    preloadCriticalResources();
    optimizeLCP();
    setupLazyLoading();
  }

  // Hide loading indicator after app mounts
  setTimeout(hideLoadingIndicator, 1000);
};
