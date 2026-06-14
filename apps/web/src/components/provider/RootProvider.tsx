"use client";
import React, { useEffect } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Toaster } from "ui/lib/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { writeToLocalStorage } from "@/lib/localStorage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const SessionHandler = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      //@ts-ignore
      if (session.error === "RefreshAccessTokenError") {
        // signIn();
      }
      //@ts-ignore
      if (session.access_token) {
        //@ts-ignore
        writeToLocalStorage("accessToken", session.access_token);
      }
    }
  }, [session]);

  return <>{children}</>;
};

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <SessionHandler>
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
      </SessionHandler>
    </SessionProvider>
  );
};

export default RootProvider;
