import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "ui/components/ui/form";
import { Input } from "ui/components/ui/input";

const ProductForm = () => {
  const form = useForm();
  const { control } = form;
  return (
    <div>
      <Form {...form}>
        <form>
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
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
