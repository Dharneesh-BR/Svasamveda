import { t } from '../i18n';

export default function CommunityReviews() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">{t('reviews.title')}</h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <p className="text-gray-800 italic mb-3">"Svasam has transformed my daily routine. The Mind sessions are so calming!"</p>
          <div className="text-sm text-gray-600 font-medium">— Priya S.</div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <p className="text-gray-800 italic mb-3">"I love the Body and Soul categories. The audio sessions are so easy to follow."</p>
          <div className="text-sm text-gray-600 font-medium">— Rahul K.</div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <p className="text-gray-800 italic mb-3">"Great platform for holistic wellness. The UI is beautiful and easy to use."</p>
          <div className="text-sm text-gray-600 font-medium">— Ananya M.</div>
        </div>
      </div>
    </section>
  );
}
