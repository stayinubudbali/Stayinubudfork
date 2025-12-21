import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "StayinUBUD - Luxury Villa Rentals in Ubud, Bali",
  description: "Experience architectural excellence and serene luxury in the heart of Bali's cultural paradise. Curated villa collection with private pools and stunning views.",
  keywords: "Ubud villas, Bali accommodation, luxury villas, rice field view, private pool, Ubud rental, architectural design",
  authors: [{ name: "StayinUBUD" }],
  openGraph: {
    title: "StayinUBUD - Luxury Villa Rentals in Ubud, Bali",
    description: "Experience architectural excellence and serene luxury in the heart of Bali's cultural paradise.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-cream font-body text-primary">
        <Providers>
          <AnalyticsTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
