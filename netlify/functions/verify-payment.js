const { doc, getDoc, updateDoc, serverTimestamp } = require('firebase-admin');
const { db } = require('../src/firebase.js');

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
    const orderDoc = await getDoc(doc(db, 'orders', order_id));
    
    if (!orderDoc.exists()) {
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
    await updateDoc(doc(db, 'orders', order_id), {
      ...orderData,
      paymentId: payment_id,
      razorpayOrderId: order_id,
      paymentSignature: signature,
      status: 'completed',
      updatedAt: serverTimestamp(),
      verifiedAt: serverTimestamp()
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
