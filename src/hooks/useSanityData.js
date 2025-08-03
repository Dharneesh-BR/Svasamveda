import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

export function useSanityData(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Log the query and params for debugging
        console.log('Executing Sanity query:', query);
        console.log('With parameters:', params);
        
        // Add a timeout to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const result = await client.fetch(query, params, { signal: controller.signal });
        
        clearTimeout(timeoutId);
        
        if (!result) {
          throw new Error('No data returned from Sanity');
        }
        
        console.log('Sanity API response:', result);
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching data from Sanity:', {
          name: err.name,
          message: err.message,
          stack: err.stack,
          query,
          params,
          config: {
            projectId: client.config().projectId,
            dataset: client.config().dataset,
            apiVersion: client.config().apiVersion,
            useCdn: client.config().useCdn,
            withCredentials: client.config().withCredentials
          }
        });
        
        setError({
          message: err.message || 'Failed to fetch data from Sanity',
          details: {
            name: err.name,
            query,
            params,
            isNetworkError: err.name === 'AbortError' || !navigator.onLine
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Cleanup function to cancel any pending requests
    return () => {
      // Any cleanup if needed
    };
  }, [query, JSON.stringify(params)]);

  return { 
    data, 
    loading, 
    error,
    refetch: () => {
      // This would be used to retry the query if needed
      setLoading(true);
      setError(null);
      return fetchData();
    }
  };
}
