import React from 'react';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';

const SessionCard = ({ session }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Card Header with Image */}
      <div className="relative h-40 bg-gray-100">
        <img 
          src={session.image || '/placeholder-session.jpg'} 
          alt={session.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-main/80 to-transparent opacity-70"></div>
        
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {session.tags?.map((tag, index) => (
            <span 
              key={index}
              className="bg-white/90 text-xs px-2 py-1 rounded-full text-main font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 h-12">
            {session.title}
          </h3>
          <span className="bg-main/10 text-main text-sm font-bold px-2 py-1 rounded whitespace-nowrap">
            ₹{session.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 h-10 mb-3">
          {session.description}
        </p>

        {/* Session Details */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center space-x-1">
            <FiUser className="w-3.5 h-3.5" />
            <span>{session.instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{session.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>{session.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
