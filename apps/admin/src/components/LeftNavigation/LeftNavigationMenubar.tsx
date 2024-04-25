"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Shapes,
  ClipboardMinus,
  ShoppingBasket,
  ShoppingBag,
} from "lucide-react";
import { cn } from "ui/lib/utils";
import Link from "next/link";

const linkOptions = [
  { name: "Home", pathname: "/", icon: <LayoutDashboard /> },
  {
    name: "Products",
    pathname: "/products",
    icon: <ShoppingBasket />,
  },
  { name: "Categories", pathname: "/categories", icon: <Shapes /> },
  { name: "Orders", pathname: "/orders", icon: <ShoppingCart /> },
  { name: "Reports", pathname: "/reports", icon: <ClipboardMinus /> },
];

const LeftNavigationMenubar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full bg-gray-700 h-full text-white">
      <div className="flex item-center gap-2 p-5 mt-4 mb-3 text-white">
        <ShoppingBag className="w-6 h-8" />
        <h1 className="text-2xl font-semibold subpixel-antialiased">
          Fake Store
        </h1>
      </div>

      <ul className="flex flex-col mt-1 sticky top-0">
        {linkOptions?.map((option, idx) => (
          <Link href={option.pathname} key={idx}>
            <li
              className={cn(
                "flex items-center gap-3 text-lg py-4 px-5 cursor-pointer font-semibold transition-all duration-300 hover:bg-white hover:text-gray-800",
                option?.pathname === pathname ? "bg-white text-gray-800" : ""
              )}
            >
              {option?.icon}
              <span>{option?.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LeftNavigationMenubar;
