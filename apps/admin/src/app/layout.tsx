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
          <div className="flex w-full">
            <LeftNavigationMenubar />

            <div className="w-full">
              <Header />
              <div className="w-full px-8 py-4 rounded-3xl bg-white">
                <div className="flex mt-2">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
