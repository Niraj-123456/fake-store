"use client";
import { useEffect, useState } from "react";
import CategoryCard from "../common/CategoryCard";
import axios from "axios";

type Category = {
  _id: string;
  name: string;
  image: string;
  creationDate: string;
  updatedAt: string;
};

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleFetchCategory = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/category/list`
        );
        if (res.status === 200) {
          setCategories(res?.data?.data);
        }
      } catch (err) {
        //
      }
    };
    handleFetchCategory();
  }, []);

  return (
    <div className="mt-3 grid grid-cols-5 gap-4">
      {categories?.map((category: Category) => (
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
