// "use client"

// import { login } from "@/actions";
// import { useFormState } from "react-dom";
// //import { useFormState } from "formik";


// const LoginForm = () => {
//  // const [state, formAction] = useFormState<any ,FormData>(login, undefined);
//   const [state, formAction] = useFormState(login, undefined);

//   return (
//     <form action={formAction}>
//       <input type="text" name="username" required placeholder="username" />
//       <input type="password" name="password" required placeholder="password" />
//       <button>Login</button>
//       {state?.error && <p>{state.error}</p>}
//     </form>
//   );
// };

// export default LoginForm;
// components/LoginForm.jsx

"use client"

// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';

// const LoginForm = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8082/api/v1/auth/login', formData);
//       const { accessToken, refreshToken, role } = response.data;
//       // Save tokens in cookies
//       Cookies.set('accessToken', accessToken);
//       Cookies.set('refreshToken', refreshToken);
//       console.log(response.data); // Handle successful login

//       // Redirect to dashboard based on role
//       switch (role) {
//         case 'ADMIN':
//           router.push('/admin/dashboard');
//           break;
//         case 'USER':
//           router.push('/clientdashboard');
//           break;
//         case 'INSTRUCTOR':
//           router.push('/instructor/dashboard');
//           break;
//         default:
//           // Handle unknown role
//           console.error('Unknown role:', role);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   // Check if router is available (client-side)
//   if (typeof window !== 'undefined') {
//     return (
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//     );
//   } else {
//     // Return null if router is not available (server-side)
//     return null;
//   }
// };

// export default LoginForm;


// components/LoginForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/authenticate', formData);
      const { access_token, refresh_token, email, role, firstname, lastname } = response.data;

      // Set expiration date for the cookies (10 days)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 10);

      // Save tokens and user details in cookies with expiration date
      Cookies.set('access_token', access_token, { expires: expirationDate });
      Cookies.set('refresh_token', refresh_token, { expires: expirationDate });
      Cookies.set('email', email, { expires: expirationDate });
      Cookies.set('userRole', role, { expires: expirationDate });
      
      // Check if firstname and lastname are not null before setting cookies
      if (firstname !== null) {
        Cookies.set('firstname', firstname, { expires: expirationDate });
      }
      if (lastname !== null) {
        Cookies.set('lastname', lastname, { expires: expirationDate });
      }

      Cookies.set('isLoggedIn', 'true', { expires: expirationDate });

      // Redirect based on role
      switch (role) {
        case 'ADMIN':
          window.location.href = '/dashboard';
          break;
        case 'USER':
          window.location.href = '/clientDashboard';
          break;
        case 'INSTRUCTOR':
          window.location.href = '/instructor/dashboard'; 
          break;
        default:
          console.error('Unknown role:', role);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;




// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform login request
//       const response = await axios.post('http://localhost:8082/api/v1/auth/authenticate', formData);
//       const { access_token, refresh_token, role } = response.data;

//       // Save tokens in cookies
//       Cookies.set('access_token', access_token);
//       Cookies.set('refresh_token', refresh_token);
      
//       // Set isLoggedIn cookie to true
//       Cookies.set('isLoggedIn', 'true');
      
//       // Set user role cookie
//       Cookies.set('userRole', role);

//       // Redirect to dashboard based on role
//       switch (role) {
//         case 'ADMIN':
//           window.location.href = '/dashboard'; // Change the URL as needed
//           break;
//         case 'USER':
//           window.location.href = '/clientDashboard'; // Change the URL as needed
//           break;
//         case 'INSTRUCTOR':
//           window.location.href = '/instructor/dashboard'; // Change the URL as needed
//           break;
//         default:
//           // Handle unknown role
//           console.error('Unknown role:', role);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//       </label>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform login request
//       const response = await axios.post('http://localhost:8082/api/v1/auth/authenticate', formData);
//       const { accessToken, refreshToken, role } = response.data;

//       // Save tokens in cookies
//       Cookies.set('accessToken', accessToken);
//       Cookies.set('refreshToken', refreshToken);
      
//       // Set isLoggedIn cookie to true
//       Cookies.set('isLoggedIn', 'true');

//       // Redirect to dashboard based on role
//       switch (role) {
//         case 'ADMIN':
//           window.location.href = '/dashboard'; // Change the URL as needed
//           break;
//         case 'USER':
//           window.location.href = '/clientDashboard'; // Change the URL as needed
//           break;
//         case 'INSTRUCTOR':
//           window.location.href = '/instructor/dashboard'; // Change the URL as needed
//           break;
//         default:
//           // Handle unknown role
//           console.error('Unknown role:', role);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//       </label>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
