import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Bheemanadham Kiran Kumar - Senior  Developer & Unity3D Expert",
    template: "%s | Bheemanadham Kiran Kumar"
  },
  description: "Portfolio of Bheemanadham Kiran Kumar - Senior  Developer with 13+ years of experience. Developed 60+ games for Android/iOS platforms using Unity3D and Unreal Engine. Unity Asset Store publisher and game development expert.",
  keywords: [
    "Bheemanadham Kiran Kumar",
    "Game Developer",
    "Unity3D Developer",
    "Unreal Engine Developer",
    "Mobile Game Development",
    "C# Programming",
    "Game Design",
    "Unity Asset Store",
    "Android Games",
    "iOS Games",
    "Game Programming",
    "Senior Game Developer"
  ],
  authors: [{ name: "Bheemanadham Kiran Kumar" }],
  creator: "Bheemanadham Kiran Kumar",
  publisher: "Bheemanadham Kiran Kumar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://johndoe-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kiran-kumar-portfolio.vercel.app",
    title: "Bheemanadham Kiran Kumar - Senior  Developer & Unity3D Expert",
    description: "Portfolio of Bheemanadham Kiran Kumar - Senior  Developer with 13+ years of experience. Developed 60+ games for Android/iOS platforms using Unity3D and Unreal Engine.",
    siteName: "Bheemanadham Kiran Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bheemanadham Kiran Kumar - Senior  Developer & Unity3D Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bheemanadham Kiran Kumar - Senior  Developer & Unity3D Expert",
    description: "Portfolio of Bheemanadham Kiran Kumar - Senior  Developer with 13+ years of experience. Developed 60+ games for Android/iOS platforms.",
    images: ["/og-image.jpg"],
    creator: "@kirankillstreak",
  },
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
  verification: {
    google: "your-google-site-verification-code",
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
