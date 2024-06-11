"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Toaster } from "ui/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const cartItemsCount = 0;

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Header cartItemsCount={cartItemsCount} />
        <main className="w-full min-h-[calc(100vh-72px)] grid place-items-center pb-6 px-10 sm:px-14 md:px-20 lg:px-52">
          {children}
        </main>
        <Footer />
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default RootProvider;
