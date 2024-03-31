import React from "react";
import Image from "next/image";
import { Bell, Search } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="w-full flex justify-between">
      <h1 className="text-4xl subpixel-antialiased">
        Welcome, <span className="font-bold">Niraj</span>
      </h1>
      <div className="flex grow-0 gap-6">
        <div className="relative">
          <input
            name="search"
            className="w-[250px] pl-[19px] py-[16px] custom__border__radius bg-[#F3F6FF] focus:outline-none focus:ring-1 ring-[#5840bb]"
            placeholder="Search for products..."
          />
          <div className="absolute top-[50%] right-[15%] translate-x-2/4 -translate-y-2/4">
            <Search />
          </div>
        </div>
        <div className="bg-[#F3F6FF] p-4 custom__border__radius cursor-pointer hover:ring-2 ring-[#5840bb] relative">
          <Bell />
        </div>
        <div
          className="w-[54px] h-[54px] relative overflow-hidden custom__border__radius hover:ring-2 ring-[#5840bb]"
          id="user"
        >
          <Image
            src="/images/profile.webp"
            alt="profile"
            fill
            sizes={"54*54"}
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
