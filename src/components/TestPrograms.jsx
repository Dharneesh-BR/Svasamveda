import React, { useState } from 'react';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { t } from '../i18n';

const TestPrograms = () => {
  const [category, setCategory] = useState('mind');
  const { programs, loading, error, refetch } = useProgramsByCategory(category);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
        Loading programs for category: {category}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Error loading programs:</h3>
        <p className="mb-4">{error.message}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md text-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{t('programs.title')}</h2>
        <div className="flex space-x-4 mb-6">
          {['mind', 'body', 'soul'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-md ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          {programs.length} programs in "{category}" category:
        </h3>
        
        {programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((program) => (
              <div
                key={program._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {program.imageUrl && (
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h4 className="font-bold text-lg">{program.title}</h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {program.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">${program.price}</span>
                  <span className="text-sm text-gray-500">{program.duration}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic">No programs found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default TestPrograms;
