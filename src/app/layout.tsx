import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zand-port.vercel.app"),
  title: "ZAND — Fullstack Developer",
  description:
    "Portfolio of ZAND, a fullstack developer building modern web experiences.",
  openGraph: {
    title: "ZAND — Fullstack Developer",
    description:
      "Portfolio of ZAND, a fullstack developer building modern web experiences.",
    url: "https://zand-port.vercel.app",
    siteName: "ZAND Portfolio",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAND — Fullstack Developer",
    description:
      "Portfolio of ZAND, a fullstack developer building modern web experiences.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
