import crypto from "crypto";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function handler(event) {
  // Razorpay sends POST only
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200,
      body: "Method ignored",
    };
  }

  try {
    // 1️⃣ Verify Razorpay Signature
    const razorpaySignature = event.headers["x-razorpay-signature"];
    const body = event.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("❌ Invalid Razorpay signature");
      return {
        statusCode: 200, // still 200 to stop retries
        body: "Invalid signature",
      };
    }

    // 2️⃣ Parse event
    const payload = JSON.parse(body);
    const eventType = payload.event;

    // 3️⃣ Handle only payment.captured
    if (eventType !== "payment.captured") {
      return {
        statusCode: 200,
        body: "Event ignored",
      };
    }

    // 4️⃣ Extract payment details
    const payment = payload.payload.payment.entity;

    const email = payment.email;
    const orderId = payment.order_id;
    const paymentId = payment.id;
    const amount = (payment.amount / 100).toFixed(2);
    const method = payment.method;
    const currency = payment.currency.toUpperCase();

    // 5️⃣ Send email via SendGrid Dynamic Template
    const msg = {
      to: email,
      from: {
        email: "no-reply@svasam.com",
        name: "SVASAM VEDA LIFE SCIENCES",
      },
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        order_id: orderId,
        payment_id: paymentId,
        amount: amount,
        currency: currency,
        payment_method: method,
      },
    };

    await sgMail.send(msg);

    console.log("✅ Payment email sent:", paymentId);

    // 6️⃣ ALWAYS return 200 (IMPORTANT)
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error("🔥 Webhook error:", error);

    // Razorpay must still receive 200
    return {
      statusCode: 200,
      body: JSON.stringify({ errorHandled: true }),
    };
  }
}
