"use client";
import { getHomeData } from "@/app/api/home";
import { useQuery } from "react-query";
import ProductCard from "../products/ProductCard";
import ProductImage from "../products/ProductImage";
import { Category, Product } from "@/types/product";
import Link from "next/link";
import CategoyCard from "../categories/CategoyCard";
import { Skeleton } from "ui/components/ui/skeleton";
import HomeBanner from "../banner/HomeBanner";

const Home = () => {
  const {
    data: homeData,
    isFetching,
    isLoading,
  } = useQuery("homeData", getHomeData);

  if (isFetching || isLoading) {
    return (
      <>
        <Skeleton className="w-full h-80" />

        <div className="mt-12">
          <Skeleton className="w-48 h-8" />
          <div className="flex gap-4 mt-8">
            {Array.from({ length: 5 }, (_, idx) => idx).map((idx) => (
              <Skeleton key={idx} className="w-full h-72" />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <Skeleton className="w-48 h-8" />
          <div className="flex gap-4 mt-8">
            {Array.from({ length: 5 }, (_, idx) => idx).map((idx) => (
              <Skeleton key={idx} className="w-full h-72" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HomeBanner banners={homeData?.data?.banners} />
      <section aria-label="recommended for you" className="mt-12 w-full">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-semibold">Recommended For You</h1>
          <Link href={"/products"} className="text-sm underline text-blue-800">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit, minmax(10em, 25em)] gap-4 gap-x-6 mt-4 overflow-hidden sm:grid-flow-col sm:auto-cols-fr">
          {homeData?.data?.recommended?.map((product: Product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <ProductCard
                image={
                  <ProductImage
                    image={product.images[0]}
                    alt={"product"}
                    className="w-full h-full"
                  />
                }
                info={
                  <div className="px-2 py-4">
                    <p className="line-clamp-2 max-h-12">{product.title}</p>
                    <p className="text-gray-600 pt-2">${product.price}</p>
                  </div>
                }
              />
            </Link>
          ))}
        </div>
      </section>

      {/* categories */}
      <section aria-label="categories" className="mt-12">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Link href={"/products"} className="text-sm underline text-blue-800">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit, minmax(10em, 25em)] gap-4 gap-x-6 mt-4 overflow-hidden sm:grid-flow-col sm:auto-cols-fr">
          {homeData?.data?.categories?.map((category: Category) => (
            <CategoyCard
              key={category._id}
              image={category.image}
              name={category.name}
            />
          ))}
        </div>
      </section>

      {/* new arrivals */}

      <section aria-label="new arrivals" className="mt-12">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">New Arrivals</h1>
          <Link href={"/products"} className="text-sm underline text-blue-800">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit, minmax(10em, 25em)] gap-4 gap-x-6 mt-4 overflow-hidden sm:grid-flow-col sm:auto-cols-fr">
          {homeData?.data?.newArrivals?.map((product: Product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <ProductCard
                image={
                  <ProductImage
                    image={product.images[0]}
                    alt={"product"}
                    className="w-full h-full"
                  />
                }
                info={
                  <div className="px-2 py-4">
                    <p className="line-clamp-2 max-h-12">{product.title}</p>
                    <p className="text-gray-600 pt-2">${product.price}</p>
                  </div>
                }
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
