import { useEffect, useState, useCallback } from 'react';
import { client } from '../lib/sanity';

// Define valid categories to prevent invalid queries
const VALID_CATEGORIES = ['mind', 'body', 'soul'];

export function useProgramsByCategory(category) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = useCallback(async () => {
    if (!category || !VALID_CATEGORIES.includes(category)) {
      setError(new Error(`Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`));
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

      const data = await client.fetch(query, { category });
      
      // Only update state if component is still mounted
      setPrograms(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError(err);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      await fetchPrograms();
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