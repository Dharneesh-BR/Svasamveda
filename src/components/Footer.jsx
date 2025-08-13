import { Link } from 'react-router-dom';
import { t } from '../i18n';

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-gray-700 mt-16">
      {/* Main Footer Section */}
      <section className="bg-pink-50 text-gray-700 px-6 py-10 md:px-24 md:py-20 flex flex-col md:flex-row gap-10 md:gap-20 justify-between">
        <div>
          <Link className="font-medium text-3xl tracking-tight" to="/">{t('footer.brand')}</Link>
          <p className="mt-6 text-xs md:text-sm md:w-72">
            Svasam Wellness Pvt. Ltd., Office 2,<br />
            22 Paradise Villa Compound,<br />
            Bhulabhai Desai Road, Mahalaxmi Mandir,<br />
            Cumbala Hill, Mumbai 400026
          </p>

        </div>
        <div className="flex gap-12">
          <div className="flex flex-col w-36 lg:w-60">
            <Link className="text-xs md:text-sm mb-4 font-medium text-sm md:text-base" to="/blog">Blog</Link>
            <Link className="text-xs md:text-sm" to="/all-articles">All Articles</Link>
          </div>
          <div className="flex flex-col">
            <Link className="text-xs md:text-sm mb-4 font-medium text-sm md:text-base" to="/">Company</Link>
            <Link className="text-xs md:text-sm mb-2" to="/about">About Us</Link>
            <Link className="text-xs md:text-sm mb-2" to="/contact">Contact Us</Link>
            <Link className="text-xs md:text-sm mb-2" to="/refund-and-cancellation">Cancellation and Refund Policy</Link>
            <Link className="text-xs md:text-sm mb-2" to="/shipping-and-delivery">Shipping and Delivery Policy</Link>
            <Link className="text-xs md:text-sm mb-2" to="/terms-and-conditions">Terms and Conditions</Link>
            <Link className="text-xs md:text-sm" to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </section>


      {/* Copyright Section */}
      <section className="py-4 md:py-8 px-6 md:px-24 flex bg-pink-50 text-gray-700">
        <span className="ml-auto text-right text-xs md:text-base">© 2025 Svasam Wellness. All rights reserved</span>
      </section>
    </footer>
  );
}
