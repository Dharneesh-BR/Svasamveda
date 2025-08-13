import { t } from '../i18n';

export default function TermsConditions() {
  return (
    <div className="min-h-screen w-full bg-pink-50">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">{t('terms.title')}</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Welcome to Svasam Wellness</h2>
            <p className="text-gray-700 text-lg">
              These Terms and Conditions outline the rules and regulations for the use of Svasam Wellness's Website and Services.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">1. Acceptance of Terms</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Access to Website</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>By accessing this website, you agree to be bound by these Terms and Conditions.</li>
                  <li>Our services are only available to individuals who can form legally binding contracts.</li>
                  <li>Access to certain areas of the website may be restricted.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('terms.changesToTerms')}</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We reserve the right to modify these Terms and Conditions at any time.</li>
                  <li>Continued use of the website after changes constitutes acceptance of the new terms.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Obligations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">2. User Obligations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Account Security</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Keep your account credentials secure.</li>
                  <li>Notify us immediately of any unauthorized access.</li>
                  <li>Be responsible for all activities under your account.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Prohibited Activities</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Do not use our services for illegal purposes.</li>
                  <li>Do not interfere with our website's operations.</li>
                  <li>Do not violate intellectual property rights.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">3. Services</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Wellness Services</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Services are subject to availability.</li>
                  <li>Prices are subject to change without notice.</li>
                  <li>Services may be modified or discontinued at any time.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Store Products</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Product descriptions are for informational purposes only.</li>
                  <li>Stock availability is not guaranteed.</li>
                  <li>Prices are subject to change without notice.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">4. Intellectual Property</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Content Ownership</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>All content on the website is owned by Svasam Wellness.</li>
                  <li>You may not reproduce or distribute our content without permission.</li>
                  <li>User-generated content remains the property of the user.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Trademarks</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Svasam Wellness and related logos are trademarks.</li>
                  <li>You may not use our trademarks without permission.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">5. Limitation of Liability</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Disclaimer of Warranties</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Services are provided "as is" and "as available".</li>
                  <li>No warranties are made regarding service availability.</li>
                  <li>Results from wellness services are not guaranteed.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Limitation of Damages</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We are not liable for any indirect or consequential damages.</li>
                  <li>Our liability is limited to the amount paid for services.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">{t('terms.contactUs')}</h2>
            <p className="text-gray-700 mb-4">
              {t('terms.contactMessage')}
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">{t('terms.email')}</p>
              <p className="text-gray-600">{t('terms.phone')}</p>
              <p className="text-gray-600">{t('terms.supportHours')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
