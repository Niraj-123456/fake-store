import { fetchCartItemCount } from "@/app/api/cart";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

type CartContextProps = {
  count: number;
  handleUpdateCartItemCount: (qty: number) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [count, setCount] = useState(0);

  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  useQuery("cartItemCount", () => fetchCartItemCount(userId), {
    enabled: !!userId,
    onSuccess: (data) => setCount(data?.data?.count),
    onError: () => setCount(0),
    retry: 2,
  });

  const handleUpdateCartItemCount = (qty: number) => {
    setCount((prev) => prev + qty);
  };

  return (
    <CartContext.Provider value={{ count, handleUpdateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("Cart Provider must be use within Cart Context");

  return context;
};

export default useCartContext;
