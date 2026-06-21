import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/app/lib/stripe';
import { getUserSession } from '@/app/lib/core/session';

export async function POST(req) {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const headersList = await headers();
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_APP_URL;

    const { planId } = await req.json();

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

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      customer_email: user?.email ?? undefined,
      metadata: {
        planId,
        priceId,
        userId: user?.id,
        userEmail: user?.email,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
