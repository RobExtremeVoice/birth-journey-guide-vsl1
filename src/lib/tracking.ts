const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, details: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}

export function checkoutUrlWithUtms(checkoutUrl: string) {
  if (typeof window === "undefined") return checkoutUrl;
  const destination = new URL(checkoutUrl);
  const current = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = current.get(key);
    if (value) destination.searchParams.set(key, value);
  });
  return destination.toString();
}

export function goToCheckout(url: string, plan: string) {
  trackEvent("checkout_redirect", { plan });
  window.location.assign(checkoutUrlWithUtms(url));
}