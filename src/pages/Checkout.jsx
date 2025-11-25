// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { FaRegClock, FaRegUser } from 'react-icons/fa';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import AddressForm from '../components/AddressForm';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [selectedSession, setSelectedSession] = useState('session1');
  const [address, setAddress] = useState(null);
  const [isAddressFilled, setIsAddressFilled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load saved address if exists
  useEffect(() => {
    const loadAddress = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const addressDoc = await getDoc(doc(db, 'users', user.uid, 'address', 'default'));
          if (addressDoc.exists()) {
            setAddress(addressDoc.data());
            setIsAddressFilled(true);
          }
        } catch (error) {
          console.error('Error loading address:', error);
        }
      }
    };
    loadAddress();
  }, []);

  const handleAddressSubmit = (address) => {
    setAddress(address);
    setIsAddressFilled(true);
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = 0; // Assuming no tax for now
  const total = subtotal + tax;

  const handleCheckout = async () => {
    try {
      // Check if user is authenticated
      const user = auth.currentUser;
      
      if (!user) {
        // If not logged in, redirect to login page with return URL
        navigate('/login', { 
          state: { 
            from: location.pathname,
            message: 'Please log in to complete your purchase'
          } 
        });
        return;
      }

      // Check if address is filled
      if (!isAddressFilled) {
        alert('Please fill in your shipping address before checkout');
        return;
      }

      // If cart is empty, don't proceed
      if (cart.length === 0) {
        alert('Your cart is empty');
        return;
      }

      // Prepare order data
      const orderData = {
        amount: total * 100, // Convert to paise for Razorpay
        currency: 'INR',
        receipt: `order_rcpt_${Date.now()}`,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        selectedSession: selectedSession,
        shippingAddress: {
          ...address,
          timestamp: serverTimestamp()
        },
        status: 'pending',
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp()
      };

      // Call your backend API to create a Razorpay order
      const response = await axios.post('/.netlify/functions/create-razorpay-order', orderData);
      
      if (!response.data || !response.data.order) {
        throw new Error('Failed to create order');
      }

      const { order } = response.data;

      // Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'SoulSensei',
        description: 'Payment for your order',
        order_id: order.id,
        handler: async function(response) {
          try {
            // Verify payment on your server
            const verifyResponse = await axios.post('/.netlify/functions/verify-payment', {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              // Save order to Firestore
              await addDoc(collection(db, 'users', user.uid, 'orders'), {
                ...orderData,
                status: 'completed',
                paymentId: response.razorpay_payment_id,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              });
              
              // Clear cart on successful payment
              clearCart();
              
              // Redirect to success page
              navigate('/order-success', { 
                state: { 
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id
                } 
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
          contact: user.phoneNumber || ''
        },
        theme: {
          color: '#8B1F7A'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
          }
        }
      };

      // Open Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-12 h-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold">Your cart</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 pb-24">
        {!isAddressFilled ? (
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <AddressForm onSave={handleAddressSubmit} />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <button 
                onClick={() => setIsAddressFilled(false)}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                Edit Address
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{address.fullName}</p>
              <p className="text-gray-700">{address.address}</p>
              <p className="text-gray-700">{address.city}, {address.state} - {address.pincode}</p>
              <p className="text-gray-700">Phone: {address.phone}</p>
              {address.landmark && <p className="text-gray-500 text-sm">Landmark: {address.landmark}</p>}
            </div>
          </div>
        )}
        
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start p-4 border rounded-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                <img 
                  src={item.image || '/placeholder-program.jpg'} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <FaRegUser className="mr-1" />
                  <span>Taught by {item.instructor || 'SoulSensei'}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <FaRegClock className="mr-1" />
                  <span>Hosted live Nov 25, 07:00 PM</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-purple-700 font-bold">₹{item.price.toLocaleString()}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm font-medium flex items-center"
                  >
                    <FiTrash2 className="mr-1" />
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Session Section */}
        <div className="bg-purple-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-purple-900 text-lg mb-1">Your Journey Comes With A Gift</h3>
          <p className="text-purple-800 text-sm mb-6">Choose a free session to meet you where you are</p>
          
          {/* Free Session Cards */}
          <div className="space-y-4">
            {/* Session 1 */}
            <div 
              className={`bg-white rounded-xl p-4 relative cursor-pointer ${selectedSession === 'session1' ? 'border-2 border-purple-500' : 'border border-gray-200'}`}
              onClick={() => setSelectedSession('session1')}
            >
              {selectedSession === 'session1' && (
                <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                  <FiCheck className="text-white w-3 h-3" />
                </div>
              )}
              <div className="flex">
                <div className="w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-purple-600 text-2xl">🧘‍♀️</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full font-medium">Free</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Daily SoulSync</h4>
                  <p className="text-purple-800 text-xs font-medium">SOULSENSEI</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <FaRegClock className="mr-1" />
                    <span>Nov 24, 08:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Session 2 */}
            <div 
              className={`bg-white rounded-xl p-4 relative cursor-pointer ${selectedSession === 'session2' ? 'border-2 border-purple-500' : 'border border-gray-200'}`}
              onClick={() => setSelectedSession('session2')}
            >
              {selectedSession === 'session2' && (
                <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                  <FiCheck className="text-white w-3 h-3" />
                </div>
              )}
              <div className="flex">
                <div className="w-16 h-16 bg-purple-100 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-purple-600 text-2xl">🧘‍♀️</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full font-medium">Free</div>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Daily SoulSync</h4>
                  <p className="text-purple-800 text-xs font-medium">SOULSENSEI</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <FaRegClock className="mr-1" />
                    <span>Nov 26, 08:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="flex items-center justify-between p-4 border rounded-xl mb-6">
          <span className="text-gray-700">Do you have a coupon</span>
          <FiChevronRight className="text-gray-500" />
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">₹{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">₹{total.toLocaleString()}</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!isAddressFilled}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                isAddressFilled 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAddressFilled 
                ? `Proceed to Pay ₹${total.toFixed(2)}` 
                : 'Please add shipping address'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
