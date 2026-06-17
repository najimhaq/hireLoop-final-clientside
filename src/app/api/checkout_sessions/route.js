// app/api/checkout_sessions/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/app/lib/stripe';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_APP_URL;

    // ✅ req.json() দিয়ে planId নাও
    const { planId } = await req.json();

    // ✅ planId দিয়ে real price ID map করো
    const PRICE_IDS = {
      'seeker-pro': 'price_1TjILh2MYZqN1jaWgvygDn49',
      'seeker-enterprise': 'price_1TjINK2MYZqN1jaWgTcA1RLM',
      'recruiter-pro': 'price_1TjIOU2MYZqN1jaWMcZKvhJ3',
      'recruiter-enterprise': 'price_1TjIPH2MYZqN1jaWnzTM8gsy',
    };

    const priceId = PRICE_IDS[planId];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    // ✅ redirect নয়, url return করো — frontend থেকে redirect হবে
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
