import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import MicroFX from "@/components/motion/MicroFX";
import ScrollRiver from "@/components/motion/ScrollRiver";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pishondigital.com"),
  title: {
    default: "PDN · Websites people trust & assistants that answer your customers",
    template: "%s · PDN",
  },
  description:
    "We build websites people trust, and AI assistants that reply, book and follow up day and night. So you stop losing customers while you're working.",
  openGraph: {
    title: "PDN · Pishon Digital Network",
    description:
      "Websites people trust, and assistants that answer your customers day and night.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${jetbrains.variable}`}>
      <body>
        <SmoothScroll />
        <Cursor />
        <MicroFX />
        <ScrollRiver />
        {children}
      </body>
    </html>
  );
}
