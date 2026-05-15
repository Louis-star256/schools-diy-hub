
import { NextResponse } from 'next/server';

/**
 * PesaPal V3 Payment API Handler for School's DIY Hub.
 * This is the production-ready node for processing real-world transactions.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, projectId, senderId, receiverId, email, firstName, lastName } = body;

    if (!amount || !projectId || !senderId) {
      return NextResponse.json({ error: 'Missing required venture parameters' }, { status: 400 });
    }

    const consumerKey = 'OFHbIk+kmCgP+o/fzXtrSFO4NsC9fu8L';
    const consumerSecret = 'JetJTRLKUnlWOymjGI6O1FVtQpU=';

    // 1. AUTHENTICATE WITH PESAPAL PRODUCTION GATEWAY
    const authRes = await fetch('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret
      })
    });

    const authData = await authRes.json();
    const token = authData.token;

    if (!token) {
      // Fallback for development simulation if keys are missing
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({
          status: 'simulated',
          data: {
            txRef: `SIM-NODE-${Date.now()}`,
            redirectUrl: `https://pay.pesapal.com/v3/checkout?simulated=true&amount=${amount}`
          }
        });
      }
      throw new Error('Fintech Auth Token generation failed');
    }

    // 2. SUBMIT SECURE ORDER
    const orderId = `HUB-VENTURE-${Date.now()}`;
    const orderPayload = {
      id: orderId,
      currency: currency || 'USD',
      amount: amount,
      description: `Innovation Venture Support: ${projectId}`,
      callback_url: `${new URL(request.url).origin}/projects/${projectId}`,
      notification_id: "", 
      billing_address: {
        email_address: email || "innovator@schools-diy-hub.com",
        first_name: firstName || "Innovation",
        last_name: lastName || "Partner"
      }
    };

    const orderRes = await fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const orderData = await orderRes.json();

    return NextResponse.json({
      status: 'success',
      message: 'Venture Node Initialized',
      data: {
        txRef: orderData.order_tracking_id || orderId,
        redirectUrl: orderData.redirect_url
      }
    });

  } catch (error: any) {
    console.error('[FINTECH NODE ERROR]', error);
    return NextResponse.json({ error: 'Fintech transaction failed to initialize' }, { status: 500 });
  }
}
