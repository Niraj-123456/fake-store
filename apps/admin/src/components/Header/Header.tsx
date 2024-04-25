"use client";
import { Bell, ShoppingBag } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "ui/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "ui/components/ui/menubar";
import { User, Settings, LogOut } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center py-4 px-8">
      <div className="flex item-center gap-2 text-[#42427D]">
        <ShoppingBag className="w-6 h-8" />
        <h1 className="text-2xl font-semibold subpixel-antialiased">
          Fake Store
        </h1>
      </div>
      <div className="flex flex-1 justify-end gap-4 items-center">
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger className="-p-1 rounded-full transition-all data-[state=open]:bg-transparent data-[state=open]:ring-2 data-[state=open]:ring-[#5840bb] hover:ring-2 hover:ring-[#5840bb]">
              <div className="p-2.5 cursor-pointer border-2 border-white bg-gray-100 rounded-full">
                <Bell className="w-4 h-4" />
              </div>
            </MenubarTrigger>
            <MenubarContent
              className="p-4
            "
            >
              <MenubarLabel className="flex justify-between items-center mb-4">
                Notifications
                <Settings className="w-4 h-4 cursor-pointer" />
              </MenubarLabel>
              <MenubarItem>
                <Avatar>
                  <AvatarImage src="https://www." />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 ml-2">
                  <p>
                    <strong>Jhon Doe</strong> added a new product
                  </p>
                  <p className="text-xs text-muted-foreground">
                    10 minutes ago
                  </p>
                </div>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Menubar className="border-none -left-8">
          <MenubarMenu>
            <MenubarTrigger className="-p-1 rounded-full transition-all data-[state=open]:bg-transparent data-[state=open]:ring-2 data-[state=open]:ring-[#5840bb] hover:ring-2 hover:ring-[#5840bb]">
              <Avatar className="w-10 h-10 cursor-pointer border-2 border-white">
                <AvatarImage src="/images/profile.webp" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>nirajlama@gmail.com</MenubarLabel>
              <MenubarSeparator />
              <MenubarItem>
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </MenubarItem>
              <MenubarItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </MenubarItem>
              <MenubarItem>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Header;
