"use client";
import HomeBanner from "@/components/banner/HomeBanner";
import Products from "@/components/products/Products";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="mt-8 px-10 sm:px-14 md:px-20 lg:px-52">
      <HomeBanner />
      <Suspense fallback={<p>Loading...</p>}>
        <Products />
      </Suspense>
    </div>
  );
}
