"use client";
import DashboardHeader from "@next/components/Dashboard/DashboardHeader";
import LeftNavigationMenubar from "@next/components/LeftNavigation/LeftNavigationMenubar";
import { Inter } from "next/font/google";
import "ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
          <div className="flex w-full">
            <LeftNavigationMenubar />
            <div className="w-full p-10 rounded-3xl bg-white text-[#42427D]">
              <DashboardHeader />
              <div className="flex">{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
