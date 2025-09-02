import { useEffect, useState, useCallback } from 'react';
import { client } from '../sanityClient';

export function useSanityData(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      console.log('Executing Sanity query:', query);
      console.log('With parameters:', params);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

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
  }, [query, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
