
// "use client"

// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// // const cors = require('cors');

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     role: 'USER', // Default role
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


// // const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:8082/api/v1/auth/register', formData);
// //       const { accessToken, refreshToken } = response.data;
// //       // Save tokens in cookies
// //       Cookies.set('accessToken', accessToken);
// //       Cookies.set('refreshToken', refreshToken);
// //       console.log(response.data); // Handle successful registration
// //     } catch (error) {
// //       console.error('Registration failed:', error);
// //     }
// //   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post('http://localhost:8082/api/v1/auth/register', formData);
//     const { access_token, refresh_token, email, role } = response.data;
    
//     // Save tokens in cookies
//     Cookies.set('access_token', access_token);
//     Cookies.set('refresh_token', refresh_token);
//     // Store email and role in cookies
//     Cookies.set('email', email);
//     Cookies.set('role', role);
    
//     console.log(response.data); // Handle successful registration
//   } catch (error) {
//     console.error('Registration failed:', error);
//   }
// };


  
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         First Name:
//         <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
//       </label>
//       <label>
//         Last Name:
//         <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
//       </label>
//       <label>
//         Email:
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//       </label>
//       <label>
//         Role:
//         <select name="role" value={formData.role} onChange={handleChange}>
//           <option value="ADMIN">Admin</option>
//           <option value="USER">User</option>
//           <option value="INSTRUCTOR">Instructor</option>
//         </select>
//       </label>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;

"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from "./registerForm.module.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER', // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/register', formData);
      const { access_token, refresh_token, email, role, firstname, lastname } = response.data;
      
      // Set expiration date for the cookies (10 days)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 10);
      
      // Save tokens and user details in cookies with expiration date
      Cookies.set('access_token', access_token, { expires: expirationDate });
      Cookies.set('refresh_token', refresh_token, { expires: expirationDate });
      Cookies.set('email', email, { expires: expirationDate });
      Cookies.set('role', role, { expires: expirationDate });
      Cookies.set('firstname', firstname, { expires: expirationDate });
      Cookies.set('lastname', lastname, { expires: expirationDate });
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
      
      console.log(response.data); 
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    
    // <form onSubmit={handleSubmit} className={styles.form}>
    //   <label>
    //     First Name:
    //     <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
    //   </label>
    //   <label>
    //     Last Name:
    //     <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
    //   </label>
    //   <label>
    //     Email:
    //     <input type="email" name="email" value={formData.email} onChange={handleChange} required />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" name="password" value={formData.password} onChange={handleChange} required />
    //   </label>
    //   <label>
    //     Role:
    //     <select name="role" value={formData.role} onChange={handleChange}>
    //       <option value="ADMIN">Admin</option>
    //       <option value="USER">User</option>
    //       <option value="INSTRUCTOR">Instructor</option>
    //     </select>
    //   </label>
    //   <button type="submit">Register</button>
    // </form>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
  <form onSubmit={handleSubmit} className={styles.form}>
    <label>
      First Name:
      <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
    </label>
    <label>
      Last Name:
      <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
    </label>
    <label>
      Email:
      <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} style={{width: "100%"}}/>
    </label>
    <label>
      Password:
      <input type="password" name="password" value={formData.password} onChange={handleChange} required className={styles.input} />
    </label>
    <label>
      Role:
      <select name="role" value={formData.role} onChange={handleChange} className={styles.input}>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
        <option value="INSTRUCTOR">Instructor</option>
      </select>
    </label>
    <button type="submit">Register</button>
  </form>
</div>

   
  );
};

export default RegisterForm;

