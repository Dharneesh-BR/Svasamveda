import { useState, useEffect } from "react";
import { client } from "../lib/sanity";


export function useProgramsByCategory(category) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    // Universal GROQ query:
    //  - If category is a string field, matches directly.
    //  - If category is a reference, resolves and matches category->title.
    const query = `*[_type == "program" && (
      category == $category || category->title == $category
    )]{
      _id,
      title,
      description,
      // For string categories, just output it
      // For reference categories, resolve the title
      "category": coalesce(category->title, category),
      "imageUrl": image.asset->url,
      price,
      duration,
      "slug": slug.current
    } | order(title asc)`;

    client
      .fetch(query, { category })
      .then((data) => setPrograms(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [category]);

  return { programs, loading, error };
}
