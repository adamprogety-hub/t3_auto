import type { Metadata } from "next";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import "./globals.css";

export const metadata: Metadata = {
  title: "АЦИнжиниринг — Программирование ПЛК, сборка шкафов управления и разработка SCADA-систем",
  description:
    "Программирование ПЛК, сборка шкафов управления, разработка SCADA-систем и пусконаладка (ПНР) для котельных, ИТП, ВЗУ и промышленных объектов.",
  keywords: [
    "АЦИнжиниринг",
    "АСУ ТП",
    "автоматизация котельных",
    "шкафы автоматики",
    "диспетчеризация",
    "SCADA",
    "ПНР",
    "ACEngine",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
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
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieConsent />
        <PrivacyModal />
      </body>
    </html>
  );
}

