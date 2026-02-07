import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Svasam"
        description="Learn about Svasam's mission to provide authentic spiritual guidance and emotional wellbeing. Discover our vision for creating a world where everyone has access to trusted spiritual support."
        keywords="about svasam, spiritual guidance, emotional wellbeing, mindfulness, meditation, personal growth, inner peace, wellness platform"
        image="/images/about-svasam.jpg"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Svasam',
          description: 'Learn about Svasam\'s mission to provide authentic spiritual guidance and emotional wellbeing.',
          url: 'https://svasam.com/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'Svasam',
            description: 'Your Space for Healing, Growth & Inner Transformation',
            url: 'https://svasam.com',
            foundingDate: '2024',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'India'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-XXXXXXXXXX',
              contactType: 'customer service',
              availableLanguage: ['English']
            }
          }
        }}
      />
      <div className="min-h-screen w-full bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white text-center mb-8">Your Space for Healing, Growth & Inner Transformation</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 mb-6">
              Svasam is a digital sanctuary designed to help you rediscover balance, clarity, and emotional wellbeing. Rooted in ancient wisdom and modern mindfulness, Svasam connects you with trusted guides who support your journey toward happiness, purpose, and inner peace.
            </p>
            <p className="text-gray-700">
              We believe that true transformation begins with the right guidance — and at Svasam, that guidance is always authentic, compassionate, and personalised.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Our Vision</h2>
            <p className="text-gray-700">
              To create a world where every individual has access to trusted spiritual and emotional support, helping them lead a life filled with joy, clarity, and fulfilment.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Our Mission</h2>
            <p className="text-gray-700">
              To offer meaningful guidance, transformative sessions, and curated content that empower individuals to heal, grow, and thrive — mentally, emotionally, and spiritually.
            </p>
          </div>

          {/* Who We Are */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              Svasam is more than a platform — it is a safe space where people can reconnect with themselves through conscious practices and supportive mentorship.
              Our goal is to make spiritual wellness, mindful living, and emotional healing accessible to everyone, no matter where they are in their journey.
            </p>
            <p className="text-gray-700">
              Our community is built on trust, compassion, and the belief that every person deserves a personalised path to happiness.
            </p>
          </div>

          {/* What We Do */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">What We Do</h2>
            <p className="text-gray-700 mb-6">
              At Svasam, we offer a range of experiences designed to support your overall wellbeing:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>1:1 Personal Sessions with experienced Svasam Guides</li>
              <li>Live group sessions for collective learning and shared healing</li>
              <li>Curated spiritual and mindfulness content tailored to your needs</li>
              <li>Workshops and courses that deepen your understanding and practice</li>
            </ul>
            <p className="text-gray-700">
              We combine ancient practices with modern insights to help you navigate challenges, strengthen emotional resilience, and build long-lasting inner harmony.
            </p>
          </div>

          {/* How We Do It */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">How We Do It</h2>
            <p className="text-gray-700 mb-6">
              We bring together handpicked Svasam Guides — experts in healing, spirituality, meditation, mindfulness, emotional wellness, and life transformation.
            </p>
            <p className="text-gray-700 mb-6">
              Through our platform, you gain access to:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li>Thoughtfully curated wisdom</li>
              <li>Guided practices and tools</li>
              <li>Meaningful personal interactions</li>
              <li>Safe, supportive spaces for expression and growth</li>
            </ul>
            <p className="text-gray-700">
              Every session and piece of content is designed to meet you where you are and help you move forward with clarity and confidence.
            </p>
          </div>

          {/* Why Choose Svasam */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Why Choose Svasam</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">1. A Safe & Sacred Space</h3>
                <p className="text-gray-700">
                  We prioritise trust, authenticity, and emotional safety.
                  Svasam offers a judgement-free environment where you can explore your inner world freely and honestly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">2. Genuine Human Connections</h3>
                <p className="text-gray-700">
                  Our platform connects you with compassionate mentors who guide you through real conversations, deep listening, and personalised support.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">3. Expert-Led, Mindfully Curated Content</h3>
                <p className="text-gray-700">
                  Everything we offer — from sessions to courses — is carefully selected to help you create a life filled with balance, positive energy, and personal growth.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">4. Community-Centric Empowerment</h3>
                <p className="text-gray-700">
                  At Svasam, you are at the centre of your journey.
                  We empower you to shape your unique path based on your pace, values, beliefs, and aspirations.
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Our Commitment</h2>
            <p className="text-gray-700">
              We are dedicated to offering a holistic, enriching, and empowering experience that promotes long-term wellbeing.
              With Svasam, you are never alone — you are supported, guided, and encouraged every step of the way.
            </p>
          </div>

        </div>
      </div>
      </div>
    </>
  );
}
