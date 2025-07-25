function Sessions() {
  const sessions = [
    {
      id: 1,
      category: 'Mind',
      title: 'Manifest Abundance',
      description: 'Learn powerful techniques to attract abundance and prosperity into your life.',
      duration: '60 mins',
      price: '₹1999',
      image: '/mind-session-1.jpg'
    },
    {
      id: 2,
      category: 'Body',
      title: 'Yoga for Beginners',
      description: 'Start your yoga journey with this comprehensive beginner-friendly session.',
      duration: '45 mins',
      price: '₹1499',
      image: '/body-session-1.jpg'
    },
    {
      id: 3,
      category: 'Soul',
      title: 'Chakra Activation',
      description: 'Unlock your energy centers through guided meditation and healing.',
      duration: '75 mins',
      price: '₹2499',
      image: '/soul-session-1.jpg'
    },
    {
      id: 4,
      category: 'Mind',
      title: 'Stress Management',
      description: 'Techniques to reduce stress and find inner peace.',
      duration: '45 mins',
      price: '₹1699',
      image: '/mind-session-2.jpg'
    },
    {
      id: 5,
      category: 'Body',
      title: 'Nutrition Consultation',
      description: 'Personalized nutrition plan for your wellness journey.',
      duration: '60 mins',
      price: '₹2299',
      image: '/body-session-2.jpg'
    },
    {
      id: 6,
      category: 'Soul',
      title: 'Sound Healing',
      description: 'Experience deep relaxation through sound therapy.',
      duration: '60 mins',
      price: '₹2199',
      image: '/soul-session-2.jpg'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-indigo-800 text-center mb-12">Svasam Sessions</h1>
        
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Welcome to Svasam Sessions</h2>
            <p className="text-gray-700 text-lg">
              Experience transformative wellness sessions across Mind, Body, and Soul. Our expert practitioners are here to guide you on your wellness journey.
            </p>
          </div>

          {/* Session Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 bg-gray-100">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100"></div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
                    {session.category}
                  </span>
                  <h3 className="text-xl font-bold text-indigo-800 mb-2">{session.title}</h3>
                  <p className="text-gray-600 mb-4">{session.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-semibold">{session.duration}</span>
                    <span className="text-indigo-600 font-bold">{session.price}</span>
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-r from-purple-100 via-purple-200 to-blue-100 text-indigo-700 font-semibold py-2 px-4 rounded-full shadow hover:shadow-lg transition-all duration-200">
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Session Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#8e6192] mb-3">Mind</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Manifest Abundance</li>
                  <li>Stress Management</li>
                  <li>Meditation</li>
                  <li>Self Sessions</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#8e6192] mb-3">Body</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Yoga</li>
                  <li>Nutrition</li>
                  <li>Naturopathy</li>
                  <li>Self Sessions</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#8e6192] mb-3">Soul</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Chakra Activation</li>
                  <li>Sound Healing</li>
                  <li>Guided Meditation</li>
                  <li>Self Sessions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Benefits of Svasam Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Personalized Experience</h3>
                <p className="text-gray-600">Our sessions are tailored to your unique needs and goals.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Expert Practitioners</h3>
                <p className="text-gray-600">Learn from certified wellness experts with years of experience.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600">Choose sessions that fit your schedule and lifestyle.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Holistic Approach</h3>
                <p className="text-gray-600">Experience comprehensive wellness through Mind, Body, and Soul.</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any questions about our sessions or to book a session, please contact us:
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

export default Sessions;
