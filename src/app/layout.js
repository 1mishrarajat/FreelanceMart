
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "./Footer/Footer";
import Copywrite from "./Copywrite/copywrite";
import Header from "./heeader/header";
import TopHeader from "./topheader/topheader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FreelanceMart",
  description: "Shop products and hire skilled freelancers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>

      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <TopHeader />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <Copywrite />
      </body>
    </html>
  );
}
