import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/siteConfig";
import { CartProvider } from "@/components/providers/CartProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans min-h-screen bg-background text-foreground antialiased`} suppressHydrationWarning>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          <ChatWidget />
          <Toaster />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DeliveryService",
              "name": siteConfig.name,
              "description": "24/7 Water Delivery and Logistics serving the Tri-State Area.",
              "areaServed": ["New York", "New Jersey", "Connecticut"],
              "openingHours": "Mo-Su 00:00-24:00",
              "paymentAccepted": ["Credit Card", "Apple Pay", "Square", "Zelle"],
              "priceRange": "$$"
            }),
          }}
        />
      </body>
    </html >
  );
}
