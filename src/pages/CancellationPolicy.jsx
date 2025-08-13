import { t } from '../i18n';

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen w-full bg-pink-50">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">Cancellation and Refund Policy</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Welcome to Svasam Wellness</h2>
            <p className="text-gray-700 text-lg">
              At Svasam Wellness, we understand that circumstances can change. This policy outlines our procedures for cancellations and refunds to ensure a fair and transparent experience for all our clients.
            </p>
          </div>

          {/* Appointment Cancellations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Appointment Cancellations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Cancellation Policy</h3>
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
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Refund Policy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Store Products</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We offer a 7-day return policy for store products.</li>
                  <li>Products must be unused and in their original packaging.</li>
                  <li>Shipping charges are non-refundable.</li>
                  <li>Refunds will be processed within 5-7 business days.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Wellness Sessions</h3>
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
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Special Cases</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Force Majeure</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Our policies may be waived in cases of force majeure (natural disasters, pandemics, etc.).</li>
                  <li>Refunds will be considered on a case-by-case basis.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Disputes</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Any disputes will be resolved in accordance with Indian law.</li>
                  <li>We strive to resolve all issues amicably through direct communication.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding our cancellation and refund policy, please contact our customer support team:
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">Email: support@svasam.com</p>
              <p className="text-gray-600">Phone: +91 1234567890</p>
              <p className="text-gray-600">Customer Support Hours: Mon-Sat, 10 AM - 7 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
