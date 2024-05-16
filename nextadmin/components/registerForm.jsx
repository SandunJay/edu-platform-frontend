"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./registerForm.module.css";
import Navbar from "./navbar";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8060/auth/api/v1/auth/register",
        formData
      );
      const { access_token, refresh_token, email, role } = response.data;

      // Set expiration date for the cookies (10 days)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 10);

      // Save tokens and user details in cookies with expiration date
      Cookies.set("access_token", access_token, { expires: expirationDate });
      Cookies.set("refresh_token", refresh_token, { expires: expirationDate });
      Cookies.set("email", email, { expires: expirationDate });
      Cookies.set("role", role, { expires: expirationDate });
      // Cookies.set("firstName", firstName, { expires: expirationDate });
      // Cookies.set("lastName", lastName, { expires: expirationDate });
      Cookies.set("isLoggedIn", "true", { expires: expirationDate });

      // Redirect based on role
      switch (role) {
        case "ADMIN":
          window.location.href = "/dashboard";
          break;
        case "USER":
          window.location.href = "/clientDashboard";
          break;
        case "INSTRUCTOR":
          window.location.href = "/instructor/dashboard";
          break;
        default:
          console.error("Unknown role:", role);
      }

      console.log(response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>Register</div>
          <form onSubmit={handleSubmit}>
            <label>
              User Name:
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="INSTRUCTOR">Instructor</option>
              </select>
            </label>
            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
