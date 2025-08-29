import { useEffect, useState, useCallback } from 'react';
import { client } from '../lib/sanity';

// Define valid categories to prevent invalid queries
const VALID_CATEGORIES = ['mind', 'body', 'soul'];

/**
 * Custom hook to fetch programs by category from Sanity
 * @param {string} category - The category to filter programs by
 * @returns {Object} - { programs, loading, error, refetch }
 */
export function useProgramsByCategory(category) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = useCallback(async () => {
    // Skip if no category is provided
    if (!category) {
      setPrograms([]);
      setLoading(false);
      return;
    }

    // Validate category
    if (!VALID_CATEGORIES.includes(category)) {
      const errorMsg = `Invalid category: ${category}. Must be one of: ${VALID_CATEGORIES.join(', ')}`;
      console.error(errorMsg);
      setError(new Error(errorMsg));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
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

      if (import.meta.env.DEV) {
        console.log('Fetching programs for category:', category);
      }

      const data = await client.fetch(query, { category });
      
      if (import.meta.env.DEV) {
        console.log(`Fetched ${data?.length || 0} programs for category:`, category);
      }

      setPrograms(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching programs:', {
        error: err.message,
        category,
        timestamp: new Date().toISOString()
      });
      setError(err);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  // Fetch programs when category changes
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        await fetchPrograms();
      } catch (err) {
        if (isMounted) {
          console.error('Error in loadData:', err);
          setError(err);
          setLoading(false);
        }
      }
    };

    if (category) {
      loadData();
    } else {
      setPrograms([]);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [category, fetchPrograms]);

  return { 
    programs, 
    loading, 
    error,
    // Add a refetch function in case the consumer needs to refresh the data
    refetch: fetchPrograms 
  };
}
