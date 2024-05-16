"use client";
import { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/orders/singleOrder/singleOrder.module.css";

const SingleOrderPage = ({ params }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8091/api/v1/order/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const order = await response.json();
        setOrder(order);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>Order ID = {order.id}</div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Order ID</label>
          <input type="text" placeholder={order.id} />
          <label>Order Number</label>
          <input type="text" placeholder={order.orderNumber} />
          <label>User ID</label>
          <input type="text" placeholder={order.userId} />
          <label>Price</label>
          <input type="text" placeholder={order.totalPrice} />
          <label>Order Date</label>
          <input type="text" placeholder={order.orderDate} />
        </form>
      </div>
    </div>
  );
};

export default SingleOrderPage;
