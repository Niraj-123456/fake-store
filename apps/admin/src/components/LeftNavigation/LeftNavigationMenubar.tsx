"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Shapes,
  ClipboardMinus,
  ShoppingBasket,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
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
  const [collaspe, setCollaspe] = useState(false);

  const handleToggleCollapse = () => {
    setCollaspe((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "bg-gray-700 text-white relative min-h-screen transition-all duration-300 ease-in-out",
        collaspe ? "max-w-20 w-20" : "max-w-80 w-80"
      )}
    >
      <div className="sticky top-0 min-h-screen">
        <ul
          className={cn(
            "flex items-center gap-2 px-6 py-5 mb-3 text-white overflow-hidden"
          )}
        >
          <li className={cn("flex items-center gap-3 ml-0.5")}>
            <ShoppingBag className="w-7 h-10" />
            <span
              className={cn(
                "text-2xl font-semibold subpixel-antialiased whitespace-nowrap transition-all duration-300 ease-in-out",
                collaspe ? "opacity-0" : "opacity-100"
              )}
              role="heading"
            >
              Fake Store
            </span>
          </li>
        </ul>

        <ul className="flex flex-col mt-6 px-2 gap-1 overflow-hidden">
          {linkOptions?.map((option, idx) => (
            <Link href={option.pathname} key={idx}>
              <li
                className={cn(
                  "flex items-center gap-5 text-lg py-4 px-5 cursor-pointer font-semibold rounded-md hover:bg-white hover:text-gray-800 white",
                  option?.pathname === pathname ? "bg-white text-gray-800" : ""
                )}
              >
                <span>{option?.icon}</span>
                <span
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    collaspe ? "opacity-0" : "opacity-100"
                  )}
                >
                  {option?.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        {!collaspe ? (
          <ChevronLeft
            className="top-1/2 -right-3 absolute w-7 h-7 p-1 cursor-pointer transition-all duration-300 bg-gray-700 rounded-full ring-4 ring-white"
            onClick={handleToggleCollapse}
          />
        ) : (
          <ChevronRight
            className="top-1/2 -right-3 absolute w-7 h-7 p-1 cursor-pointer transition-all duration-300 bg-gray-700 rounded-full ring-4 ring-white"
            onClick={handleToggleCollapse}
          />
        )}
      </div>
    </div>
  );
};

export default LeftNavigationMenubar;
