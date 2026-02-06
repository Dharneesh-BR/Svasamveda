import Razorpay from "razorpay";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { amount, currency } = JSON.parse(event.body);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount, // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ order }),
    };
  } catch (error) {
    console.error("Create order error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
