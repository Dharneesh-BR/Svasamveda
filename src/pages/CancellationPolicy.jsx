import { t } from '../i18n';

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">{t('cancellation.title')}</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">{t('cancellation.welcome')}</h2>
            <p className="text-gray-700 text-lg">
              {t('cancellation.introText')}
            </p>
          </div>

          {/* Appointment Cancellations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('cancellation.appointmentCancellations')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('cancellation.cancellationPolicy')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>You can cancel your appointment up to 24 hours before the scheduled time.</li>
                  <li>Cancellations made within 24 hours of the appointment will be charged the full session fee.</li>
                  <li>No-shows without prior notice will be charged the full session fee.</li>
                  <li>Rescheduling is subject to availability and must be done at least 24 hours in advance.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('cancellation.emergencyCancellations')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>In case of genuine emergencies, please inform us as soon as possible.</li>
                  <li>We may provide flexibility in such cases at our discretion.</li>
                  <li>Medical emergencies require proof of documentation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('cancellation.refundPolicy')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('cancellation.storeProducts')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We offer a 7-day return policy for store products.</li>
                  <li>Products must be unused and in their original packaging.</li>
                  <li>Shipping charges are non-refundable.</li>
                  <li>Refunds will be processed within 5-7 business days.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('cancellation.wellnessSessions')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>No refunds for completed sessions.</li>
                  <li>Package sessions are non-refundable but may be transferred to another person.</li>
                  <li>Refunds may be considered on a case-by-case basis for medical reasons.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Cases */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('cancellation.specialCases')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('cancellation.forceMajeure')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Our policies may be waived in cases of force majeure (natural disasters, pandemics, etc.).</li>
                  <li>Refunds will be considered on a case-by-case basis.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('cancellation.disputes')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Any disputes will be resolved in accordance with Indian law.</li>
                  <li>We strive to resolve all issues amicably through direct communication.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('cancellation.contactUs')}</h2>
            <p className="text-gray-700 mb-4">
              {t('cancellation.contactMessage')}
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">{t('cancellation.email')}</p>
              <p className="text-gray-600">{t('cancellation.phone')}</p>
              <p className="text-gray-600">{t('cancellation.supportHours')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
