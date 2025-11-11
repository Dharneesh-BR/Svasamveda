import { useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Dashboard() {
  const user = auth.currentUser;
  const uid = user?.uid;

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!uid) return;
      setLoading(true);
      setError(null);
      try {
        const [ordersSnap, favSnap, enrollSnap] = await Promise.all([
          getDocs(query(collection(db, 'users', uid, 'orders'), orderBy('createdAt', 'desc'))),
          getDocs(collection(db, 'users', uid, 'favorites')),
          getDocs(collection(db, 'users', uid, 'enrollments')),
        ]);
        if (cancelled) return;
        setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setFavorites(favSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setEnrollments(enrollSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [uid]);

  const tabs = useMemo(() => ([
    { key: 'orders', label: 'Orders' },
    { key: 'courses', label: 'Courses' },
    { key: 'favorites', label: 'Favorites' },
  ]), []);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#8e6192]">My Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm">Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!</p>
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${activeTab === t.key ? 'bg-accent text-white border-accent' : 'bg-white text-main border-accent/30 hover:border-accent'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">Failed to load dashboard.</div>
        ) : (
          <div>
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-gray-600">No orders yet.</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl shadow p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-main">Order • {order.currency || 'INR'} {order.amount}</div>
                        <div className="text-xs text-gray-500">{order.status || 'paid'}</div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {order.items?.length || 0} item(s)
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4">
                {enrollments.length === 0 ? (
                  <p className="text-gray-600">No course enrollments yet.</p>
                ) : (
                  enrollments.map(en => (
                    <div key={en.id} className="bg-white rounded-xl shadow p-4">
                      <div className="font-semibold text-main">{en.title || en.slug || 'Course'}</div>
                      <div className="text-sm text-gray-600">Access: {en.access || 'lifetime'}</div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.length === 0 ? (
                  <p className="text-gray-600">No favorites yet.</p>
                ) : (
                  favorites.map(f => (
                    <div key={f.id} className="bg-white rounded-xl shadow p-4">
                      <div className="font-semibold text-main mb-1">{f.title || 'Item'}</div>
                      <div className="text-sm text-gray-600">{f.type || 'product'}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
