import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "ui/components/ui/menubar";
import { Input } from "ui/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";
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

const Header = () => {
  const { data: session } = useSession();
  const { count } = useCartContext();
  return (
    <div className="w-full h-[var(--default-header-height)] py-4 px-8 ">
      <div className="flex justify-between items-center">
        <h1 className="inline-flex items-center gap-1 text-xl font-semibold">
          <span>
            <ShoppingBag />
          </span>
          Fake Store
        </h1>

        <div className="flex items-center gap-2">
          <div className="relative mr-4">
            <Input placeholder="Search..." className="pl-8 rounded-full" />
            <Search className="w-4 h-4 text-gray-400 absolute top-1/2 left-3 -translate-x-0 -translate-y-1/2" />
          </div>

          {/* shopping cart icon */}
          <div className="relative">
            <Link href={"/cart"}>
              <ShoppingCart
                className="cursor-pointer bg-gray-100 rounded-full p-2 w-10 h-10 transition-all duration-300 ease-in-out border-2 border-white
            hover:ring-4 hover:ring-gray-200"
              />
            </Link>
            <div className="flex items-center justify-center max-w-max h-4 rounded-xl bg-red-600 text-white font-semibold absolute -top-2 right-0 text-[10px] p-1">
              {count ? count : 0}
            </div>
          </div>
          {session ? (
            <Menubar className="border-none">
              <MenubarMenu>
                <MenubarTrigger className="-p-1 rounded-full transition-all data-[state=open]:bg-transparent data-[state=open]:ring-4 data-[state=open]:ring-gray-200 hover:ring-4 hover:ring-gray-200">
                  <Avatar className="cursor-pointer border-2 border-white ">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || ""}
                    />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>My Account</MenubarLabel>
                  <MenubarItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </MenubarItem>
                  <MenubarItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </MenubarItem>
                  <MenubarItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </MenubarItem>
                  <MenubarItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Link href="/login" className="text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
