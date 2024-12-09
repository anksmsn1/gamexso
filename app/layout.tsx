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
  keywords: "gamexso games, gamexso, Surya Ludo, gamexso Surya, gamexso games private limited, gamexso gaming company, gamexso gaming company in india, gamexso gaming company in up, Ludo game, new fantasy app, 100% bonus use mobile app, 100% bonus use Ludo app, 100 bonus use new app, Ludo King gaming app, new rummy app, 2024 fantasy app, gamexsoofficial, gamexsogames@gmail.com, gamexsoofficial@gmail.com, gamexso.com, gamexso.in, gamexso cricket, gamexso football, gamexso kabaddi, gamexso nba, gamexso National basketball, gamexso free fire, gamexsogames, gamexsogames, gamexso headquarter, gamexso office, gamexso kya hai, gamexo, gamexso ludo king, gamexso ludo game, how work gamexso, gamexso games pvt. Ltd.,  Gamexso india, devlopment company, gamexso devlopment company, new software company, who is gamexso",
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
