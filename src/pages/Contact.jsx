import { t } from '../i18n';

export default function Contact() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-12 sm:py-16 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-800 text-center mb-8 sm:mb-12">{t('contact.title')}</h1>
        
        <div className="space-y-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-6 sm:mb-8">{t('contact.getInTouch')}</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.fullName')}</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('contact.fullNamePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.emailAddress')}</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.phoneNumber')}</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('contact.phonePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.subject')}</label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="general">{t('contact.generalInquiry')}</option>
                  <option value="wellness">{t('contact.wellnessPrograms')}</option>
                  <option value="store">{t('contact.storeProducts')}</option>
                  <option value="appointment">{t('contact.scheduleAppointment')}</option>
                  <option value="other">{t('contact.other')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.message')}</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t('contact.messagePlaceholder')}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-main text-white py-3 px-6 rounded-lg hover:brightness-105 transition flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {t('contact.sendMessage')}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl font-bold text-indigo-800 mb-8">{t('contact.contactInfo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('contact.officeLocation')}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Svasam Wellness Pvt. Ltd.</p>
                  <p className="text-gray-600">Office 2, 22 Paradise Villa Compound</p>
                  <p className="text-gray-600">Bhulabhai Desai Road, Mahalaxmi Mandir</p>
                  <p className="text-gray-600">Cumbala Hill, Mumbai 400026</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('contact.contactDetails')}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Email: support@svasam.com</p>
                  <p className="text-gray-600">Phone: +91 1234567890</p>
                  <p className="text-gray-600">Customer Support: Mon-Sat, 10 AM - 7 PM</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">{t('contact.businessHours')}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Monday - Friday: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>

            </div>
          </div>

          {/* FAQ */}
          <section className="my-16 max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-800 text-center mb-8 sm:mb-12">{t('contact.title')}</h1>
            <div className="space-y-4">
              <details className="bg-white rounded-xl shadow p-4">
                <summary className="font-semibold text-indigo-700 cursor-pointer">{t('contact.faqQuestion1')}</summary>
                <p className="mt-2 text-gray-700">You can schedule a session by contacting our customer support team or using our online booking system. Simply provide your preferred date and time, and we'll help you find the right wellness practitioner for your needs.</p>
              </details>
              <details className="bg-white rounded-xl shadow p-4">
                <summary className="font-semibold text-indigo-700 cursor-pointer">{t('contact.faqQuestion2')}</summary>
                <p className="mt-2 text-gray-700">We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery for our wellness programs and store products.</p>
              </details>
              <details className="bg-white rounded-xl shadow p-4">
                <summary className="font-semibold text-indigo-700 cursor-pointer">{t('contact.faqQuestion3')}</summary>
                <p className="mt-2 text-gray-700">Yes, you can cancel your appointment up to 24 hours before the scheduled time. Please contact our customer support team for assistance.</p>
              </details>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
