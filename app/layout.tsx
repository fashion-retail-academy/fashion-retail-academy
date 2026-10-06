import VisitorTracker from "./components/VisitorTracker";
import { Analytics } from "@vercel/analytics/next";
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
  verification: {
    google: "bASDpdSMTI-MZzt_PbXmAks7rveCVFT_GV-Eg4mxsIs",
  },
  title: "Fashion Retail Academy | Master Fashion Retail",
  description: "Learn fashion buying, merchandise planning, retail finance, Excel and fashion business strategy through practical courses and real-world retail experience from Fashion Retail Academy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}  <Analytics />`r`n      <VisitorTracker />
</body>
    </html>
  );
}






