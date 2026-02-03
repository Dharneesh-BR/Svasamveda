import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export async function handler(event) {
  try {
    // 1️⃣ Get Razorpay signature
    const razorpaySignature = event.headers["x-razorpay-signature"];

    if (!razorpaySignature) {
      return { statusCode: 400, body: "Missing signature" };
    }

    // 2️⃣ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(event.body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return { statusCode: 400, body: "Invalid signature" };
    }

    // 3️⃣ Parse payload
    const payload = JSON.parse(event.body);

    // Only handle payment.captured
    if (payload.event !== "payment.captured") {
      return { statusCode: 200, body: "Event ignored" };
    }

    const payment = payload.payload.payment.entity;

    // 4️⃣ Prepare email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: payment.email || "svasamveda@gmail.com", // fallback
      from: "no-reply@svasam.com",
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        order_id: payment.order_id,
        payment_id: payment.id,
        amount: payment.amount / 100,
        currency: payment.currency,
      },
    };

    await sgMail.send(msg);

    // 5️⃣ MUST return 200
    return {
      statusCode: 200,
      body: "Webhook processed successfully",
    };
  } catch (error) {
    console.error("Webhook error:", error);

    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
}
