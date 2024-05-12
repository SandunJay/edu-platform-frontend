"use client";
import Search from "@/src/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/courses/courses.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pagination from "@/src/app/ui/dashboard/pagination/pagination";

const OrdersPage = () => {
  const ORDERS_API_BASE_URL = "http://localhost:8091/api/v1/order";
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(ORDERS_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const orders = await response.json();
        setOrders(orders);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search a order"} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Order ID</td>
            <td>Order Number</td>
            <td>Code</td>
            <td>User ID</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Order Date</td>
          </tr>
        </thead>
        {!loading && orders && (
          <tbody className="bg-white">
            {orders?.map((order) => (
              <Order order={order} key={order.id} />
            ))}
          </tbody>
        )}
      </table>
      <Pagination />
    </div>
  );
};

function Order({ order }) {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.orderNumber}</td>
      <td>{order.skuCode}</td>
      <td>{order.userId}</td>
      <td>{order.price}</td>
      <td>{order.quantity}</td>
      <td>{order.orderDate}</td>
      <td>
        <div className={styles.buttons}>
          <Link href="/dashboard/orders/test">
            <button className={`${styles.button} ${styles.view}`}>View</button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default OrdersPage;
