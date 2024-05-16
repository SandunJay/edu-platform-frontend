// import LoginForm from "@/components/loginForm";

// const LoginPage = () => {
//     return (
//       <div className="login">
//         <h1>Welcome to the login page</h1>
//         <LoginForm />
//       </div>
//     );
// }
// export default LoginPage

"use client"
import React, { useState } from 'react';
import LoginForm from '../components/loginForm'; 



const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <div  style={{ margin: 0, padding: 0, border: 0, backgroundColor: "#0B7E97" }}>
      
      {!isLoggedIn ? (
        <>
        {/* <LoginForm setIsLoggedIn={setIsLoggedIn} /> */}

        < LoginForm />

        </>

      ) : (
        <>
        <p>You are already logged in!</p>
        
    </>
      )}
    </div>
  );
};

export default LoginPage;
