"use client";
import React from "react";
import ProductCard from "./ProductCard";
import ProductImage from "./ProductImage";
import { imageFormatter } from "@/lib/imageFormatter";
import ProductInfo from "./ProductInfo";
import ProductRating from "./ProductRating";
import ProductAction from "./ProductAction";
import Link from "next/link";
import { fetchProducts } from "@/api/products";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import ProductCardSkeleton from "../common/loading/ProductCardSkeleton";
import Pagination from "../common/pagination/Pagination";

const pageSize = 20;
const totalProductCount = 200;

const Products = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1");

  const handleChangePageNmuber = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return params;
  };

  const { data: products, isFetching } = useQuery(
    ["products", currentPage],
    () => fetchProducts(currentPage, pageSize),
    {
      retry: 2,
    }
  );

  if (isFetching) {
    return (
      <div className="grid place-items-center grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 15 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid place-items-center grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {products?.data?.data?.data?.map((product: Product) => (
          <Link key={product.id} href={`/product/${product._id}`}>
            <ProductCard
              image={
                <ProductImage
                  className="w-full h-[256px]"
                  image={imageFormatter(product.images[0])}
                  alt={product.title}
                  priority={true}
                />
              }
              info={
                <ProductInfo>
                  <h1
                    className="text-lg font-bold line-clamp-2"
                    title={product.title}
                  >
                    {product.title}
                  </h1>

                  <div className="py-1 mt-1">
                    <ProductRating rating={{ rate: 4, count: 240 }} />
                  </div>
                  {/* <p className="pt-1 text-gray-500 line-clamp-4">
                  {product.description}
                </p> */}
                  <p className="pt-2 text-lg">${product.price}</p>
                </ProductInfo>
              }
              action={<ProductAction />}
            />
          </Link>
        ))}
      </div>
      {totalProductCount > pageSize && (
        <div className="p-2 flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            onChangePageNumber={handleChangePageNmuber}
            itemsCount={totalProductCount}
            itemsPerPage={pageSize}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
