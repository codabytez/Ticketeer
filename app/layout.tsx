import type { Metadata } from "next";
import { Road_Rage, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";

const jejuMyeongjo = localFont({
  src: "../public/assets/fonts/JejuMyeongjo.ttf",
  variable: "--font-jejuMyeongjo",
});

const roadRage = Road_Rage({
  variable: "--font-road-rage",
  subsets: ["latin"],
  weight: ["400"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Techember Fest ”25",
  description:
    "Techember Fest is a virtual event that brings together developers and tech enthusiasts to celebrate the tech community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jejuMyeongjo.variable} ${roboto.variable} ${roadRage.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
