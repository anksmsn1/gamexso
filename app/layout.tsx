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
  title: "Gamexso",
  description: "Started in 2022, Gamexso has been able to establish itself as India’s Largest Micro e-Sports Tournament & online gaming platform. Gamexso has registered active users and daily active with a new gamer getting registered every minute. It also has a unique fantasy sports concept called Fan Battle.",
  openGraph: {
    title: "Gamexso",
    description: "Join the largest  e-Sports tournament and fantasy sports platform in India. Gamexso offers a unique gaming experience for players across various sports.",
    url: "https://www.gamexso.com",  // Replace with the actual URL
    siteName: "Gamexso",
    images: [
      {
        url: "https://www.gamexso.com/favicon.ico", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Gamexso",
      },
    ],
    type: "website",  // This can be adjusted depending on the content type (e.g., "article", "video", etc.)
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
