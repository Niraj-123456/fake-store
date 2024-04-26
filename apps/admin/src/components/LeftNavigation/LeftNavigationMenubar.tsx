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
  ChevronLeftCircle,
  ChevronRightCircle,
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
        "bg-gray-700 text-white relative min-h-screen transition-[width] duration-300",
        collaspe ? "max-w-20 w-20" : "max-w-80 w-80"
      )}
    >
      <div className="sticky top-0 pt-10">
        <div
          className={cn(
            "flex items-center gap-2 p-5 mb-3 text-white",
            collaspe ? "justify-center" : ""
          )}
        >
          <ShoppingBag className="w-7 h-9" />
          <h1
            className="text-2xl font-semibold subpixel-antialiased"
            hidden={collaspe}
          >
            Fake Store
          </h1>
        </div>

        <ul className="flex flex-col mt-1 sticky top-0 px-2 gap-1">
          {linkOptions?.map((option, idx) => (
            <Link href={option.pathname} key={idx}>
              <li
                className={cn(
                  "flex items-center gap-3 text-lg py-4  cursor-pointer font-semibold transition-all duration-300 rounded-md hover:bg-white hover:text-gray-800",
                  option?.pathname === pathname ? "bg-white text-gray-800" : "",
                  collaspe ? "px-2 justify-center" : "px-5"
                )}
              >
                {option?.icon}
                <span hidden={collaspe}>{option?.name}</span>
              </li>
            </Link>
          ))}
        </ul>

        {!collaspe ? (
          <ChevronLeftCircle
            className="top-7 right-0 absolute w-6 h-6 cursor-pointer transition-all duration-300 hover:opacity-50"
            onClick={handleToggleCollapse}
          />
        ) : (
          <ChevronRightCircle
            className="top-7 right-0 absolute w-6 h-6 cursor-pointer transition-all duration-300 hover:opacity-50"
            onClick={handleToggleCollapse}
          />
        )}
      </div>
    </div>
  );
};

export default LeftNavigationMenubar;
