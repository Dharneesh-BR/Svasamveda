import { useSanityData } from './useSanityData';

export function useProgramsByCategory(category) {
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

  const { data: programs, loading, error } = useSanityData(query, { category });

  return { programs, loading, error };
}
