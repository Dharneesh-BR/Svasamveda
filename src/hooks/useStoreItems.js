import { useEffect, useState, useCallback } from 'react';
import { client } from '../sanityClient';

export function useStoreItems(category = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = category 
    ? `*[_type == "storeItem" && $category in categories[]->title] {
        _id,
        title,
        description,
        shortDescription,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        price,
        compareAtPrice,
        "categories": categories[]->title,
        stock,
        "images": images[].asset->url
      } | order(_createdAt desc)`
    : `*[_type == "storeItem"] {
        _id,
        title,
        description,
        shortDescription,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        price,
        compareAtPrice,
        "categories": categories[]->title,
        stock,
        "images": images[].asset->url
      } | order(_createdAt desc)`;

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const result = await client.fetch(query, category ? { category } : {});
      setItems(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching store items:', err);
      setError({
        message: err.message || 'Unknown error',
        isNetworkError: err.name === 'AbortError' || !navigator.onLine
      });
    } finally {
      setLoading(false);
    }
  }, [query, category]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
}
