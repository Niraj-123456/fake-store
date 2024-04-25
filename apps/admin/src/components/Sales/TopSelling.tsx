"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { imageURLCleaner } from "ui/lib/imageFormatter";
import { Skeleton } from "ui/components/ui/skeleton";
import axios from "axios";

const TopSelling = () => {
  const [fetching, setFetching] = useState(true);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    const handleFetchProducts = async () => {
      setFetching(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/product/sales/top-selling`
        );
        if (res.status === 200) {
          setFetching(false);
          setTopSellingProducts(res?.data?.data);
        } else {
          setFetching(false);
        }
      } catch (err) {
        //
      }
    };
    handleFetchProducts();
  }, []);

  if (fetching) {
    return (
      <div className="flex flex-col gap-8 mt-4 w-96 max-w-96">
        {Array.from({ length: 5 }, (_, idx) => idx).map((number) => (
          <div key={number} className="flex items-center gap-5 w-full">
            <Skeleton className="w-[54px] h-[54px] rounded-sm" />
            <div className="w-full">
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-1/2 h-4 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-96 w-96">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Top selling products</h1>
        <div className="flex items-center text-md font-semibold">
          See all
          <span>
            <ChevronRight />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-4">
        {topSellingProducts?.map((topSellingProduct: any, idx: number) => (
          <div key={topSellingProduct?._id} className="flex items-center gap-5">
            <div className="text-[#7979B2]">{idx + 1}</div>
            <div className="w-[54px] h-[54px] rounded-sm relative overflow-hidden">
              <Image
                src={imageURLCleaner(topSellingProduct?.images[0])}
                alt="t-shirt"
                fill
                sizes={"54*54"}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div>
              <p>{topSellingProduct?.title}</p>
              <p className="font-bold">$ {topSellingProduct?.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
