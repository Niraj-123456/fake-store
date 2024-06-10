"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "ui/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "react-query";
import "ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      <meta name="description" content="My App is a..." />
      <title>Fake Store</title>
      <body className={inter.className}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <main className="w-full min-h-[calc(100vh-72px)] grid place-items-center pb-6 px-10 sm:px-14 md:px-20 lg:px-52">
              {children}
            </main>
            <Footer />
            <Toaster />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
