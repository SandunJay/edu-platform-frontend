// const RegisterPage = () => {
//     return (
//         <div className="profile">
//             <h1>Welcome to Register page</h1>
//         </div>
//     );
// }
// export default RegisterPage

// app/register/page.jsx

import React from 'react';
import RegisterForm from '../components/registerForm'; // Import the RegisterForm component

const RegisterPage = () => {
  return (
    <div style={{ margin: 0, padding: 0, border: 0, backgroundColor: "#0B7E97" }}>
      
      <RegisterForm /> {/* Render the RegisterForm component */}
    </div>
  );
};

export default RegisterPage; // Export the RegisterPage component
