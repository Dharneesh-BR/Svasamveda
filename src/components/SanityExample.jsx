import { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

export default function SanityExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch("*[_type == 'post']{_id, title, body}")
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching from Sanity');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading from Sanity...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Sanity Posts Example</h2>
      {posts.length === 0 ? (
        <div>No posts found in Sanity CMS.</div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-6 p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <div className="text-gray-700">{post.body}</div>
          </div>
        ))
      )}
    </div>
  );
}
