import type { Metadata } from "next";
import { Cardo, Montserrat } from "next/font/google";
import "./globals.css";

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Professional Model Portfolio | Jana Elise Lister",
  description: "Professional modeling portfolio of Jana Elise Lister. Editorial, commercial, runway, and print modeling services in Austin, San Antonio, and New Braunfels, Texas.",
  keywords: "Jana Elise Lister, professional model, editorial modeling, commercial modeling, runway model, fashion performer, creative artist, New Braunfels TX model",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cardo.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
