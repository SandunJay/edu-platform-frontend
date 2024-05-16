"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

import LogoutForm from "@/components/logoutForm";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const checkLoginStatus = () => {
      const isLoggedInCookie = Cookies.get("isLoggedIn");
      setIsLoggedIn(isLoggedInCookie === "true");
    };

    checkLoginStatus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.nav}>
          {/* <Link href="/">Homepage</Link> */}
          {!isLoggedIn && <Link href="/">Homepage</Link>}
          {isLoggedIn && <Link href="/profile">Profile</Link>}
          {!isLoggedIn && <Link href="/register">Register</Link>}
          {/* Disable login button if user is logged in */}
          {!isLoggedIn && <Link href="/login">Login</Link>}
          {/* Show logout button if user is logged in */}
          {isLoggedIn && <LogoutForm />}
        </div>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
