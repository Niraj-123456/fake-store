"use client";
import { Suspense, useState } from "react";
import ProductRating from "../products/ProductRating";
import { Button } from "ui/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "ui/components/ui/form";
import { Minus, Plus } from "lucide-react";
import { Input } from "ui/components/ui/input";
import { useForm } from "react-hook-form";
import ProductImage from "../products/ProductImage";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { fetchProduct } from "@/api/products";
import { Product } from "@/types/product";
import { cn } from "ui/lib/utils";

const maxStockQuantity = 10;

type IFormInput = {
  quantity: number;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
  });
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const { control, setValue, watch, formState, handleSubmit } = form;

  const { defaultValues } = formState;

  const quantity = watch("quantity", defaultValues?.quantity);

  const { data, isFetching } = useQuery("product", () => fetchProduct(id));

  const product: Product = data?.data?.data;

  const handleUpdateSelectedImageIdx = (idx: number) => {
    setSelectedImageIdx(idx);
  };

  const onSubmit = (data: IFormInput) => {
    //
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:w-2/3 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {product?.images?.length > 0 && (
          <div className="flex flex-col gap-6 p-2">
            <ProductImage
              className="w-full h-96"
              image={product?.images[selectedImageIdx]}
              alt={product?.title}
              priority={true}
            />
            <div className="flex items-center justify-center gap-3">
              {product?.images?.map((image, idx) => (
                <div
                  onClick={() => handleUpdateSelectedImageIdx(idx)}
                  key={idx}
                  className={cn(
                    "rounded-md p-1 cursor-pointer transition-all hover:border-gray-800 hover:shadow-md",
                    idx === selectedImageIdx
                      ? "ring-2 ring-gray-800"
                      : "ring-1 ring-gray-400"
                  )}
                >
                  <ProductImage
                    image={image}
                    alt={product.title}
                    className="w-20 h-20"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product?.title}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product?.price}
            </p>
          </div>

          {/* Reviews */}
          <div className="mt-3">
            <ProductRating rating={{ rate: 4, count: 140 }} />
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>

            <div
              className="space-y-6 text-base text-gray-700"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>

          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 items-center">
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="text-lg"
                    onClick={() => setValue("quantity", quantity - 1)}
                    disabled={quantity === 1}
                  >
                    <Minus />
                  </Button>
                  <FormField
                    control={control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            readOnly
                            placeholder="Quantity"
                            {...field}
                            className="py-3 text-lg max-w-sm w-40"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    className="text-lg"
                    size={"sm"}
                    onClick={() => setValue("quantity", quantity + 1)}
                    disabled={quantity === maxStockQuantity}
                  >
                    <Plus />
                  </Button>
                </div>
                <div className="mt-6 flex gap-2 flex-col sm:flex-row">
                  <Button
                    size={"lg"}
                    type="submit"
                    className="bg-indigo-600 text-base  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add To Cart
                  </Button>

                  <Button
                    variant={"outline"}
                    size={"lg"}
                    type="submit"
                    className="text-base  sm:w-full"
                  >
                    Buy Now
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-sm font-medium text-gray-900">Features</h2>

            <div className="prose prose-sm mt-4 text-gray-500">
              <ul role="list">
                <li>Only the best materials</li>
                <li>Ethically and locally made</li>
                <li>Pre-washed and pre-shrunk</li>
                <li>Machine wash cold with similar colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
