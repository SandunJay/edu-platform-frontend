// import Link from "next/link"
// import LogoutForm from "./logoutForm"
// // import LogoutForm from "./logoutForm"
// import { getSession } from "@/actions"

// const Navbar = async () => {
//   const session = await getSession()

//   console.log(session)
//   return (
//     <>
//     <nav>
//       <Link href="/">Homepage</Link>
//       {/* <Link href="/premium">Premium</Link> */}
//       <Link href="/profile">Profile</Link>
//       <Link href="/register">Register</Link>
//       {/* <Link href="/login">Login</Link> */}
//       {!session.isLoggedIn && (
//         <Link href="/login">
//           Login
//         </Link>
//       )}
//       {/* if a user logged in, show logout button */}
//       {session.isLoggedIn && <LogoutForm/>}
      
//     </nav>

//     </>
//   )
// }

// export default Navbar
"use client"
import Link from "next/link";
import LogoutForm from "./logoutForm";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
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
    <>
      <nav>
        {/* <Link href="/">Homepage</Link> */}
        {!isLoggedIn && <Link href="/">Homepage</Link>}
        {isLoggedIn && (
        <Link href="/profile">Profile</Link>
        )}
        {!isLoggedIn && (
        <Link href="/register">Register</Link>
        )}
        {/* Disable login button if user is logged in */}
        {!isLoggedIn && (
          <Link href="/login">
            Login
          </Link>
        )}
        {/* Show logout button if user is logged in */}
        {isLoggedIn && <LogoutForm />}
      </nav>
    </>
  );
};

export default Navbar;

