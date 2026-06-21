// src/app/success/page.jsx
import { redirect } from 'next/navigation';
import { stripe } from '@/app/lib/stripe';
import SuccessUI from './SuccessUI';

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return redirect('/pricing');
  }

  const { status, customer_details, metadata } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });

  // console.log('customer_details', customer_details);
  // console.log('Metadata', metadata);

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return <SuccessUI customerEmail={customer_details?.email} />;
  }

  return redirect('/pricing');
}
