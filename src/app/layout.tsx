import type { Metadata, Viewport } from "next";
import { Syne, Manrope, Geist_Mono } from "next/font/google";
import { ConnectProvider } from "@/providers/ConnectProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConnectFab } from "@/components/chat/ConnectFab";
import { siteConfig } from "@/data/site";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sourabh-rajput.dev"),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sourabh Rajput",
    "Full Stack Developer",
    "AI/ML Developer",
    "CSE-AIML",
    "LNCT Bhopal",
    "Next.js Portfolio",
    "React Developer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="noise-overlay min-h-full flex flex-col">
        <ConnectProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConnectFab />
        </ConnectProvider>
      </body>
    </html>
  );
}
