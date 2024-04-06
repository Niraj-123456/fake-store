import React from "react";
import { Button } from "ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/ui/dialog";
import { Plus } from "lucide-react";
import ProductForm from "../common/ProductForm/ProductForm";

const ProductModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="pr-1" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add a new product</DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
