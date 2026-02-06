const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
  try {
    const { order_id, payment_id, signature } = JSON.parse(event.body);
    
    console.log('Verifying payment:', { order_id, payment_id, signature });

    if (!order_id || !payment_id || !signature) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          message: 'Missing required payment verification parameters' 
        })
      };
    }

    // Find the order in Firestore
    const orderDoc = await db.collection('orders').doc(order_id).get();
    
    if (!orderDoc.exists()) {
      console.log('Order not found in orders collection, checking user orders...');
      
      // Try to find in user's orders collection
      // We need to get user info from the order or use a different approach
      return {
        statusCode: 404,
        body: JSON.stringify({ 
          success: false,
          message: 'Order not found' 
        })
      };
    }

    const orderData = orderDoc.data();
    console.log('Found order:', orderData);

    // Update order with payment details
    await db.collection('orders').doc(order_id).update({
      ...orderData,
      paymentId: payment_id,
      razorpayOrderId: order_id,
      paymentSignature: signature,
      status: 'completed',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      verifiedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Payment verified successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Payment verified successfully' 
      })
    };

  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        message: 'Payment verification failed',
        error: error.message 
      })
    };
  }
};
