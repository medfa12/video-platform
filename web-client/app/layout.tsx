import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from 'next/image';
import Navbar from "@/navbar/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mtube",
  description: "video platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <Navbar  />
        {children}
        </body>
    </html>
  );
}
