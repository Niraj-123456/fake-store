import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
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
import { Input } from "ui/components/ui/input";

const categories = [
  "Clothes",
  "Furniture",
  "Electronics",
  "Miscellaneous",
  "Shoes",
];

const ProductForm = () => {
  const form = useForm();
  const { control } = form;
  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-3">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    placeholder="Enter title..."
                    {...field}
                    className="py-3 w-full"
                  />
                </FormControl>
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
                    readOnly
                    placeholder="Enter description..."
                    {...field}
                    className="py-3 w-full"
                  />
                </FormControl>
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
                    readOnly
                    placeholder="Enter price..."
                    {...field}
                    className="py-3 w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price($)</FormLabel>
                <FormControl>
                  {/* <Input
                    readOnly
                    placeholder="Select category..."
                    {...field}
                    className="py-3 w-full"
                  /> */}
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
