import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

export function useProgramsByCategory(category) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    // This query works for both string & reference category fields
    const query = `
      *[_type == "program" &&
        (category == $category || category._ref in *[_type == "category" && title == $category]._id)
      ]{
        _id,
        title,
        description,
        "category": category->title
      }
    `;

    client.fetch(query, { category })
      .then(data => {
        setPrograms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching programs:', err);
        setError(err);
        setLoading(false);
      });
  }, [category]);

  return { programs, loading, error };
}
