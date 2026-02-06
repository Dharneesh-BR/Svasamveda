const crypto = require("crypto");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      orderData
    } = JSON.parse(event.body);

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Missing fields" })
      };
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Invalid signature" })
      };
    }

    const orderRef = db
      .collection("users")
      .doc(userId)
      .collection("orders")
      .doc(razorpay_order_id);

    await orderRef.set(
      {
        ...orderData,
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        status: "completed",
        verifiedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Payment verified & order saved"
      })
    };

  } catch (error) {
    console.error("Verify payment failed:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
