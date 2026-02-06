// src/pages/Checkout.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiChevronRight, FiTrash2, FiEdit } from 'react-icons/fi';
import { FaRegClock, FaRegUser, FaMapMarkerAlt } from 'react-icons/fa';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import AddressForm from '../components/AddressForm';

// Razorpay will be available globally when the script loads


const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [selectedSession, setSelectedSession] = useState('session1');
  const [address, setAddress] = useState(null);
  const [isAddressFilled, setIsAddressFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load saved address if exists
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAddress(null);
        setIsAddressFilled(false);
        setIsLoading(false);
        return;
      }

      try {
        const addressDoc = await getDoc(doc(db, 'users', user.uid, 'addresses', 'default'));
        if (addressDoc.exists()) {
          setAddress(addressDoc.data());
          setIsAddressFilled(true);
        }
      } catch (error) {
        console.error('Error loading address:', error);
        setError('Failed to load address. Please try again.');
      } finally {
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddressSubmit = (addressData) => {
    setAddress(addressData);
    setIsAddressFilled(true);
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = 0; // Assuming no tax for now
  const total = subtotal + tax;

  // Load Razorpay script
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  const handleCheckout = async () => {
    if (!isAddressFilled) {
      setError('Please fill in your shipping address before checkout');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      // Load Razorpay script if not already loaded
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error('Failed to load payment processor. Please try again later.');
      }

      const user = auth.currentUser;
      if (!user) {
        navigate('/login', { 
          state: { 
            from: location.pathname,
            message: 'Please log in to complete your purchase'
          } 
        });
        return;
      }

      // Cart-based checkout (existing logic)
      if (cart.length === 0) {
        setError('Your cart is empty');
        return;
      }
      
      try {
        if (!window.Razorpay) {
          throw new Error('Razorpay SDK not loaded. Please try again.');
        }
        
        // Create order from cart data
        const { data } = await axios.post('/.netlify/functions/create-razorpay-order', {
          amount: Math.round(total * 100),
          currency: 'INR',
          receipt: `order_rcpt_${Date.now()}`,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        });
        
        if (!data?.order) {
          throw new Error('Failed to create order: Invalid response from server');
        }

        const { order } = data;

        // Razorpay checkout options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency || 'INR',
          order_id: order.id,
          name: 'Svasam',
          description: `Payment for order ${order.id}`,
          prefill: {
            name: user.displayName || address?.fullName || '',
            email: user.email || '',
            contact: address?.phone || ''
          },
          theme: {
            color: '#8B1F7A'
          },
          modal: {
            ondismiss: function() {
              console.log('Razorpay modal closed');
            },
            escape: false,
            backdropclose: false
          },
          
          handler: async function (response) {
            console.log('Payment successful, verifying...', response);
            try {
              // Verify payment and save cart items
              const verifyResponse = await axios.post("/.netlify/functions/verify-payment", {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.uid,
                orderData: {
                  items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    type: 'course'
                  })),
                  total: total,
                  currency: 'INR'
                },
              });

              if (verifyResponse.data.success) {
                console.log('Payment verified successfully');
                // Clear cart and navigate to success
                clearCart();
                navigate('/order-success', { 
                  state: { 
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id
                  },
                  replace: true
                });
              } else {
                throw new Error(verifyResponse.data.message || 'Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              // Still navigate to success page even if verification fails
              navigate('/order-success', { 
                state: { 
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id
                },
                replace: true
              });
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error initializing Razorpay:', error);
        setError(`Failed to initialize payment: ${error.message}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
        console.error('Error headers:', error.response.headers);
        errorMessage = error.response.data?.message || error.message;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Please check your internet connection.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background/80 pt-24 pb-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
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
    <div className="min-h-screen bg-background/80 pt-24 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-main transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                {isAddressFilled && (
                  <button
                    onClick={() => setIsAddressFilled(false)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                )}
              </div>

              {!isAddressFilled ? (
                <AddressForm
                  onSave={handleAddressSubmit}
                  initialData={address || {}}
                />
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {address && (
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-purple-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{address.fullName}</p>
                          <p className="text-gray-700">{address.address}</p>
                          <p className="text-gray-700">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-700">Phone: {address.phone}</p>
                          {address.landmark && (
                            <p className="text-gray-500 text-sm mt-1">
                              Landmark: {address.landmark}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary (Mobile) */}
          <div className="lg:hidden bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* ... */}

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-3 border-t mt-2">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Mobile Checkout Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={!isAddressFilled || cart.length === 0}
                className={`w-full py-3 px-4 rounded-xl font-medium text-white ${
                  !isAddressFilled || cart.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } transition-colors`}
              >
                {!isAddressFilled ? 'Add Shipping Address' : 'Proceed to Payment'}
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start border-b border-gray-100 pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={item.image || '/placeholder-product.jpg'} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!isAddressFilled || cart.length === 0 || isLoading}
                className={`w-full mt-6 py-3 px-4 rounded-xl font-medium text-white ${
                  !isAddressFilled || cart.length === 0 || isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } transition-colors flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : !isAddressFilled ? 'Add Shipping Address' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
