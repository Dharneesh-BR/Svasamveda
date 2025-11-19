import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQItem = ({ question, children, isOpen, onClick }) => (
  <div className="mb-6 last:mb-0">
    <button
      className="w-full flex justify-between items-center py-3 px-0 text-left transition-colors group border-b border-gray-200 pb-3"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-gray-800 text-lg group-hover:text-main">{question}</span>
      {isOpen ? (
        <FiChevronUp className="text-accent text-xl flex-shrink-0 ml-4" />
      ) : (
        <FiChevronDown className="text-gray-500 text-xl group-hover:text-accent flex-shrink-0 ml-4" />
      )}
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
      aria-hidden={!isOpen}
    >
      <div className="text-gray-700">{children}</div>
    </div>
  </div>
);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is Svasam?',
      answer: 'Svasam is a holistic wellness platform offering Mind, Body, and Soul sessions for your well-being. We provide guided programs, self-sessions, and community support to help you achieve balance and harmony in all aspects of life.'
    },
    {
      question: 'How do I access the audio/video sessions?',
      answer: 'You can access our audio/video sessions by navigating to the respective category (Mind, Body, or Soul) and selecting the session you\'re interested in. Simply click on the session to start your journey.'
    },
    {
      question: 'Is Svasam free to use?',
      answer: 'Svasam offers both free and premium content. While many of our basic sessions are available at no cost, we also offer premium programs with additional features and personalized guidance. You can explore our pricing plans for more details.'
    },
    {
      question: 'Can I use Svasam on my mobile device?',
      answer: 'Absolutely! Svasam is fully responsive and works seamlessly on both desktop and mobile devices. You can also install it as a Progressive Web App (PWA) for an app-like experience with offline access to your favorite sessions.'
    },
    {
      question: 'Are my personal details and activity private?',
      answer: 'Your privacy is our top priority. All personal information and activity data are encrypted and stored securely. We never share your data with third parties without your explicit consent, in compliance with data protection regulations.'
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your personal dashboard tracks your session history, completed programs, and milestones. You can monitor your progress, set goals, and receive personalized recommendations based on your activity.'
    },
    {
      question: 'Can I download sessions for offline use?',
      answer: 'Yes, premium members can download selected sessions for offline access. This feature allows you to continue your practice even without an internet connection, perfect for travel or areas with limited connectivity.'
    },
    {
      question: 'How can I contact Svasam support?',
      answer: 'We\'re here to help! You can reach our support team by emailing support@svasam.com or by using the contact form on our website. Our team typically responds within 24-48 hours.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about our wellness programs and services
          </p>
        </div>
        
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            >
              <p className="leading-relaxed">{faq.answer}</p>
            </FAQItem>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">Still have questions?</p>
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
