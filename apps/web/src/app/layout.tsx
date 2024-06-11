import { Inter } from "next/font/google";
import "ui/globals.css";
import RootProvider from "@/components/provider/RootProvider";

const inter = Inter({ subsets: ["latin"] });

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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
