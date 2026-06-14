import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "ui/lib/components/ui/menubar";
import { Input } from "ui/lib/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "ui/lib/components/ui/avatar";
import {
  LogOut,
  PlusCircle,
  Settings,
  User,
  ShoppingBag,
  ShoppingCart,
  Search,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useCartContext from "@/context/CartContext";
import { clearLocalStorage } from "@/lib/localStorage";

const Header = () => {
  const { data: session } = useSession();
  const { count } = useCartContext();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    clearLocalStorage();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 font-extrabold text-xl tracking-tighter shrink-0">
          <div className="bg-slate-900 text-white p-1.5 rounded-xl">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          Fake Store
        </div>

        <div className="flex-1 max-w-xl relative hidden md:block">
          <Input
            placeholder="Search products, brands..."
            className="w-full bg-slate-100 border-none h-10 rounded-2xl py-3 pl-11 pr-12 text-sm focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
          />

          <Search className="w-5 h-5 absolute left-4 top-2.5 text-slate-400" />
        </div>

        {/* shopping cart icon */}

        <div className="flex items-center gap-4">
          <Link
            href={"/cart"}
            className="p-3 hover:bg-slate-100 rounded-2xl transition-all relative"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute top-2 right-2 w-4 h-4 bg-blue-600 text-[10px] text-white flex items-center justify-center rounded-full font-bold">
              {" "}
              {count ? count : 0}
            </span>
          </Link>

          {session ? (
            <Menubar className="border-none">
              <MenubarMenu>
                <MenubarTrigger className="-p-1 bg-red-600 rounded-full transition-all data-[state=open]:bg-transparent data-[state=open]:ring-4 data-[state=open]:ring-gray-200 hover:ring-4 hover:ring-gray-200">
                  <Avatar className="cursor-pointer border-2 border-white ">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || ""}
                    />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent className="*:cursor-pointer" align="end">
                  <MenubarLabel>My Account</MenubarLabel>
                  <Link href={"/profile"}>
                    <MenubarItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </MenubarItem>
                  </Link>
                  <Link href={"/order"}>
                    <MenubarItem className="cursor-pointer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>My Order</span>
                    </MenubarItem>
                  </Link>
                  <MenubarItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </MenubarItem>
                  <MenubarItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </MenubarItem>
                  <MenubarItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Link
              href="/login"
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
