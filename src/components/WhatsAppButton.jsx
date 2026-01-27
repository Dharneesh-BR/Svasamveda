import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '917019557979';
  const message = encodeURIComponent('Hi Svasam Wellness! I would like to know more about your wellness programs.');
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg 
        className="w-6 h-6" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.048-.673.076-.197.124-.38.345-.449.637-.069.291-.099.617-.099.967 0 .345.03.693.099 1.037.069.344.03.693-.099 1.037-.069.292-.252.513-.449.637-.202.124-.4.174-.673.076-.272-.099-1.733-.818-2.03-.967-.297-.149-.568-.223-.818-.223-.25 0-.521.074-.818.223-.297.149-1.733.818-2.03.967-.272.099-.471.048-.673-.076-.197-.124-.38-.345-.449-.637-.069-.291-.099-.617-.099-.967 0-.345.03-.693.099-1.037.069-.344.03-.693.099-1.037.069-.292.252-.513.449-.637.202-.124.4-.174.673-.076z"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
        Chat with us on WhatsApp
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
