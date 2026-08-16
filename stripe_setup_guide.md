# Stripe API Integration Setup Guide for AutoArchitect

This guide details how to configure Stripe API keys and webhooks for production deployment.

## 🔑 Environment Variables (.env.local)

```env
# Stripe Publishable Key (Client Side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51...

# Stripe Secret Key (Server Side API)
STRIPE_SECRET_KEY=sk_live_51...

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🛠️ Server-side API Route Setup (Node.js / Express / Next.js)

```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(planId, customerEmail) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: customerEmail,
    line_items: [{ price: planId, quantity: 1 }],
    success_url: `https://yourdomain.com/app?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://yourdomain.com/pricing`,
  });

  return session.url;
}
```

## ⚡ Webhook Handler Setup

```javascript
export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'invoice.payment_succeeded':
      // Update customer subscription status in database
      break;
    case 'customer.subscription.deleted':
      // Revoke customer portal access
      break;
  }

  res.json({ received: true });
}
```
