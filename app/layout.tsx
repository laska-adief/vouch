import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vouch | Movie and TV Show Recommendations",
    template: "%s | Vouch",
  },
  applicationName: "Vouch",
  description: "Movie and TV Show Recommendations",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Vouch",
    description: "Movie and TV Show Recommendations",
    type: "website",
    siteName: "Vouch",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Vouch - Movie and TV Show Recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vouch",
    description: "Movie and TV Show Recommendations",
    images: ["/logo.png"],
  },
  keywords: ["Vouch", "Movie", "TV Show", "Movies", "TV Shows", "Recommendations"],
  authors: [{ name: "Laska Adief" }],
  creator: "Laska Adief",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

};

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
