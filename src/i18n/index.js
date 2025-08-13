// Basic i18n setup for future internationalization
export const translations = {
  en: {
    store: {
      title: 'Svasam Store',
      description: 'Discover our collection of spiritual and wellness products to support your journey',
      noItems: 'No items available in the store at the moment. Please check back later.',
      viewDetails: 'View Details',
      tryAgain: 'Try Again',
      errorLoading: 'Error Loading Store Items'
    },
    footer: {
      brand: 'Svasam'
    },
    reviews: {
      title: 'Community Reviews'
    },
    programs: {
      title: 'Test Programs by Category'
    },
    about: {
      services: 'Our Services'
    },
    events: {
      bookNow: 'Book Now'
    },
    terms: {
      title: 'Terms and Conditions',
      contactUs: 'Contact Us',
      supportHours: 'Customer Support Hours: Mon-Sat, 10 AM - 7 PM',
      phone: 'Phone: +91 1234567890',
      changesToTerms: 'Changes to Terms',
      email: 'Email: support@svasam.com',
      contactMessage: 'For any questions regarding these Terms and Conditions, please contact us:'
    },
    cancellation: {
      emergencyCancellations: 'Emergency Cancellations'
    },
    privacy: {
      title: 'Privacy Policy',
      welcome: 'Welcome to Svasam Wellness',
      infoCollect: '1. Information We Collect',
      personalInfo: 'Personal Information',
      usageInfo: 'Usage Information',
      howWeUse: '2. How We Use Your Information',
      primaryUses: 'Primary Uses',
      marketing: 'Marketing',
      dataProtection: '3. Data Protection',
      contactUs: 'Contact Us'
    },
    contact: {
      title: 'Contact Us',
      getInTouch: 'Get in Touch',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      sendMessage: 'Send Message',
      contactInfo: 'Contact Information',
      faq: 'Frequently Asked Questions'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      sale: 'SALE'
    }
  }
};

export const t = (key, lang = 'en') => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};