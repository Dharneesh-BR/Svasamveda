export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-pink-50">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">Privacy Policy</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Welcome to Svasam Wellness</h2>
            <p className="text-gray-700 text-lg">
              At Svasam Wellness, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </div>

          {/* Information Collection */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">1. Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Personal Information</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Payment information (when making purchases)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Usage Information</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Website usage data</li>
                  <li>Device information</li>
                  <li>Location data (when applicable)</li>
                  <li>Service usage patterns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">2. How We Use Your Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Primary Uses</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>To provide and improve our services</li>
                  <li>To process orders and payments</li>
                  <li>To communicate with you about our services</li>
                  <li>To personalize your experience</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Marketing</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We may send promotional emails with your consent</li>
                  <li>You can opt-out of marketing communications</li>
                  <li>We do not share your information with third-party marketers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">3. Data Protection</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Security Measures</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We use encryption to protect your data</li>
                  <li>We implement security measures to prevent unauthorized access</li>
                  <li>We regularly update our security practices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Data Retention</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We retain your information only as long as necessary</li>
                  <li>Information is deleted when no longer needed</li>
                  <li>We comply with legal requirements for data retention</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">4. Your Rights</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Access to Information</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>You can request access to your personal information</li>
                  <li>You can request corrections to your information</li>
                  <li>You can request deletion of your information</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Opt-Out Rights</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>You can opt-out of marketing communications</li>
                  <li>You can withdraw consent for data processing</li>
                  <li>You can object to certain data processing activities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third Parties */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">5. Third Parties</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Service Providers</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>We work with trusted third-party service providers</li>
                  <li>Service providers are contractually bound to protect your data</li>
                  <li>We do not share your information with unrelated third parties</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">External Links</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Our website may contain links to external sites</li>
                  <li>We are not responsible for external sites' privacy practices</li>
                  <li>Please review external sites' privacy policies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding this Privacy Policy or your data, please contact us:
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
