import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

export function useStoreItems(category = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        
        // Build the GROQ query based on whether a category is specified
        const query = category 
          ? `*[_type == "storeItem" && "${category}" in categories[]->title] {
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

        const result = await client.fetch(query);
        setItems(result);
      } catch (err) {
        console.error('Error fetching store items:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  return { items, loading, error };
}
