import Image from "next/image";
import React from "react";
import { Card, CardContent, CardFooter } from "ui/components/ui/card";

type CategoryCard = {
  image: string;
  name: string;
};

const CategoryCard = ({ image, name }: CategoryCard) => {
  return (
    <Card className="rounded-md cursor-pointer hover:shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full h-32 relative">
          <Image
            src={image}
            alt=""
            fill
            sizes="100%*100%"
            className="object-cover object-center"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 justify-center font-semibold">
        {name}
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
