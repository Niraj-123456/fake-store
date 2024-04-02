"use client";
import React, { useEffect, useState } from "react";
import { Button } from "ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "ui/components/ui/dialog";

type Product = {
  _id: string;
  title: string;
  price: number;
};

const Products = async () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      fetch("http://localhost:3001/api/product/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(async (response) => {
          const { data } = await response.json();
          setProducts(data.data);
        })
        .catch((err) => console.log("error", err));
    };

    fetchProducts();
  }, []);

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Add new product</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: Product) => (
            <tr key={product._id}>
              <td className="p-1">{product.title}</td>
              <td className="p-1">${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
