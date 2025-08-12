import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

export function useAllPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const query = `*[_type == "program"]{_id, title, description}`;

    console.log('Fetching all programs');

    client.fetch(query)
      .then(data => {
        console.log('Received programs:', data);
        setPrograms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching programs:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { programs, loading, error };
}
