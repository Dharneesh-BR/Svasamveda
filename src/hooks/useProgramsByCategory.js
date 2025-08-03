import { useSanityData } from './useSanityData';

export function useProgramsByCategory(category) {
  // Validate the category parameter
  const validCategories = ['mind', 'body', 'soul'];
  const isValidCategory = validCategories.includes(category);
  
  const query = `*[_type == "program" && category == $category] {
    _id,
    title,
    description,
    category,
    "imageUrl": image.asset->url,
    price,
    duration,
    "slug": slug.current
  } | order(title asc)`;

  const { 
    data: programs, 
    loading, 
    error,
    refetch 
  } = useSanityData(query, { category });

  // If the category is invalid, return an error immediately
  if (!isValidCategory) {
    return {
      programs: [],
      loading: false,
      error: {
        message: `Invalid category: ${category}. Must be one of: ${validCategories.join(', ')}`,
        isInvalidCategory: true
      },
      refetch: () => Promise.resolve([])
    };
  }

  // Return the data with the refetch function
  return { 
    programs: programs || [], 
    loading, 
    error,
    refetch
  };
}
