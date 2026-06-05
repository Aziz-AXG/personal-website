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
  title: "Aziz Falah Hassan | Cyber Terminal Portfolio",
  description:
    "Terminal-styled portfolio for Aziz Falah Hassan, a Node.js, Next.js, and Expo developer from Baghdad.",
  openGraph: {
    title: "Aziz Falah Hassan | Cyber Terminal Portfolio",
    description:
      "Node.js, Next.js, Expo, React Native, TypeScript, and automation worklog.",
    url: "https://www.azizfalah.com",
    siteName: "Aziz Falah Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
