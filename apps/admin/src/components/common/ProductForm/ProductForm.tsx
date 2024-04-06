"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "ui/components/ui/form";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
} from "ui/components/ui/select";
import { DialogClose, DialogFooter } from "ui/components/ui/dialog";
import { Input } from "ui/components/ui/input";
import { Button } from "ui/components/ui/button";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductSchema = z.object({
  title: z.string({ required_error: "Please enter product title." }),
  description: z.string(),
  price: z.number(),
  category: z.string(),
});

type Category = {
  _id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

const ProductForm = () => {
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
    },
  });
  const { control, handleSubmit } = form;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetching(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/category/list`
        );
        if (res.status === 200) {
          setCategories(res?.data?.data);
        }
        setFetching(false);
      } catch (err) {
        setFetching(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmitProduct = (values: z.infer<typeof ProductSchema>) => {
    console.log("values", values);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleSubmitProduct)}
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter title..."
                    className="py-3 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter description..."
                    className="py-3 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price($)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter price..."
                    className="py-3 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={categories.length <= 0 || fetching}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
