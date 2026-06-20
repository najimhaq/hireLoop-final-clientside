import { useState } from "react";

export default function useCheckout() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const handleCheckout = async (planId) => {
    if (!planId) return;
    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe error:', data.error);
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setLoadingPlan(null);
    }
  };
  return { handleCheckout, loadingPlan };
}
