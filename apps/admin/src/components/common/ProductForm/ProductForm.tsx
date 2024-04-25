"use client";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Plus, X } from "lucide-react";
import { DialogClose, DialogFooter } from "ui/components/ui/dialog";
import { Input } from "ui/components/ui/input";
import { Button } from "ui/components/ui/button";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductSchema = z.object({
  title: z.string({
    required_error: "Please enter product title",
    invalid_type_error: "Product title must be a string",
  }),
  description: z.string().optional(),
  price: z.string({
    required_error: "Please enter price",
  }),
  images: z.string().array(),
  category: z.string({
    required_error: "Please select a category",
    invalid_type_error: "Category must be a string",
  }),
});

type Product = z.infer<typeof ProductSchema>;

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
  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    mode: "onSubmit",
  });

  const { control, handleSubmit } = form;

  //@ts-ignore
  const { fields, append, remove } = useFieldArray({ name: "images", control });

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

  const handleSubmitProduct = async (values: Product) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
        values
      );
      if (res.status === 200) {
        //
      }
    } catch (ex) {
      //
    }
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
          <div className="w-full">
            {fields.map((field, idx) => (
              <FormField
                key={field.id}
                control={control}
                name={`images.${idx}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images URL</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter image URL"
                          className="py-3 w-full"
                        />
                      </FormControl>

                      {idx !== 0 && (
                        <Button
                          size={"sm"}
                          type="button"
                          variant={"destructive"}
                          className="w-7 h-7 font-bold rounded-full p-1"
                          onClick={() => remove(idx)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              size={"sm"}
              type="button"
              className="w-max h-5 mt-2 text-xs rounded-sm"
              onClick={() => append("")}
            >
              Add image URL
              <Plus className="w-4 h-4" />
            </Button>
          </div>
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
                        <SelectItem
                          key={category._id}
                          value={JSON.stringify(category)}
                        >
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
