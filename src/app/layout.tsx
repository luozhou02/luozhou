import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Luozhou | Visual Artist",
  description: "Visual Artist based in Guangzhou, China",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    apple: { url: '/apple-icon.png' },
  },
  openGraph: {
    title: 'Luozhou | Visual Artist',
    description: 'Visual Artist based in Guangzhou, China',
    url: 'https://luozhou.site',
    siteName: 'Luozhou Portfolio',
    images: [
      {
        url: '/image/1 (1).jpg', // 使用你的第一张作品图片作为预览图
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luozhou | Visual Artist',
    description: 'Visual Artist based in Guangzhou, China',
    images: ['/image/1 (1).jpg'], // 使用同样的图片作为 Twitter 预览
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}