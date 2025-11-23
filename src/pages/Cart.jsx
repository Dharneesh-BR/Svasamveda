import { FiArrowLeft, FiCheck, FiChevronRight } from 'react-icons/fi';
import { FaRegClock, FaRupeeSign, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-xl font-bold text-gray-800">SoulSensei</Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
                <Link to="/soul-senseis" className="text-gray-600 hover:text-gray-900">Our Soul Senseis</Link>
                <Link to="/soul-sessions" className="text-gray-600 hover:text-gray-900">SoulSessions</Link>
                <Link to="/personal-sessions" className="text-gray-600 hover:text-gray-900">Personal Sessions</Link>
                <Link to="/practice" className="text-gray-600 hover:text-gray-900">Practice</Link>
              </nav>
            </div>
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              My Sessions
            </button>
          </div>
        </div>
      </header>

      {/* Cart Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button className="mr-4">
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold">Your cart</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Gift Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-purple-900 mb-1">A GIFT FOR YOUR JOURNEY</h2>
            <p className="text-purple-800 text-sm">A FREE session is waiting in your cart - your transformation begins here.</p>
          </div>
          <div className="absolute right-4 -bottom-4 w-32 h-32">
            <img 
              src="/images/gift-illustration.png" 
              alt="Gift"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Cart Item */}
        <div className="border rounded-xl p-4 mb-6">
          <div className="flex">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
              <img 
                src="/images/vedas-course.jpg" 
                alt="Course"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-gray-900">Unraveling the Blueprint of Life as per Vedas</h3>
              <div className="flex items-center text-gray-500 text-xs mt-1">
                <FaRegUser className="mr-1" />
                <span>Taught by Devi Divya Shakti</span>
              </div>
              <div className="flex items-center text-gray-500 text-xs mt-1">
                <FaRegClock className="mr-1" />
                <span>Hosted live Nov 25, 07:00 PM</span>
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-purple-700 font-bold">₹2100</span>
              </div>
            </div>
            <button className="text-red-500 text-sm font-medium">
              REMOVE
            </button>
          </div>
        </div>

        {/* Gift Session Section */}
        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-purple-900 text-lg mb-1">Your Journey Comes With A Gift</h3>
          <p className="text-purple-800 text-sm mb-6">Choose a free session to meet you where you are</p>
          
          {/* Free Session Cards */}
          <div className="space-y-4">
            {/* Session 1 */}
            <div className="bg-white rounded-xl p-4 relative">
              <div className="absolute top-4 right-4 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                <FiCheck className="text-white w-3 h-3" />
              </div>
              <div className="flex">
                <div className="w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-purple-600 text-2xl">🧘‍♀️</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full font-medium">Free</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Daily SoulSync</h4>
                  <p className="text-purple-800 text-xs font-medium">SOULSENSEI</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <FaRegClock className="mr-1" />
                    <span>Nov 24, 08:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session 2 */}
            <div className="bg-white rounded-xl p-4 relative border-2 border-transparent">
              <div className="absolute top-4 right-4 w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              <div className="flex">
                <div className="w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-purple-600 text-2xl">🧘‍♀️</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full font-medium">Free</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Daily SoulSync</h4>
                  <p className="text-purple-800 text-xs font-medium">SOULSENSEI</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <FaRegClock className="mr-1" />
                    <span>Nov 26, 08:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="flex items-center justify-between p-4 border rounded-xl mb-6">
          <span className="text-gray-700">Do you have a coupon</span>
          <FiChevronRight className="text-gray-500" />
        </div>
      </main>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">₹2100</p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
