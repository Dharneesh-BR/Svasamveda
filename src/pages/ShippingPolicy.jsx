import { t } from '../i18n';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen w-full bg-pink-50">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">{t('shipping.title')}</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">{t('shipping.welcome')}</h2>
            <p className="text-gray-700 text-lg">
              This policy outlines our shipping and delivery procedures for all products purchased from our store. We strive to provide efficient and reliable delivery services to ensure you receive your wellness products in perfect condition.
            </p>
          </div>

          {/* Shipping Areas */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('shipping.shippingAreas')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('shipping.domesticShipping')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We ship to all major cities and towns across India.</li>
                  <li>Shipping charges vary based on location and product weight.</li>
                  <li>Free shipping on orders above ₹1999.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('shipping.internationalShipping')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Currently available for select countries.</li>
                  <li>Additional customs and import duties may apply.</li>
                  <li>Shipping charges calculated at checkout.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Times */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('shipping.shippingTimes')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Processing Time</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Orders are processed within 2-3 business days.</li>
                  <li>Custom orders may take longer (5-7 business days).</li>
                  <li>Processing time may vary during peak seasons.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Delivery Time</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Standard Delivery: 5-7 business days</li>
                  <li>Express Delivery: 2-3 business days (additional charges apply)</li>
                  <li>Delivery times may vary based on location.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Methods */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Shipping Methods</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Standard Shipping</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Regular courier service</li>
                  <li>Delivery confirmation via email</li>
                  <li>Tracking number provided</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Express Shipping</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Priority courier service</li>
                  <li>Real-time tracking available</li>
                  <li>Additional charges apply</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Delivery Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Delivery Address</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Please provide accurate delivery address.</li>
                  <li>Delivery to ground floor only for heavy items.</li>
                  <li>Additional charges for delivery above ground floor.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Delivery Time Slot</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Standard delivery time: 10 AM - 6 PM</li>
                  <li>Evening delivery available (additional charges apply)</li>
                  <li>Please be available during the delivery time slot.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Cases */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Special Cases</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Remote Areas</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Additional shipping charges may apply.</li>
                  <li>Longer delivery times possible.</li>
                  <li>Contact us for remote area shipping.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Holiday Periods</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Shipping may be delayed during holidays.</li>
                  <li>Special holiday shipping rates may apply.</li>
                  <li>Orders placed during holidays processed after holidays.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('shipping.contactUs')}</h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding shipping and delivery, please contact our customer support team:
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
