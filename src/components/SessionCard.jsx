import React from 'react';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';

const SessionCard = ({ session }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-[480px] flex flex-col hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Card Header with Image */}
      <div className="relative h-[200px] w-full bg-gray-100">
        <img 
          src={session.image || '/placeholder-session.jpg'} 
          alt={session.title}
          className="h-[200px] w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-main/80 to-transparent opacity-70"></div>
        
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {session.tags?.map((tag, index) => (
            <span 
              key={index}
              className="bg-white/90 text-xs px-2 py-1 rounded-full text-main font-medium whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2">
              {session.title}
            </h3>
            <span className="bg-main/10 text-main text-sm font-bold px-2 py-1 rounded whitespace-nowrap flex-shrink-0 ml-2">
              ₹{session.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 min-h-[3.5rem]">
            {session.description}
          </p>
        </div>

        {/* Session Details */}
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <div className="flex items-center space-x-1 min-w-0">
              <FiUser className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{session.instructor}</span>
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
    </div>
  );
};

export default SessionCard;
