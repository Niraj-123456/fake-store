"use client";
import axios from "axios";
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
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "ui/components/ui/skeleton";

type Product = {
  _id: string;
  title: string;
  price: number;
  creationAt: string;
};

type ProductMetaData = {
  totalCount: number;
  offset: number;
  limit: number;
};

const Products = () => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page") || "1";
  const [fetching, setFetching] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [metaData, setMetaData] = useState<ProductMetaData>();

  useEffect(() => {
    const fetchProducts = async () => {
      setFetching(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/product/list?offset=${Number(
            pageNumber
          )}&limit=20`
        );
        setFetching(false);
        if (res.status === 200) {
          setProducts(res?.data?.data?.data);
          setMetaData(res?.data?.data?.metadata);
        }
      } catch (err: any) {
        setFetching(false);
      }
    };
    fetchProducts();
  }, [pageNumber]);

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
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: Product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
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
