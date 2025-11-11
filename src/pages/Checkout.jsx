// src/pages/Checkout.jsx
import React from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  // Dynamically calculate total from cart (Subtotal)
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // 1️⃣ Create Razorpay order via Netlify function
      const response = await axios.post("/.netlify/functions/create-order", {
        amount: cartTotal * 100, // Razorpay expects amount in paise
        currency: "INR",
      });

      const { order } = response.data;

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Svasam Wellness Pvt. Ltd.",
        description: "Program Purchase",
        order_id: order.id,
        handler: async function (response) {
          try {
            const user = auth.currentUser;
            if (user) {
              await addDoc(collection(db, 'users', user.uid, 'orders'), {
                amount: order.amount / 100,
                currency: order.currency,
                gateway: 'razorpay',
                razorpay: {
                  orderId: order.id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                },
                items: cart.map(i => ({
                  id: i.id,
                  title: i.title,
                  price: i.price,
                  quantity: i.quantity,
                  image: i.image || null,
                })),
                createdAt: serverTimestamp(),
                status: 'paid',
              });
            }
            alert("✅ Payment successful!");
          } catch (e) {
            console.error('Failed to save order:', e);
          } finally {
            clearCart();
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#8B1F7A",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      {cart.length > 0 ? (
        <>
          <p className="text-gray-700 mb-4">
            Subtotal: <span className="font-semibold">₹{cartTotal}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="bg-main text-white px-8 py-3 rounded-md text-lg hover:bg-opacity-90 transition"
          >
            Pay ₹{cartTotal}
          </button>
        </>
      ) : (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
