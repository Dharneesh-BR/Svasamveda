const handleCheckout = async () => {
  try {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const response = await axios.post("/.netlify/functions/create-order", {
      amount: cartTotal * 100, // Razorpay expects amount in paise
      currency: "INR",
    });

    const { order } = response.data;
    console.log("Order response:", order); // Check this log!

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Svasam Wellness Pvt. Ltd.",
      description: "Program Purchase",
      order_id: order.id,
      handler: function (response) {
        alert("✅ Payment successful!");
        console.log("Payment details:", response);
        clearCart(); // Empty cart after successful payment
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
