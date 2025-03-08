import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import AuthProvider from '@/components/AutoProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"], // フォールバックフォントを指定
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["Courier", "monospace"], // フォールバックフォントを指定
});
export const metadata: Metadata = {
  title: "実績管理アプリ",
  description: "製品の管理をパソコン上で管理することで調べる時間を削減します",
};
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Header />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
