import crypto from "crypto";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function handler(event) {
  try {
    const signature = event.headers["x-razorpay-signature"];
    const body = event.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return { statusCode: 401, body: "Invalid signature" };
    }

    const payload = JSON.parse(body);

    if (payload.event === "payment.captured") {
      const payment = payload.payload.payment.entity;

      await sgMail.send({
        to: payment.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        templateId: process.env.SENDGRID_PAYMENT_TEMPLATE_ID,
        dynamicTemplateData: {
          order_id: payment.order_id,
          payment_id: payment.id,
          amount: payment.amount / 100,
        },
      });
    }

    return { statusCode: 200, body: "Webhook processed" };
  } catch (err) {
    console.error("Webhook error:", err);
    return { statusCode: 500, body: "Webhook error" };
  }
}
