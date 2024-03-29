import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./auth/AuthProvider";
import ReactQueryProvider from "./reactQuery/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create issue tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="p-6">{children}</main>
            <Toaster />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
