// import { logout } from "@/actions"

// const LogoutForm = () => {
//   return (
//     <form action={logout}>

//       <button>logout</button>
//     </form>
//   )
// }

// export default LogoutForm

// const LogoutForm = () => {
//   return (
//     <form action={logout}>
//       <button>logout</button>
//     </form>
//   )
// }

// export default LogoutForm

import React from "react";
import Cookies from "js-cookie";

const LogoutForm = () => {
  const handleLogout = () => {
    // Remove the isLoggedIn cookie
    Cookies.remove("isLoggedIn");

    // Set the isLoggedIn cookie to false
    Cookies.set("isLoggedIn", "false");

    // Redirect to the logout URL
    window.location.href = "http://localhost:8082/api/v1/auth/logout";
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        style={{
          display: "block",
          margin: "0 auto",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          border: "none",
          color: "#fff",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutForm;
