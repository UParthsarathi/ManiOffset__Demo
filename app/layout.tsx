import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
// import { FloatingCalculatorButton } from '@/components/FloatingCalculatorButton';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://feeltheprint.com'),
  alternates: { canonical: './' },
  title: {
    default: 'Mani Offset | Commercial Offset Printing Company in Chennai',
    template: '%s | Mani Offset',
  },
  description: 'Commercial offset printing company in Chennai. Books, catalogues, business stationery and banking print in bulk, delivered across India since 1995.',
  authors: [{ name: 'Mani Offset' }],
  creator: 'Mani Offset',
  publisher: 'Mani Offset',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Mani Offset | Commercial Offset Printing Company in Chennai',
    description: 'High-volume offset printing from Chennai — books, catalogues, business stationery and banking print, delivered across India since 1995.',
    url: 'https://feeltheprint.com',
    siteName: 'Mani Offset',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mani Offset | Commercial Offset Printing in Chennai',
    description: 'High-volume offset printing from Chennai, delivered across India.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-slate-900 bg-white">
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
        {children}
        {/* <FloatingCalculatorButton /> */}
      </body>
    </html>
  )
}
