import { useEffect, useState, useCallback } from 'react';
import { client } from '../sanityClient';

export function useStoreItems(category = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const vars = {};

      // Accept either title (e.g., 'Rudraksha') or slug (e.g., 'rudraksha')
      const isSlug = typeof category === 'string' && category === category?.toLowerCase();
      const catSlug = category ? (isSlug ? category : category.toLowerCase()) : null;
      const catTitle = category ? (isSlug ? category.charAt(0).toUpperCase() + category.slice(1) : category) : null;

      // New 'store' schema (category stored as slug)
      let qStore = `*[_type == "store"`;
      if (catSlug) {
        qStore += ` && category == $catSlug`;
        vars.catSlug = catSlug;
      }
      qStore += `] {
        _id,
        title,
        description,
        "shortDescription": coalesce(shortDescription, description),
        "slug": slug.current,
        "imageUrl": coalesce(images[0].asset->url, images.asset->url[0]),
        price,
        "categories": [category],
        "stock": select(inStock == true => 1, inStock == false => 0, 1),
        "images": images[].asset->url
      } | order(_createdAt desc)`;

      // Legacy 'storeItem' schema (categories referenced by title)
      let qLegacy = `*[_type == "storeItem"`;
      if (catTitle) {
        qLegacy += ` && $legacyCat in categories[]->title`;
        vars.legacyCat = catTitle;
      }
      qLegacy += `] {
        _id,
        title,
        description,
        shortDescription,
        "slug": slug.current,
        "imageUrl": coalesce(mainImage.asset->url, images[0].asset->url),
        price,
        compareAtPrice,
        "categories": categories[]->title,
        stock,
        "images": images[].asset->url
      } | order(_createdAt desc)`;

      const [storeDocs, legacyDocs] = await Promise.all([
        client.fetch(qStore, vars),
        client.fetch(qLegacy, vars),
      ]);

      setItems([...(storeDocs || []), ...(legacyDocs || [])]);
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
  }, [category]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
}

