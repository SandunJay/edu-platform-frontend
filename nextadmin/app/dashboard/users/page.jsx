"use client"
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Cookies from "js-cookie";

const UsersPage = () => {
  const USERS_API_BASE_URL = "http://localhost:8082/api/users";
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get the token from the cookie
        const token = Cookies.get("access_token");
        if (!token) {
          // Handle case when token is not available
          console.error("Access token not found in cookie");
          return;
        }

        const response = await fetch(USERS_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await response.json();
        setUsers(usersData);
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
        <Search placeholder={"Search a user"} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Password</td>
            <td>Role</td>
          </tr>
        </thead>
        {!loading && users && (
          <tbody className="bg-white">
            {users.map((user) => (
              <User user={user} key={user.id} />
            ))}
          </tbody>
        )}
      </table>
      <Pagination />
    </div>
  );
};

function User({ user }) {
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.role}</td>
      <td>
        <div className={styles.buttons}>
          {/* <Link href="/dashboard/users/test">
            <button className={`${styles.button} ${styles.view}`}>View</button>
          </Link> */}

          <Link href={`/dashboard/users/${user.id}`}>
            <button className={`${styles.button} ${styles.view}`}>View</button>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default UsersPage;

// import Search from "@/app/ui/dashboard/search/search";
// import styles from "@/app/ui/dashboard/users/users.module.css";
// import Link from "next/link";
// import Image from "next/image";
// import React , {useState, useEffect} from "react";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";

// const UsersPage = () => {
//   const USERS_API_BASE_URL = "http://localhost:8082/api/users";
//   const [users, setUsers] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(USERS_API_BASE_URL, {
//           method: "GET",
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${access_token}`, // Assuming access_token is available
//           },
//         });
//         const users = await response.json();
//         setUsers(users);
//       } catch (error) {
//         console.log(error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder={"Search a user"} />
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>ID</td>
//             <td>First Name</td>
//             <td>Last Name</td>
//             <td>Email</td>
//             <td>Password</td>
//             <td>Role</td>
//             <td>Action</td> {/* Add Action column */}
//           </tr>
//         </thead>
//         {!loading && users && (
//           <tbody className="bg-white">
//             {users?.map((user) => (
//               <User user={user} key={user.id} />
//             ))}
//           </tbody>
//         )}
//       </table>
//       <Pagination />
//     </div>
//   );
// };

// function User({ user }) {
//   return (
//     <tr key={user.id}>
//       <td>{user.id}</td>
//       <td>{user.firstname}</td>
//       <td>{user.lastname}</td>
//       <td>{user.email}</td>
//       <td>{user.password}</td>
//       <td>{user.role}</td>
//       <td>
//         {/* Pass user ID as a parameter to the Single User page */}
//         <Link href={`/dashboard/users/${user.id}`}>
//           <button className={`${styles.button} ${styles.view}`}>View</button>
//         </Link>
//       </td>
//     </tr>
//   );
// }

// export default UsersPage;

