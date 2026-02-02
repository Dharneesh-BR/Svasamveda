import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production1',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21',
  useCdn: false, // Disable CDN for development to avoid CORS issues
  perspective: 'published', // Use published content
  // Add CORS headers configuration
  withCredentials: false,
  // token is removed since it's not needed for read operations
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

// Helper function to get all programs
export const getAllPrograms = async () => {
  const query = `*[_type == "program"]{
    _id,
    title,
    description,
    price,
    discountPrice,
    duration,
    category,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    includes,
    benefits,
    requirements
  }`;
  
  return await client.fetch(query);
};

// Helper function to get a single program by slug
export const getProgramBySlug = async (slug) => {
  console.log('getProgramBySlug called with slug:', slug);
  
  if (!slug) {
    console.error('No slug provided to getProgramBySlug');
    return null;
  }
  
  try {
    const query = `*[_type == "program" && slug.current == $slug][0]{
      _id,
      title,
      description,
      price,
      discountPrice,
      duration,
      category,
      "image": image.asset->{
        url,
        alt
      },
      "slug": slug.current,
      includes,
      benefits,
      requirements,
      body[]{
        ...select(
          _type == 'block' => @{
            ...@,
            children[]{
              ...@,
              marks[]
            },
            markDefs[]{
              ...@,
              _type == 'link' => @{
                _key,
                _type,
                href,
                blank
              }
            }
          },
          @
        )
      },
      "instructor": instructor->{
        name,
        title,
        bio,
        "image": image.asset->url
      }
    }`;
    
    console.log('Executing Sanity query with slug:', slug);
    const result = await client.fetch(query, { slug });
    console.log('Sanity query result for slug:', slug, result);
    
    if (!result) {
      console.log('No program found for slug:', slug);
      // Try to find all programs to see what slugs exist
      const allPrograms = await client.fetch(`*[_type == "program"]{ "slug": slug.current }`);
      console.log('All available program slugs:', allPrograms.map(p => p.slug));
    }
    
    return result;
  } catch (error) {
    console.error('Error in getProgramBySlug for slug:', slug, {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// Helper function to get a program by ID
export const getProgramById = async (id) => {
  console.log('getProgramById called with id:', id);
  
  if (!id) {
    console.error('No ID provided to getProgramById');
    return null;
  }
  
  try {
    const query = `*[_type == "program" && _id == $id][0]{
      _id,
      title,
      description,
      price,
      discountPrice,
      duration,
      category,
      "image": image.asset->{
        url,
        alt
      },
      "slug": slug.current,
      includes,
      benefits,
      requirements,
      body[]{
        ...select(
          _type == 'block' => @{
            ...@,
            children[]{
              ...@,
              marks[]
            },
            markDefs[]{
              ...@,
              _type == 'link' => @{
                _key,
                _type,
                href,
                blank
              }
            }
          },
          @
        )
      },
      "instructor": instructor->{
        name,
        title,
        bio,
        "image": image.asset->url
      }
    }`;
    
    console.log('Executing Sanity query with ID:', id);
    const result = await client.fetch(query, { id });
    console.log('Sanity query result for ID:', id, result);
    
    return result;
  } catch (error) {
    console.error('Error in getProgramById for ID:', id, {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// Helper function to get programs by category
export const getProgramsByCategory = async (category) => {
  const query = `*[_type == "program" && category == $category]{
    _id,
    title,
    description,
    price,
    duration,
    "imageUrl": image.asset->url,
    "slug": slug.current,
  }`;
  
  return await client.fetch(query, { category });
};
