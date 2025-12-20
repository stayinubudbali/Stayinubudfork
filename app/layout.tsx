import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayinUBUD - Luxury Villa Rentals in Ubud, Bali",
  description: "Experience luxury in the heart of Ubud with our premium villa rentals. Private pools, stunning views, and authentic Balinese hospitality.",
  keywords: "Ubud villas, Bali accommodation, luxury villas, rice field view, private pool, Ubud rental",
  authors: [{ name: "StayinUBUD" }],
  openGraph: {
    title: "StayinUBUD - Luxury Villa Rentals in Ubud, Bali",
    description: "Experience luxury in the heart of Ubud with our premium villa rentals.",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
