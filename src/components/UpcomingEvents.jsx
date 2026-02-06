const events = [
  {
    id: "daily-ritual",
    title: "Your Daily 30-Min Ritual",
    coach: "Svasam",
    date: "Fri, 4th Jul · 2:30 AM",
    duration: "60 Minutes",
    price: "₹300 per session",
    type: "Meditation, Breathwork, Affirmations",
  },
  {
    id: "chakra-journey",
    title: "7 Week Chakra Journey",
    coach: "Vidhi Agarwal",
    date: "Sun, 22nd Jun · 5:00 AM",
    duration: "60 Minutes",
    price: "₹7,777 per session",
    type: "Chakra Work",
  },
  {
    id: "buddha-peace",
    title: "Buddha's Way To Peace",
    coach: "David Marks",
    date: "Thu, 3rd Jul · 2:30 AM",
    duration: "60 Minutes",
    price: "FREE",
    type: "Talk Therapy",
  },
];

import { t } from '../i18n';

export default function UpcomingEvents() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto" id="sessions">
      <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">Upcoming This Week</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-indigo-100">
            <h3 className="text-xl font-semibold text-indigo-700">{event.title}</h3>
            <div className="text-sm text-gray-500">{event.coach}</div>
            <div className="text-gray-700">{event.type}</div>
            <div className="flex gap-2 text-sm text-gray-600">
              <span>{event.date}</span>
              <span>·</span>
              <span>{event.duration}</span>
            </div>
            <div className="mt-2 font-bold text-indigo-600">{event.price}</div>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">{t('events.bookNow')}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
