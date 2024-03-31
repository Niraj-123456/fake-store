import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "ui/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/ui/avatar";
import { LogOut, PlusCircle, Settings, User } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full h-[var(--default-header-height)] py-4 px-8 ">
      <div className="flex justify-between items-center">
        <h1>Fake Store</h1>

        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger className="-p-1 rounded-full transition-all data-[state=open]:bg-transparent data-[state=open]:ring-4 data-[state=open]:ring-gray-200 hover:ring-4 hover:ring-gray-200">
              <Avatar className="cursor-pointer border-2 border-white ">
                <AvatarImage src="https://" />
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
              <MenubarItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Header;
