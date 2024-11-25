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
  description: "gamexso games, gamexso, Surya Ludo, gamexso Surya, gamexso games private limited, gamexso gaming company, gamexso gaming company in india, gamexso gaming company in up, Ludo game, new fantasy app, 100% bonus use mobile app, 100% bonus use Ludo app, 100 bonus use new app, Ludo King gaming app, new rummy app, 2024 fantasy app, gamexsoofficial, gamexsogames@gmail.com, gamexsoofficial@gmail.com, gamexso.com, gamexso.in, gamexso cricket, gamexso football, gamexso kabaddi, gamexso nba, gamexso National basketball, gamexso free fire, gamexsogames, gamexsogames, gamexso headquarter, gamexso office, gamexso kya hai, gamexo, gamexso ludo king, gamexso ludo game, how work gamexso, gamexso games pvt. Ltd.,  Gamexso india, devlopment company, gamexso devlopment company, new software company, who is gamexso",
  keywords: "gamexso games, gamexso, Surya Ludo, gamexso Surya, gamexso games private limited, gamexso gaming company, gamexso gaming company in india, gamexso gaming company in up, Ludo game, new fantasy app, 100% bonus use mobile app, 100% bonus use Ludo app, 100 bonus use new app, Ludo King gaming app, new rummy app, 2024 fantasy app, gamexsoofficial, gamexsogames@gmail.com, gamexsoofficial@gmail.com, gamexso.com, gamexso.in, gamexso cricket, gamexso football, gamexso kabaddi, gamexso nba, gamexso National basketball, gamexso free fire, gamexsogames, gamexsogames, gamexso headquarter, gamexso office, gamexso kya hai, gamexo, gamexso ludo king, gamexso ludo game, how work gamexso, gamexso games pvt. Ltd.,  Gamexso india, devlopment company, gamexso devlopment company, new software company, who is gamexso"
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
