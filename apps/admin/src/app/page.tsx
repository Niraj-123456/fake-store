import Dashboard from "@next/components/Dashboard/Dashboard";
import TopSelling from "@next/components/Sales/TopSelling";

export default function Home() {
  return (
    <div className="w-full flex mt-2">
      <div className="flex-1">
        <Dashboard />
      </div>
      <div className="flex justify-end">
        <TopSelling />
      </div>
    </div>
  );
}
