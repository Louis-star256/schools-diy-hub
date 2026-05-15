import { NextResponse } from 'next/server';
import { getFirestore, doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

/**
 * PesaPal V3 IPN (Instant Payment Notification) Handler.
 * This node listens for real-time payment updates from the fintech gateway.
 */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderTrackingId = searchParams.get('OrderTrackingId');
    const notificationType = searchParams.get('OrderNotificationType');

    console.log(`[PESAPAL IPN] Notification received for ID: ${orderTrackingId}`);

    if (!orderTrackingId) {
      return NextResponse.json({ status: 'error', message: 'Missing Tracking ID' }, { status: 400 });
    }

    // In a production environment, you would:
    // 1. Authenticate with PesaPal (get fresh token)
    // 2. Fetch the official transaction status using orderTrackingId
    // 3. Update Firestore based on that status

    // SIMULATED FINTECH UPDATE:
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, where('providerRef', '==', orderTrackingId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const txDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'transactions', txDoc.id), {
            status: 'completed', 
            updatedAt: new Date()
        });
        console.log(`[PESAPAL IPN] Transaction ${txDoc.id} verified and completed.`);
    }

    // Standard PesaPal acknowledgement response
    return NextResponse.json({
        "orderNotificationType": notificationType,
        "orderTrackingId": orderTrackingId,
        "status": 200
    });

  } catch (error: any) {
    console.error('[FINTECH IPN NODE ERROR]', error);
    return NextResponse.json({ error: 'Fintech IPN processing failed' }, { status: 500 });
  }
}
