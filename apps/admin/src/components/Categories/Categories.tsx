import Image from "next/image";
import React from "react";
import CategoryCard from "../common/CategoryCard";
import axios from "axios";

type Category = {
  _id: string;
  name: string;
  image: string;
  creationDate: string;
  updatedAt: string;
};

const Categories = async () => {
  const { data: categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category/list`
  );

  return (
    <div className="mt-3 grid grid-cols-5 gap-4">
      {categories?.data?.map((category: Category) => (
        <CategoryCard
          key={category._id}
          image={category?.image}
          name={category?.name}
        />
      ))}
    </div>
  );
};

export default Categories;
