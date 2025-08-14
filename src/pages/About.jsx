import { t } from '../i18n';

export default function About() {
  return (
    <div className="min-h-screen w-full bg-pink-50">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">{t('about.title')}</h1>
        
        <div className="space-y-8">
          {/* Our Story */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">{t('about.ourStory')}</h2>
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                Founded in 2025, Svasam Wellness was born from a deep understanding of the interconnectedness between mind, body, and soul. Our journey began with a simple vision: to create a holistic wellness platform that empowers individuals to achieve true balance and inner peace.
              </p>
              <p className="text-gray-700 text-lg">
                We believe that true wellness is more than just physical health - it's about nurturing all aspects of your being. Our comprehensive approach combines ancient wisdom with modern science to provide personalized wellness solutions that transform lives.
              </p>
            </div>
          </div>

          {/* Our Services */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">{t('about.services')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{t('about.mindWellness')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Manifestation and Abundance Programs</li>
                  <li>Stress Reduction Techniques</li>
                  <li>Super Brain Training</li>
                  <li>Personal Growth Workshops</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">{t('about.bodyWellness')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Yoga and Meditation Classes</li>
                  <li>Nutrition and Diet Planning</li>
                  <li>Naturopathy Treatments</li>
                  <li>Physical Well-being Programs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{t('about.soulWellness')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Trauma Healing Sessions</li>
                  <li>Sound Therapy Workshops</li>
                  <li>Breathwork Practices</li>
                  <li>Spiritual Guidance Programs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">{t('about.storeResources')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Energy Stones and Rudrakshas</li>
                  <li>Wellness Products</li>
                  <li>Educational Resources</li>
                  <li>Wellness Accessories</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Philosophy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">{t('about.ourPhilosophy')}</h2>
            <p className="text-gray-700 text-lg mb-6">
              At Svasam, we believe in the power of holistic healing. Our philosophy is rooted in the understanding that true wellness comes from nurturing all aspects of your being - mind, body, and soul. We combine ancient wisdom with modern science to create personalized wellness solutions that transform lives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{t('about.holisticApproach')}</h3>
                <p className="text-gray-600">
                  We believe in treating the whole person, not just symptoms. Our programs are designed to create lasting change by addressing all aspects of your well-being.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">{t('about.personalizedSolutions')}</h3>
                <p className="text-gray-600">
                  Each person's journey is unique. That's why we offer customized wellness plans tailored to your specific needs and goals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{t('about.ancientWisdom')}</h3>
                <p className="text-gray-600">
                  We draw from time-tested traditions and practices while incorporating modern scientific understanding to create powerful wellness solutions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">{t('about.communitySupport')}</h3>
                <p className="text-gray-600">
                  We believe in the power of community. Our platform connects you with like-minded individuals on their own wellness journeys, creating a supportive network for growth.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Join Us */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('about.joinJourney')}</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Ready to transform your life? Join our community of wellness seekers and begin your journey to holistic health and happiness.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 bg-indigo-600 text-white rounded-lg py-3 px-6 hover:bg-indigo-700 transition">
                  {t('about.contactUs')}
                </button>
                <button className="flex-1 bg-green-600 text-white rounded-lg py-3 px-6 hover:bg-green-700 transition">
                  {t('about.scheduleSession')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
