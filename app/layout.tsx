import type { Metadata } from "next";
import { Cardo, Montserrat } from "next/font/google";
import { defaultDescription, defaultTitle, ogImage, siteUrl } from "./site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s",
  },
  description: defaultDescription,
  keywords:
    "Jana Elise Lister, professional model, editorial modeling, commercial modeling, runway model, fashion performer, creative artist, New Braunfels TX model",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jana Elise Lister",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.url],
  },
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
