export interface Product {
  _id: number;
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface Category {
  _id?: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}
