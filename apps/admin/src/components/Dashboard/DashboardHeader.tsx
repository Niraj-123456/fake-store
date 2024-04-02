import { Search } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="text-4xl subpixel-antialiased">
        Welcome, <span className="font-bold">Niraj</span>
      </h1>
      <div className="flex grow-0 gap-6">
        <div className="relative">
          <input
            name="search"
            className="w-[350px] pl-[19px] py-[16px] rounded-full bg-[#F3F6FF] focus:outline-none focus:ring-1 ring-[#5840bb]"
            placeholder="Search for products..."
          />
          <div className="absolute top-[50%] right-[10%] translate-x-2/4 -translate-y-2/4">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
