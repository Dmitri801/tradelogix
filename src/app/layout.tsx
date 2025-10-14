"use client";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <nav
          className={cn(
            "flex justify-between items-center p-4",
            theme === "dark" ? "bg-tradelogix-dark" : "bg-tradelogix-light",
            "border-b border-gray-700"
          )}
        >
          <h1 className="text-2xl font-bold text-tradelogix-emerald">
            TradeLogix
          </h1>
          <div className="flex items-center space-x-4">
            <a
              href="/dashboard"
              className="text-gray-300 hover:text-tradelogix-emerald"
            >
              Dashboard
            </a>
            <a
              href="/log-trade"
              className="text-gray-300 hover:text-tradelogix-emerald"
            >
              Log Trade
            </a>
            <a
              href="/analytics"
              className="text-gray-300 hover:text-tradelogix-emerald"
            >
              Analytics
            </a>
            <a
              href="/notebook"
              className="text-gray-300 hover:text-tradelogix-emerald"
            >
              Notebook
            </a>
            <a
              href="/settings"
              className="text-gray-300 hover:text-tradelogix-emerald"
            >
              Settings
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-400 hover:text-tradelogix-emerald"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
        {/* Main Content */}
        <main className="py-8 px-4">{children}</main>
      </body>
    </html>
  );
}
