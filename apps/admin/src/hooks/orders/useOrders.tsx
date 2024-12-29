import { useEffect, useState } from "react";
import { getOrders } from "@next/app/api/order";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const res = await getOrders(1, 10);
        setOrders(res?.data);
      } catch (ex) {
        console.log("error", ex);
      } finally {
        setFetching(false);
      }
    };
    fetchOrderList();
  }, []);

  return { fetching, orders };
};

export default useOrders;
