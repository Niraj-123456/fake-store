"use client";
import Dashboard from "@next/components/Dashboard/Dashboard";
import Header from "@next/components/Header/Header";
import TopSelling from "@next/components/Sales/TopSelling";

export default function Home() {
  return (
    <div className="w-full flex mt-3">
      <div className="flex-1">
        <Dashboard />
      </div>
      <div className="flex justify-end">
        <TopSelling />
      </div>
    </div>
  );
}
