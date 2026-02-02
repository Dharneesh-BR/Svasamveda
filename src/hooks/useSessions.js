import { useEffect, useState } from 'react';
import { client } from '../sanityClient';

// Fetches sessions from Sanity
// Schema: session { title, description, mediaType ('audio'|'video'), file (type: file), thumbnail (type: image) }
// Returns list with: _id, title, description, mediaType, fileUrl, thumbnail
export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSessions() {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "session"] | order(_createdAt desc) {
          _id,
          title,
          shortDescription,
          mediaType,
          tags,
          // dereference file asset url
          "fileUrl": file.asset->url,
          // dereference thumbnail asset url
          "thumbnail": thumbnail.asset->url
        }`;
        const data = await client.fetch(query);
        if (!cancelled) {
          setSessions(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSessions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { sessions, loading, error };
}
