import React from 'react';
import SessionCard from './SessionCard';

const SessionsGrid = () => {
  // Sample session data - replace with your actual data
  const sessions = [
    {
      id: 1,
      title: 'Morning Meditation',
      description: 'Start your day with a peaceful 20-minute guided meditation to set positive intentions.',
      price: 299,
      duration: 20,
      instructor: 'Priya Sharma',
      date: 'Mon, Wed, Fri',
      tags: ['Meditation', 'Morning', 'Beginners'],
      image: '/images/meditation.jpg'
    },
    {
      id: 2,
      title: 'Yoga for Stress Relief',
      description: 'Gentle yoga flow to release tension and calm the mind. Perfect for all levels.',
      price: 399,
      duration: 45,
      instructor: 'Rahul Verma',
      date: 'Tue, Thu',
      tags: ['Yoga', 'Stress Relief', 'All Levels'],
      image: '/images/yoga.jpg'
    },
    {
      id: 3,
      title: 'Breathwork Masterclass',
      description: 'Learn powerful breathing techniques to boost energy and reduce anxiety.',
      price: 499,
      duration: 60,
      instructor: 'Ananya Patel',
      date: 'Weekends',
      tags: ['Breathwork', 'Workshop', 'Advanced'],
      image: '/images/breathwork.jpg'
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionsGrid;
