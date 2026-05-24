"use client";
import { useState } from "react";
import ProductRating from "../products/ProductRating";
import { Button } from "ui/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "ui/lib/components/ui/form";
import { Minus, Plus } from "lucide-react";
import { Input } from "ui/lib/components/ui/input";
import { Skeleton } from "ui/lib/components/ui/skeleton";
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
import useCartContext from "@/context/CartContext";

const maxStockQuantity = 10;

type IFormInput = {
  quantity: number;
};

const ProductDetail = () => {
  const { data: user } = useSession();
  const { id } = useParams<{ id: string }>();
  const { handleUpdateCartItem, handleUpdateCartItemCount } = useCartContext();
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
      image: product.images[0],
      name: product.title,
      price: product.price,
    };
    try {
      const res = await addToCart(cartObj);
      if (res.status === 201) {
        toast.success("Product successfully added to cart.");
        handleUpdateCartItem(res?.data);
        handleUpdateCartItemCount(quantity, "INCREMENT");
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
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {product?.images?.length > 0 && (
          <div className="flex flex-col gap-6 p-2">
            <div className="relative w-full h-[490px] group overflow-hidden rounded-3xl">
              <ProductImage
                className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                image={product?.images[selectedImageIdx]}
                alt={product?.title}
                priority={true}
              />
            </div>
            <div className="flex items-center gap-3">
              {product?.images?.map((image, idx) => (
                <div
                  onClick={() => handleUpdateSelectedImageIdx(idx)}
                  key={idx}
                  className={cn(
                    "rounded-2xl relative w-20 h-20 p-1 cursor-pointer transition-all border-2",
                    idx === selectedImageIdx
                      ? "ring-4 ring-blue-50 border-blue-600"
                      : "border-transparent hover:border-slate-300",
                  )}
                >
                  <div className="w-full h-full overflow-hidden relative">
                    <ProductImage
                      image={image}
                      alt={product.title}
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          {/* Reviews */}
          <div className="space-y-2">
            <div className="mt-3">
              <ProductRating rating={{ rate: 4, count: 140 }} />
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {product?.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold text-blue-600">
                ${product?.price}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>

            <div
              className="text-slate-500 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>

          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-6 items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Quantity
                  </span>
                  <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"sm"}
                      className="text-lg hover:opacity-50 transition-all duration-300"
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
                              className="py-3 text-lg max-w-sm w-10 border-none shadow-none"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="text-lg hover:opacity-50 transition-all duration-300"
                      size={"sm"}
                      onClick={() => setValue("quantity", quantity + 1)}
                      disabled={quantity === maxStockQuantity}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <div className="mt-6 flex gap-2 flex-col sm:flex-row">
                  <Button
                    disabled={addingToCart}
                    size={"lg"}
                    type="submit"
                    className="text-base focus:outline-none rounded-full h-14 sm:w-full"
                  >
                    {addingToCart ? "..." : "Add To Cart"}
                  </Button>

                  <Button
                    disabled={addingToCart}
                    variant={"outline"}
                    size={"lg"}
                    type="submit"
                    className="text-base rounded-full h-14  sm:w-full"
                  >
                    Buy Now
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Highlights
            </h3>

            <div className="prose prose-sm mt-4 text-gray-500">
              <ul
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6"
              >
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-blue-600">●</span> 40h Only the best
                  materials
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-blue-600">●</span> Ethically and locally
                  made
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-blue-600">●</span> Pre-washed and
                  pre-shrunk
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-blue-600">●</span> Machine wash cold
                  with similar colors
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
