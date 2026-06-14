import { fetchCartItems } from "@/app/api/cart";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

type CartActionType = "INCREMENT" | "DECREMENT";

type CartContextProps = {
  fetching: boolean;
  cartItem: any;
  count: number;
  handleUpdateCartItem: (item: any) => void;
  handleUpdateCartItemCount: (qty: number, action: CartActionType) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItem, setCartItem] = useState<any | null>(null);
  const [count, setCount] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(true);

  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  useQuery("cartItems", () => fetchCartItems(userId), {
    enabled: !!userId,
    onSuccess: (data) => {
      setFetching(false);
      setCartItem(data?.data);
      setCount(
        data?.data?.products?.reduce((acc: number, product: any) => {
          return acc + product?.quantity;
        }, 0),
      );
    },
    onError: () => {
      setFetching(false);
      setCartItem(null);
      setCount(0);
    },
  });

  const handleUpdateCartItem = (item: any) => {
    setCartItem(item);
  };

  const handleUpdateCartItemCount = (
    qty: number,
    action: "INCREMENT" | "DECREMENT",
  ) => {
    if (action === "INCREMENT") setCount((prev) => prev + qty);
    else setCount((prev) => (prev > 0 ? prev - qty : 0));
  };

  return (
    <CartContext.Provider
      value={{
        fetching,
        cartItem,
        count,
        handleUpdateCartItem,
        handleUpdateCartItemCount,
      }}
    >
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
