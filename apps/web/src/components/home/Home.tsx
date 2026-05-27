"use client";
import { getHomeData } from "@/app/api/home";
import { useQuery } from "react-query";
import ProductCard from "../products/ProductCard";
import ProductImage from "../products/ProductImage";
import { Category, Product } from "@/types/product";
import Link from "next/link";
import CategoyCard from "../categories/CategoyCard";
import { Skeleton } from "ui/lib/components/ui/skeleton";
import HomeBanner from "../banner/HomeBanner";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { writeToLocalStorage } from "@/lib/localStorage";

const Home = () => {
  const { data: session } = useSession();
  const {
    data: homeData,
    isFetching,
    isLoading,
  } = useQuery("homeData", getHomeData);

  useEffect(() => {
    if (session) {
      //@ts-ignore
      writeToLocalStorage("accessToken", session?.access_token);
    }
  }, [session]);

  if (isFetching || isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
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
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {homeData?.data?.banners?.length > 0 && (
        <HomeBanner banners={homeData?.data?.banners || []} />
      )}

      <section aria-label="recommended for you" className="mt-12 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Recommended For You
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Based on your recent browsing.
            </p>
          </div>
          <Link
            href={"/products"}
            className="ttext-sm font-bold text-blue-600 hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeData?.data?.recommended?.map((product: Product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <ProductCard
                image={
                  <ProductImage image={product.images[0]} alt={"product"} />
                }
                info={
                  <div className="px-2">
                    <h4 className="font-bold text-slate-800 mb-1">
                      {product.title}
                    </h4>
                    <p className="text-slate-400 text-xs mb-4">
                      Footwear • Crimson Red
                    </p>
                    <span className="text-2xl font-black text-slate-900">
                      ${product.price}
                    </span>
                  </div>
                }
              />
            </Link>
          ))}
        </div>
      </section>

      {/* categories */}
      <section aria-label="categories" className="mt-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Categories</h2>
          <Link
            href={"/products"}
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="flex gap-10 overflow-x-auto hide-scrollbar pb-4 px-2">
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
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              New Arrivals
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">
              The latest drops from our curated global brands.
            </p>
          </div>
          <Link
            href={"/products"}
            className="ttext-sm font-bold text-blue-600 hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </div>
  );
};

export default Home;
