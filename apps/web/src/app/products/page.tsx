import Products from "@/components/products/Products";
import { Suspense } from "react";

const ProductsPage = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <div className="mt-12 w-full">
        <Products />
      </div>
    </Suspense>
  );
};

export default ProductsPage;
