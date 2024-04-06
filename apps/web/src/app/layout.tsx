"use client";
import Header from "@/components/header/Header";
import { Inter } from "next/font/google";
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
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="w-full flex min-h-screen flex-col items-center justify-between px-8 py-4">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
