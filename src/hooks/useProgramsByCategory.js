import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

export function useProgramsByCategory(category) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const query = `*[_type == "program" && category == $category]{
      _id,
      title,
      description,
      category,
      "imageUrl": image.asset->url,
      price,
      duration,
      "slug": slug.current
    } | order(title asc)`;

    client
      .fetch(query, { category })
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching programs:', err);
        setError(err);
        setLoading(false);
      });
  }, [category]);

  return { programs, loading, error };
}
