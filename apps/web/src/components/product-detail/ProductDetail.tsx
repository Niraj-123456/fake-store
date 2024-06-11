"use client";
import { useState } from "react";
import ProductRating from "../products/ProductRating";
import { Button } from "ui/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "ui/components/ui/form";
import { Minus, Plus } from "lucide-react";
import { Input } from "ui/components/ui/input";
import { Skeleton } from "ui/components/ui/skeleton";
import { useForm } from "react-hook-form";
import ProductImage from "../products/ProductImage";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { fetchProduct } from "@/app/api/products";
import { Product } from "@/types/product";
import { cn } from "ui/lib/utils";
import { addToCart } from "@/app/api/cart";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const maxStockQuantity = 10;

type IFormInput = {
  quantity: number;
};

const ProductDetail = () => {
  const { data: user } = useSession();
  console.log("user", user);
  const { id } = useParams<{ id: string }>();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  const { data, isFetching } = useQuery("product", () => fetchProduct(id));

  const product: Product = data?.data;

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const { control, setValue, watch, formState, handleSubmit } = form;

  const { defaultValues } = formState;

  const quantity = watch("quantity", defaultValues?.quantity);

  const handleUpdateSelectedImageIdx = (idx: number) => {
    setSelectedImageIdx(idx);
  };

  const onSubmit = async (data: IFormInput) => {
    setAddingToCart(true);
    const cartObj = {
      ...data,
      //@ts-ignore
      userId: user?.user?.id,
      productId: id,
      name: product.title,
      price: product.price,
    };
    try {
      const res = await addToCart(cartObj);
      if (res.status === 201) {
        toast.success("Product added successfully");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setAddingToCart(false);
    }
  };

  if (isFetching) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:w-2/3 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Skeleton className="w-full h-96" />
          <div className="flex flex-col gap-6 p-2">
            <Skeleton className="w-96 h-7" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-3/4 h-3" />
            <Skeleton className="w-3/5 h-3" />
            <Skeleton className="w-1/2 h-3" />
            <Skeleton className="w-1/4 h-3" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex gap-2 mt-8">
              <Skeleton className="w-full h-10" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-4">
          <Skeleton className="w-48 h-7" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-3/4 h-3" />
          <Skeleton className="w-3/5 h-3" />
          <Skeleton className="w-1/4 h-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:w-2/3 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {product?.images?.length > 0 && (
          <div className="flex flex-col gap-6 p-2">
            <div className="relative w-full h-[490px]">
              <ProductImage
                className="w-full h-full"
                image={product?.images[selectedImageIdx]}
                alt={product?.title}
                priority={true}
              />
            </div>
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
                  <div className="relative w-20 h-20">
                    <ProductImage
                      image={image}
                      alt={product.title}
                      className="w-full h-full"
                    />
                  </div>
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
                    type="button"
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
                    type="button"
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
                    disabled={addingToCart}
                    size={"lg"}
                    type="submit"
                    className="bg-indigo-600 text-base  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    {addingToCart ? "..." : "Add To Cart"}
                  </Button>

                  <Button
                    disabled={addingToCart}
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
