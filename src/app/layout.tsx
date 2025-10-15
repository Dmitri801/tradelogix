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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State for theme toggle (client-side)
  const [theme, setTheme] = useState("dark");

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <html lang="en" className={theme}>
      <body
        className={cn(
          inter.variable,
          "min-h-screen font-sans",
          theme === "dark"
            ? "bg-tradelogix-dark text-gray-100"
            : "bg-tradelogix-light text-gray-900"
        )}
      >
        <TRPCReactProvider>
          {children}
          <Toaster position="top-right" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
