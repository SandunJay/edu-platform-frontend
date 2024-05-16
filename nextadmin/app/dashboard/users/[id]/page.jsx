"use client";

import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const SingleOrderPage = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get the user ID from the params
        const userId = params.id;

        // Get the token from the cookie
        const token = Cookies.get("access_token");
        if (!token) {
          // Handle case when token is not available
          console.error("Access token not found in cookie");
          return;
        }

        // Fetch user data based on the user ID
        const response = await fetch(
          `http://localhost:8082/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle response
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div>Loading...</div>
      ) : userData ? (
        <>
          {/* <div className={styles.infoContainer}>
            <h1>User Details</h1>
            <p>User ID: {userData.id}</p>
            <p>
              User Name: {userData.firstname} {userData.lastname}
            </p>
            <p>Email: {userData.email}</p>
            <p>Role: {userData.role}</p>
            {/* Add more details as needed */}
          {/* </div>
          <div className={styles.formContainer}> */}
          {/* Form for editing user details */}
          {/* <form className={styles.form}>Form fields</form>
          // </div> */}

          <div className={styles.infoContainer}>User {userData.id}</div>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <label>User ID</label>
              <input type="text" placeholder={userData.id} />
              <label>First Name</label>
              <input type="text" placeholder={userData.firstname} />
              <label>Last Name</label>
              <input type="text" placeholder={userData.lastname} />
              <label>Email</label>
              <input type="text" placeholder={userData.email} />
              <label>Role</label>
              <input type="text" placeholder={userData.role} />
              <label>Status</label>
              <input type="text" placeholder="Save" />
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default SingleOrderPage;
