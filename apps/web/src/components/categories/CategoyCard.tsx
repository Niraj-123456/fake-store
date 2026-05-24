import Image from "next/image";
import type { Category } from "@/types/product";

const CategoyCard = ({ image, name }: Category) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 shrink-0 group cursor-pointer">
      <div className="p-1 border-2 border-slate-100 rounded-full group group-hover:border-slate-900 transition-all">
        <div className="w-24 h-24 rounded-full bg-white relative">
          <Image
            src={image}
            alt={name}
            fill
            sizes="100%"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900">
        {name}
      </span>
    </div>
  );
};

export default CategoyCard;
