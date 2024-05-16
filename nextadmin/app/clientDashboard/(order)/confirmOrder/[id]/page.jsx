"use client";
import styles from "@/app/ui/clientDashboard/order/order.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const ConfirmCourse = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const courseId = params.id;
  const userId = "100";
  const orderDate = new Date();

  const handleConfirm = async () => {
    try {
      // First, create the order
      const orderResponse = await fetch("http://localhost:8091/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          userId,
          orderDate,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Network response was not ok");
      }

      // Then, create the Stripe payment session
      const paymentResponse = await fetch(
        "http://localhost:8082/payment/create-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: course.price * 100, // Stripe expects the amount in cents
            productDescription: `Course ID: ${courseId}`,
          }),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const paymentData = await paymentResponse.json();

      console.log("paymentData:", paymentData);

      // Finally, redirect to the Stripe URL
      window.location.href = paymentData.url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8093/api/course/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const course = await response.json();
        setCourse(course);
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
      <div className={styles.top}>
        <h1>Note</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.order}>
          <div className={styles.orderItem}>
            <div className={styles.orderItemLabel}>Course Name</div>
            <div className={styles.orderItemValue}>{course.name}</div>
          </div>
          <div className={styles.orderItem}>
            <div className={styles.orderItemLabel}>Course Code</div>
            <div className={styles.orderItemValue}>{course.courseId}</div>
          </div>
          <div className={styles.orderItem}>
            <div className={styles.orderItemLabel}>Course Author</div>
            <div className={styles.orderItemValue}>{course.author}</div>
          </div>
          <div className={styles.orderItem}>
            <div className={styles.orderItemLabel}>Price</div>
            <div className={styles.orderItemValue}>{course.price}</div>
          </div>
          <div className={styles.orderItem}>
            <div className={styles.orderItemLabel}>Status</div>
            <div className={styles.orderItemValue}>pending</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.button} onClick={handleConfirm}>
            Confirm
          </button>

          <Link href="/clientDashboard/confirmCourse">
            <button className={styles.button}>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCourse;

// import React, { useEffect, useState } from 'react';

// const YourComponent = () => {
//   const [loading, setLoading] = useState(true);
//   const courseId = '123'; // Replace this with the actual course ID

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8091/api/v1/order', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ courseIds: [courseId] }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render your component here...
// };

// export default YourComponent;
