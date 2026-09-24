import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Refalo — Real Referral Codes from Real People",
  description:
    "Find and share referral codes for top brands. Save money and earn rewards with community-verified links.",
  metadataBase: new URL("https://refalo.io"),
  openGraph: {
    title: "Refalo — Real Referral Codes from Real People",
    description:
      "Find and share referral codes for top brands. Save money and earn rewards with community-verified links.",
    url: "https://refalo.io",
    siteName: "Refalo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Refalo — Real Referral Codes from Real People",
    description: "Find and share referral codes for top brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-800 py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
              <span>
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-zinc-400 font-medium">Refalo.io</span> — Community referral codes
              </span>
              <div className="flex items-center gap-4">
                <a href="/categories" className="hover:text-zinc-400 transition-colors">Browse Brands</a>
                <a href="/register" className="hover:text-zinc-400 transition-colors">Share a Code</a>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
