import Products from "@next/components/Products/Products";
import { Suspense } from "react";

const ProductsPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Products />
    </Suspense>
  );
};

export default ProductsPage;
