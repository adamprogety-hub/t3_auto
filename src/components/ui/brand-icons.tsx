import React from "react";

/**
 * Filled (solid) icon for Telegram with zero stroke.
 * Authentic Telegram paper airplane silhouette.
 */
export function TelegramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m21.68 3.3-19.2 7.42c-1.31.53-1.3 1.27-.24 1.6l4.93 1.54 11.41-7.2c.54-.33 1.03-.15.63.2l-9.25 8.35-.36 5.1c.5 0 .72-.23 1-.5l2.4-2.33 4.99 3.69c.92.51 1.58.25 1.8-.84l3.28-15.44c.34-1.35-.52-1.97-1.39-1.59z" />
    </svg>
  );
}

/**
 * Filled (solid) icon for Phone handset with zero stroke.
 */
export function PhoneFilledIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.9a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1A17 17 0 0 0 20 20.9a1 1 0 0 0 1-1v-3.52a1 1 0 0 0-.99-1z" />
    </svg>
  );
}

/**
 * Filled (solid) icon for Mail envelope with zero stroke.
 */
export function MailFilledIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25-7.07 4.42a1 1 0 0 1-1.06 0L4.4 8.25a.75.75 0 0 1 .8-1.27L12 11.16l6.8-4.18a.75.75 0 1 1 .8 1.27z" />
    </svg>
  );
}
