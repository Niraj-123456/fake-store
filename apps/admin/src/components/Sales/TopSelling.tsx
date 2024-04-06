import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { imageURLCleaner } from "ui/lib/imageFormatter";
import axios from "axios";

const TopSelling = async () => {
  const { data: topSellingProducts } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/product/sales/top-selling`
  );

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
      <div className="flex flex-col">
        {topSellingProducts?.data?.map(
          (topSellingProduct: any, idx: number) => (
            <div
              key={topSellingProduct?._id}
              className="flex items-center gap-5 mt-8"
            >
              <div className="text-[#7979B2]">{idx + 1}</div>
              <div className="w-[54px] h-[54px] custom__border__radius__md relative overflow-hidden">
                <Image
                  src={imageURLCleaner(topSellingProduct?.images[0])}
                  alt="t-shirt"
                  fill
                  sizes={"54*54"}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p>{topSellingProduct?.title}</p>
                <p className="font-bold">$ {topSellingProduct?.price}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TopSelling;
