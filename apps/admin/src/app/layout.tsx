import DashboardHeader from "@next/components/Dashboard/DashboardHeader";
import Header from "@next/components/Header/Header";
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
        <main className="flex min-h-screen flex-col items-center">
          <Header />
          <div className="flex w-full px-8">
            <div className="mt-1.5">
              <LeftNavigationMenubar />
            </div>
            <div className="w-full p-10 rounded-3xl bg-white text-[#42427D]">
              <DashboardHeader />
              <div className="flex mt-2">{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
