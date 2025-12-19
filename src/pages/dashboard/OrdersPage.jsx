import { useEffect, useState } from 'react';
import { FiPackage, FiClock, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const OrderCard = ({ order }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Processing
          </span>
        );
    }
  };

  return (
    <div className="svasam-card svasam-card-hover p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
        {getStatusBadge(order.status)}
      </div>
      <div className="space-y-2">
        {(order.items || []).map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={item.image || item.imageUrl || '/placeholder-program.jpg'}
                alt={item.name || 'Item'}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.name || item.title || 'Item'}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                ₹{Number(item.price || 0).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <p className="text-sm text-gray-500">Ordered on {order.date}</p>
        <p className="text-sm font-medium text-gray-900">
          Total: ₹{order.total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user?.uid) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const ordersRef = collection(db, 'users', user.uid, 'orders');
        const ordersSnap = await getDocs(query(ordersRef, orderBy('createdAt', 'desc')));
        if (cancelled) return;

        const mapped = ordersSnap.docs.map((d) => {
          const data = d.data() || {};
          const createdAt = data.createdAt;
          const createdDate = createdAt?.toDate ? createdAt.toDate() : createdAt ? new Date(createdAt) : null;
          const dateStr = createdDate ? createdDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '-';

          return {
            id: data.orderId || data.id || d.id,
            status: data.status || 'processing',
            date: dateStr,
            total: Number(data.total || data.amount || 0),
            items: Array.isArray(data.items) ? data.items : Array.isArray(data.cartItems) ? data.cartItems : [],
          };
        });

        setOrders(mapped);
      } catch (e) {
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading your orders...</div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiPackage className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-main text-white rounded-md hover:bg-main/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
