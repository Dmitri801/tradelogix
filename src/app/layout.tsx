"use client";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-gray-100">
        <TRPCReactProvider>
          {children}
          <Toaster position="top-right" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
