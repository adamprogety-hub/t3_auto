import type { Metadata } from "next";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Т3 Автоматизация — Инжиниринговый центр АСУТП, отечественные ПТК и платформы для объектов генподряда",
  description:
    "Промышленная автоматизация, РСУ и ПАЗ, цифровое производство шкафов управления, диспетчеризация КАСКАД Цифра и внедрение отечественных ПТК для объектов генподряда и КИИ.",
  keywords: [
    "Т3 Автоматизация",
    "АСУТП",
    "Инжиниринговый центр АСУТП",
    "промышленная автоматизация",
    "РСУ и ПАЗ",
    "импортозамещение АСУТП",
    "КАСКАД Цифра",
    "ПТК БАЗИС",
    "ПТК СУРА",
    "шкафы управления",
    "КИИ",
    "ФСТЭК 239",
    "системный интегратор",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        {children}
        <CookieConsent />
        <PrivacyModal />
      </body>
    </html>
  );
}

