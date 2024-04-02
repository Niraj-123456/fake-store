import { Bell, ShoppingBag } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "ui/components/ui/avatar";

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
        <div className="bg-[#F3F6FF] p-2 rounded-full cursor-pointer border-2 border-white hover:ring-2 ring-[#5840bb]">
          <Bell />
        </div>

        <Avatar className="w-10 h-10 cursor-pointer border-2 border-white hover:ring-2 hover:ring-[#5840bb] bg-[#F3F6FF]">
          <AvatarImage src="/images/profile.webp" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
