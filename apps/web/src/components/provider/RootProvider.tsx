"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Toaster } from "ui/lib/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          {pathname !== "/login" && pathname !== "/register" && <Header />}
          <main className="w-full mx-auto min-h-[calc(100vh-72px)] grid">
            {children}
          </main>

          {pathname !== "/login" && pathname !== "/register" && <Footer />}
        </CartProvider>
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default RootProvider;
