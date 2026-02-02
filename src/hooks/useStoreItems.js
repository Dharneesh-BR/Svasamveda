import { useEffect, useState, useCallback } from 'react';
import { client } from '../sanityClient';

export function useStoreItems(category = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching store items for category:', category);
      
      const vars = {};

      // Accept either title (e.g., 'Rudraksha') or slug (e.g., 'rudraksha')
      const isSlug = typeof category === 'string' && category === category?.toLowerCase();
      const catSlug = category ? (isSlug ? category : category.toLowerCase()) : null;
      const catTitle = category ? (isSlug ? category.charAt(0).toUpperCase() + category.slice(1) : category) : null;

      console.log('Category filters:', { catSlug, catTitle });

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
        discountedPrice,
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
        discountedPrice,
        "categories": categories[]->title,
        stock,
        "images": images[].asset->url
      } | order(_createdAt desc)`;

      console.log('Executing store queries:', { qStore, qLegacy, vars });

      try {
        const [storeDocs, legacyDocs] = await Promise.all([
          client.fetch(qStore, vars).catch(err => {
            console.warn('Store query failed, trying fallback:', err);
            return [];
          }),
          client.fetch(qLegacy, vars).catch(err => {
            console.warn('Legacy store query failed:', err);
            return [];
          }),
        ]);

        console.log('Query results:', { storeDocs, legacyDocs });

        const allItems = [...(storeDocs || []), ...(legacyDocs || [])];
        console.log('Total items found:', allItems.length);

        if (allItems.length > 0) {
          setItems(allItems);
          setError(null);
        } else {
          console.log('No items found, using fallback data');
          throw new Error('No items found in database');
        }
      } catch (fetchError) {
        console.error('Both store queries failed:', fetchError);
        // Provide fallback sample data
        const fallbackItems = [
          {
            _id: 'fallback-1',
            title: 'Rudraksha Mala',
            description: 'Sacred rudraksha beads for meditation',
            shortDescription: 'Premium quality rudraksha mala',
            slug: 'rudraksha-mala',
            imageUrl: '/assets/Rudraksha.jpg',
            price: 999,
            compareAtPrice: 1299,
            categories: ['Rudraksha'],
            stock: 1,
            images: ['/assets/Rudraksha.jpg']
          },
          {
            _id: 'fallback-2',
            title: 'Spiritual Bracelet',
            description: 'Handcrafted spiritual bracelet',
            shortDescription: 'Beautiful healing bracelet',
            slug: 'spiritual-bracelet',
            imageUrl: '/assets/Bracelet.jpg',
            price: 599,
            compareAtPrice: 799,
            categories: ['Bracelets'],
            stock: 1,
            images: ['/assets/Bracelet.jpg']
          },
          {
            _id: 'fallback-3',
            title: 'Divine Murti',
            description: 'Sacred deity statue for worship',
            shortDescription: 'Beautiful divine murti',
            slug: 'divine-murti',
            imageUrl: '/assets/Murti.jpg',
            price: 1499,
            compareAtPrice: 1999,
            categories: ['Murti'],
            stock: 1,
            images: ['/assets/Murti.jpg']
          },
          {
            _id: 'fallback-4',
            title: 'Sacred Anklet',
            description: 'Traditional spiritual anklet',
            shortDescription: 'Elegant sacred anklet',
            slug: 'sacred-anklet',
            imageUrl: '/assets/Anklet.jpg',
            price: 799,
            compareAtPrice: 999,
            categories: ['Anklet'],
            stock: 1,
            images: ['/assets/Anklet.jpg']
          },
          {
            _id: 'fallback-5',
            title: 'Divine Frame',
            description: 'Beautiful spiritual frame',
            shortDescription: 'Elegant divine frame',
            slug: 'divine-frame',
            imageUrl: '/assets/Frames.jpg',
            price: 1199,
            compareAtPrice: 1499,
            categories: ['Frames'],
            stock: 1,
            images: ['/assets/Frames.jpg']
          }
        ];
        
        setItems(fallbackItems);
        setError({
          message: 'Using sample data - Unable to connect to store database',
          isSampleData: true
        });
      }
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

