"use client";
import ProductModal from "./ProductModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/ui/table";
import { Search } from "lucide-react";
import CustomPagination from "ui/components/custom-pagination/CustomPagination";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "ui/components/ui/skeleton";
import useProducts from "@next/hooks/products/useProducts";
import { Suspense } from "react";

type Product = {
  _id: string;
  title: string;
  price: number;
  creationAt: string;
};

const Products = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page") || "1";

  const { fetching, products, metaData } = useProducts({ pageNumber });

  if (fetching) {
    return (
      <div className="mt-4 w-full">
        <Skeleton className="w-2/3 h-5" />
        <Skeleton className="w-1/2 h-5 mt-4" />
        <Skeleton className="w-1/4 h-5 mt-4" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end items-center gap-4">
        <div className="relative">
          <input
            name="search"
            className="w-[350px] pl-[19px] py-[10px] rounded-full bg-[#F3F6FF] focus:outline-none focus:ring-2 ring-[#5840bb]"
            placeholder="Search for products..."
          />
          <div className="absolute top-[50%] right-[10%] translate-x-2/4 -translate-y-2/4">
            <Search className="w-5 h-5" />
          </div>
        </div>

        <ProductModal />
      </div>

      {/* product table */}
      <div className="mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Rating</TableHead>
              <TableHead className="font-bold">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: Product) => (
              <TableRow
                key={product?._id}
                onClick={() =>
                  window.open(`http://localhost:3000/product/${product?._id}`)
                }
                className="cursor-pointer"
              >
                <TableCell>{product?.title}</TableCell>
                <TableCell>${product?.price}</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                  {new Date(product?.creationAt).toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/*pagination */}
      <div className="mt-4 p-2">
        <CustomPagination
          currentPage={Number(pageNumber)}
          itemsCount={metaData?.totalCount!}
          itemsPerPage={20}
          className="justify-end"
        />
      </div>
    </div>
  );
};

export default Products;
