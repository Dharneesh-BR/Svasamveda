import React from "react";

const PaymentButton = ({ amount }) => {
  const handlePayment = async () => {
    // Call your Netlify function
    const res = await fetch("/.netlify/functions/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }), // paise
    });

    const data = await res.json();

    if (!data.success) {
      alert("Failed to create order. Please try again.");
      return;
    }

    const order = data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend-safe key
      amount: order.amount,
      currency: order.currency,
      name: "Svasam Veda",
      description: "Session / Program Payment",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      theme: {
        color: "#E63946",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
