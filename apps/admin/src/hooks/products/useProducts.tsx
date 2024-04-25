import axios from "axios";
import React, { useEffect, useState } from "react";

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

type ProductHookProps = {
  pageNumber?: string;
};

const useProducts = ({ pageNumber }: ProductHookProps) => {
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

  return {
    products,
    metaData,
    fetching,
  };
};

export default useProducts;
