"use client";
import Products from "@/components/products/Products";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Products />
    </Suspense>
  );
}
