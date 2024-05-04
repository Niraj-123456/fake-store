import Image from "next/image";
import type { Category } from "@/types/product";

const CategoyCard = ({ image, name }: Category) => {
  return (
    <div className="w-full h-full border rounded-md cursor-pointer hover:shadow-md overflow-hidden transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-40">
      <div className="w-full h-64 relative -z-10 bg-white overflow-hidden grid place-items-center">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100%"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6 justify-center font-semibold">{name}</div>
    </div>
  );
};

export default CategoyCard;
