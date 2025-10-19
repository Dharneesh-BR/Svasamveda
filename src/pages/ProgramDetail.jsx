import React, { useState, useEffect } from 'react';
import { StarIcon, CheckIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import { client, getProgramBySlug } from '../sanityClient';
import { useCart } from '../contexts/CartContext';
import { PortableText } from '@portabletext/react';

function ProgramDetail() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log('ProgramDetail mounted with slug:', slug);
    
    if (!slug) {
      const errorMsg = 'No program selected. Please select a program from the programs page.';
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    const fetchProgram = async () => {
      console.log('Starting to fetch program with slug:', slug);
      setLoading(true);
      setError(null);
      
      try {
        // First try to get by slug
        let result = await getProgramBySlug(slug);
        
        // If no result, try to get by _id (fallback for programs without slugs)
        if (!result && slug.length === 36) { // Check if it might be a UUID
          console.log('No program found with slug, trying to fetch by ID:', slug);
          result = await getProgramById(slug);
        }
        
        if (!result) {
          throw new Error('Program not found. It may have been moved or deleted.');
        }
        
        // Process the body content to ensure it's in the correct format
        let processedBody = [];
        if (result.body) {
          if (Array.isArray(result.body)) {
            processedBody = result.body;
          } else if (typeof result.body === 'object' && result.body !== null) {
            processedBody = [result.body];
          }
        }

        const programData = {
          id: result._id,
          _id: result._id, // Keep original _id for consistency
          title: result.title || 'Untitled Program',
          description: result.description, // Make sure description is included
          body: processedBody, // Use processed body
          hasImage: !!(result.image || result.imageUrl),
          imageUrl: result.image?.url || result.imageUrl,
          price: result.price,
          includes: Array.isArray(result.includes) ? result.includes : [],
          benefits: Array.isArray(result.benefits) ? result.benefits : [],
          requirements: Array.isArray(result.requirements) ? result.requirements : [],
          slug: result.slug || result._id, // Fallback to _id if no slug
          category: result.category || 'uncategorized',
          instructor: result.instructor // Include instructor if available
        };

        
        if (!programData.id) {
          throw new Error('Invalid program data: missing _id');
        }
        
        // Update URL if we're using a fallback ID
        if (!result.slug && result._id) {
          window.history.replaceState({}, '', `/programs/${result._id}`);
        }
        
        setProgram(programData);
      } catch (err) {
        const errorMsg = `Failed to load program: ${err.message}`;
        console.error('Error in fetchProgram:', {
          error: err,
          message: err.message,
          stack: err.stack,
          slug
        });
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram().catch(err => {
      console.error('Unhandled error in fetchProgram:', err);
      setError('An unexpected error occurred while loading the program');
      setLoading(false);
    });
  }, [slug]);

  const handleAddToCart = () => {
    addToCart({
      id: program._id,
      name: program.title,
      price: program.price,
      image: program.imageUrl,
      quantity,
      slug: program.slug
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-32 md:pb-24 pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-main text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Program not found</h2>
          <p className="text-gray-600 mb-4">The program you're looking for doesn't exist or has been removed.</p>
          <a
            href="/programs"
            className="inline-block px-6 py-2 bg-main text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Browse Programs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Program Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{program.title}</h1>
          <div className="flex items-center text-gray-600">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-main mr-3">
              {program.category}
            </span>
            <span className="text-gray-500">{program.duration}</span>
          </div>
        </div>

        {/* Program Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src={program.imageUrl || '/placeholder-program.jpg'}
            alt={program.title}
            className="w-full h-auto max-h-[500px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Program Description */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Program</h2>
          
          {program.body && program.body.length > 0 ? (
            <div className="prose max-w-none">
              <PortableText
                value={program.body}
                components={{
                  block: {
                    normal: ({ children }) => <p className="mb-4">{children}</p>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold mt-5 mb-2">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-base font-medium mt-4 mb-2">{children}</h4>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({ children }) => <li className="mb-1">{children}</li>,
                    number: ({ children }) => <li className="mb-1">{children}</li>,
                  },
                  marks: {
                    link: ({ value, children }) => {
                      const href = value?.href || '';
                      const isExternal = href.startsWith('http');
                      return (
                        <a 
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="text-main hover:underline"
                        >
                          {children}
                        </a>
                      );
                    },
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    underline: ({ children }) => <u>{children}</u>,
                    code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
                  },
                  types: {
                    image: ({ value }) => (
                      <div className="my-4">
                        <img 
                          src={value.asset?.url} 
                          alt={value.alt || 'Image'} 
                          className="max-w-full h-auto rounded-lg"
                        />
                        {value.caption && (
                          <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>
                        )}
                      </div>
                    ),
                  },
                }}
                onMissingComponent={(message, options) => {
                  console.warn('PortableText missing component:', { message, options });
                  return <div className="text-yellow-600 my-2">[Content could not be displayed]</div>;
                }}
              />
              
            </div>
          ) : program.description ? (
            <div className="prose max-w-none">
              <p className="text-gray-700">{program.description}</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-500">No description available for this program.</p>
            </div>
          )}
        </div>

        {/* Instructor Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src={program.instructor?.image || '/placeholder-avatar.jpg'} 
                alt={program.instructor?.name || 'Instructor'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {program.instructor?.name || 'Expert Instructor'}
              </h3>
              <p className="text-main font-medium mb-3">
                {program.instructor?.title || 'Certified Instructor'}
              </p>
              <p className="text-gray-600">
                {program.instructor?.bio || 'Our instructor has years of experience in this field and is dedicated to helping you achieve your goals.'}
              </p>
              
              {program.requirements?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {program.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <XMarkIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enrollment Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mt-12 border-t-4 border-main">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ready to get started?</h2>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold text-main">
                  ₹{program.price?.toLocaleString() || 'Free'}
                </span>
                {program.originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{program.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="ml-2 text-gray-600">• {program.duration || 'Lifetime access'}</span>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-main hover:bg-main-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Programs */}
        {program.category && program._id && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <RelatedPrograms 
              category={program.category} 
              currentProgramId={program._id} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Related Programs Component
function RelatedPrograms({ currentProgramId, category }) {
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedPrograms = async () => {
      if (!category || !currentProgramId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const query = `*[_type == "program" && category == $category && _id != $currentProgramId][0...3]{
          _id,
          title,
          price,
          duration,
          "imageUrl": image.asset->url,
          "slug": slug.current,
        }`;
        
        const result = await client.fetch(query, { 
          category, 
          currentProgramId 
        });
        
        setRelatedPrograms(result || []);
      } catch (err) {
        console.error('Error fetching related programs:', err);
        setError('Failed to load related programs');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPrograms();
  }, [category, currentProgramId]);

  if (loading) {
    return <div className="flex justify-center py-8">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <XMarkIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (relatedPrograms.length === 0) {
    return null; // Don't show the section if no related programs
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPrograms.map((program) => (
        <div key={program._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <a href={`/programs/${program.slug || program._id}`} className="block group">
            <div className="relative overflow-hidden h-48">
              <img
                src={program.imageUrl || '/placeholder-program.jpg'}
                alt={program.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-main transition-colors">
                {program.title}
              </h3>
              {program.duration && (
                <p className="text-gray-500 text-sm mb-2">{program.duration}</p>
              )}
              {program.price && (
                <p className="text-lg font-bold text-main">₹{program.price.toLocaleString()}</p>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ProgramDetail;
