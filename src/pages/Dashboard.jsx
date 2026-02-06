import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import AddressForm from '../components/AddressForm';
import { collection, doc, getDoc, getDocs, query, orderBy, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiBookOpen, FiHeart, FiArrowRight, FiTrash2, FiPlus } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();
  const uid = user?.uid;
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(null);
  const [profileAddressFallback, setProfileAddressFallback] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatAddress = (data) => {
    if (!data) return '';
    const lines = [];
    if (data.fullName) lines.push(data.fullName);
    if (data.address) lines.push(data.address);
    const cityStatePin = [data.city, data.state].filter(Boolean).join(', ');
    const pin = data.pincode ? ` - ${data.pincode}` : '';
    if (cityStatePin || pin) lines.push(`${cityStatePin}${pin}`.trim());
    if (data.phone) lines.push(`Phone: ${data.phone}`);
    if (data.landmark) lines.push(`Landmark: ${data.landmark}`);
    return lines.filter(Boolean).join('\n');
  };

  // Remove all enrollments function
  const handleClearAllEnrollments = async () => {
    if (!user?.uid) {
      alert('Please log in first');
      return;
    }

    if (!confirm('Are you sure you want to remove all enrollments from your account? This action cannot be undone.')) {
      return;
    }

    try {
      const enrollmentsRef = collection(db, 'users', user.uid, 'enrollments');
      const enrollmentsSnap = await getDocs(enrollmentsRef);
      
      if (enrollmentsSnap.docs.length > 0) {
        for (const doc of enrollmentsSnap.docs) {
          await deleteDoc(doc.ref);
        }
        
        // Refresh enrollments data
        const refreshedSnap = await getDocs(enrollmentsRef);
        setEnrollments([]);
        
        alert(`Successfully removed ${enrollmentsSnap.docs.length} enrollment(s)!`);
      } else {
        alert('No enrollments found to remove.');
      }
      
    } catch (error) {
      console.error('Error clearing enrollments:', error);
      alert('Error clearing enrollments: ' + error.message);
    }
  };

  // Remove test order function
  const handleRemoveTestOrder = async () => {
    if (!user?.uid) {
      alert('Please log in first');
      return;
    }

    if (!confirm('Are you sure you want to remove all test orders?')) {
      return;
    }

    try {
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const ordersSnap = await getDocs(query(ordersRef, orderBy('createdAt', 'desc')));
      
      // Find test orders
      const testOrders = [];
      ordersSnap.docs.forEach((doc) => {
        const data = doc.data();
        if (data.orderId && data.orderId.startsWith('TEST_')) {
          testOrders.push({ id: doc.id, orderId: data.orderId });
        }
        if (data.paymentId && data.paymentId.startsWith('TEST_PAYMENT_')) {
          testOrders.push({ id: doc.id, paymentId: data.paymentId });
        }
        if (data.razorpayOrderId && data.razorpayOrderId.startsWith('TEST_RAZOR_')) {
          testOrders.push({ id: doc.id, razorpayOrderId: data.razorpayOrderId });
        }
      });

      if (testOrders.length > 0) {
        for (const testOrder of testOrders) {
          await deleteDoc(doc(db, 'users', user.uid, 'orders', testOrder.id));
        }
        
        // Refresh orders data
        const refreshedOrdersSnap = await getDocs(query(ordersRef, orderBy('createdAt', 'desc')));
        const ordersData = refreshedOrdersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setOrders(ordersData);
        
        alert(`Successfully removed ${testOrders.length} test order(s)!`);
      } else {
        alert('No test orders found to remove.');
      }
      
    } catch (error) {
      console.error('Error removing test orders:', error);
      alert('Error removing test orders: ' + error.message);
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!uid) {
        setAddress(null);
        setProfileAddressFallback('');
        setOrders([]);
        setFavorites([]);
        setEnrollments([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [ordersSnap, favSnap, enrollSnap, addressSnap, userSnap] = await Promise.all([
          getDocs(query(collection(db, 'users', uid, 'orders'), orderBy('createdAt', 'desc'))),
          getDocs(collection(db, 'users', uid, 'favorites')),
          getDocs(collection(db, 'users', uid, 'enrollments')),
          getDoc(doc(db, 'users', uid, 'addresses', 'default')),
          getDoc(doc(db, 'users', uid)),
        ]);
        if (cancelled) return;
        
        const ordersData = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setOrders(ordersData);
        setFavorites(favSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setEnrollments(enrollSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setAddress(addressSnap.exists() ? addressSnap.data() : null);
        const fallback = userSnap.exists() ? (userSnap.data()?.address || '') : '';
        setProfileAddressFallback(fallback);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [uid]);

  // If we're in a nested route, render the outlet
  if (location.pathname !== '/dashboard') {
    return <Outlet context={{ orders, favorites, enrollments, loading, error }} />;
  }

  // Main dashboard landing page
  return (
    <div className="min-h-screen bg-background/80">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#8e6192]">My Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm">Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">Error loading dashboard data. Please try again later.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Show clear enrollments button if enrollments exist */}
            {enrollments.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <button
                  onClick={handleClearAllEnrollments}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Clear All Enrollments ({enrollments.length})
                </button>
                <p className="text-sm text-red-800 mt-2">
                  Found {enrollments.length} enrollment(s). Click to remove them all.
                </p>
              </div>
            )}

            {/* Show remove test order button if test orders exist */}
            {orders.some(order => 
              (order.orderId && order.orderId.startsWith('TEST_')) ||
              (order.paymentId && order.paymentId.startsWith('TEST_PAYMENT_')) ||
              (order.razorpayOrderId && order.razorpayOrderId.startsWith('TEST_RAZOR_'))
            ) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <button
                  onClick={handleRemoveTestOrder}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Remove Test Orders
                </button>
                <p className="text-sm text-red-800 mt-2">
                  Test wellness program detected. Click to remove test orders.
                </p>
              </div>
            )}

            <div className="svasam-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-medium text-gray-900">Address</h3>
                  {!isEditingAddress ? (
                    <p className="mt-1 text-sm text-gray-600 whitespace-pre-line break-words">
                      {address ? formatAddress(address) : (profileAddressFallback ? profileAddressFallback : 'No address saved yet.')}
                    </p>
                  ) : (
                    <div className="mt-2">
                      <AddressForm
                        initialData={address || {}}
                        onSave={(addressData) => {
                          setAddress(addressData);
                          setIsEditingAddress(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  {!isEditingAddress ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingAddress(true);
                      }}
                      className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition text-sm"
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingAddress(false);
                        }}
                        className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders Card */}
            <div 
              onClick={() => navigate('/dashboard/orders')}
              className="svasam-card svasam-card-hover p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">My Orders</h3>
                  <p className="mt-1 text-sm text-gray-500">Track and manage your orders</p>
                </div>
                <FiShoppingBag className="h-8 w-8 text-main" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                <p className="mt-1 text-sm text-gray-500">Total orders</p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-main">
                View all orders <FiArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            {/* Courses Card */}
            <div 
              onClick={() => navigate('/dashboard/courses')}
              className="svasam-card svasam-card-hover p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">My Courses</h3>
                  <p className="mt-1 text-sm text-gray-500">Continue learning</p>
                </div>
                <FiBookOpen className="h-8 w-8 text-main" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
                <p className="mt-1 text-sm text-gray-500">Enrolled courses</p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-main">
                View all courses <FiArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            {/* Favorites Card */}
            <div 
              onClick={() => navigate('/dashboard/favorites')}
              className="svasam-card svasam-card-hover p-6 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">My Favorites</h3>
                  <p className="mt-1 text-sm text-gray-500">Your saved items</p>
                </div>
                <FiHeart className="h-8 w-8 text-main" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                <p className="mt-1 text-sm text-gray-500">Saved items</p>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-main">
                View favorites <FiArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
