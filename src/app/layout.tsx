import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Authentication System",
  description: "A modern, secure authentication system built with Next.js 15, utilizing server actions and JWT tokens for type-safe authentication.",
  keywords: ["Next.js", "Authentication", "JWT", "TypeScript", "Server Actions"],
  authors: [{ name: "Will Forbes" }],
  openGraph: {
    title: "Next.js Authentication System",
    description: "A modern, secure authentication system built with Next.js 15",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased bg-white dark:bg-black text-black dark:text-white`}>
        {children}
      </body>
    </html>
  );
}
