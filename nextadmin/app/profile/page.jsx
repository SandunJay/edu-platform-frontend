 "use client"
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import Cookies from "js-cookie";
 import 'bootstrap/dist/css/bootstrap.min.css';
 
 const fetchUserData = async (email, token) => {
   try {
     const response = await axios.get(`http://localhost:8082/api/users/users/${email}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     return response.data;
   } catch (error) {
     console.error("Error fetching user data:", error);
     throw error;
   }
 };
 
 const updateUser = async (userId, userData, token) => {
   try {
     await axios.put(`http://localhost:8082/api/users/${userId}`, userData, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
   } catch (error) {
     console.error("Error updating user data:", error);
     throw error;
   }
 };
 
 const ProfilePage = () => {
   const [userData, setUserData] = useState(null);
   const [editMode, setEditMode] = useState(false);
   const [formData, setFormData] = useState({
     id: "",
     firstname: "",
     lastname: "",
     email: "",
     password: "",
     role: "",
   });
   const [saveEnabled, setSaveEnabled] = useState(false);
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const access_token = Cookies.get("access_token");
 
         if (access_token) {
           const email = Cookies.get("email");
           const userData = await fetchUserData(email, access_token);
           setUserData(userData);
           setFormData(userData);
         }
       } catch (error) {
         console.error("Error fetching user data:", error);
       }
     };
 
     fetchData();
   }, []);
 
   const handleEdit = () => {
     setEditMode(true);
     setSaveEnabled(true);
   };
 
   const handleCancel = () => {
     setEditMode(false);
     setSaveEnabled(false);
     // Reset formData to userData
     setFormData(userData);
   };
 
   const handleSave = async () => {
     try {
       const access_token = Cookies.get("access_token");
       await updateUser(userData.id, formData, access_token);
       setEditMode(false);
       setSaveEnabled(false);
       // Refresh the page
       window.location.reload();
     } catch (error) {
       console.error("Error saving user data:", error);
     }
   };
 
   const handleChange = (e) => {
     const { id, value } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [id]: value,
     }));
     setSaveEnabled(true);
   };
 
   if (!userData) {
     return <div>Loading...</div>;
   }
 
   return (
     <div style={{ margin: 0, padding: 0, border: 0, backgroundColor: "#0B7E97" }}>
       <h1>Welcome, <b>{userData.firstname}</b></h1>
       <form style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
         <label style={{ marginBottom: '5px' }} htmlFor="id">User ID</label>
         <input type="text" id="id" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} value={userData.id} disabled />
 
         <label style={{ marginBottom: '5px' }} htmlFor="firstname">First Name</label>
         <input type="text" id="firstname" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} value={editMode ? formData.firstname : userData.firstname} disabled={!editMode} onChange={handleChange} />
 
         <label style={{ marginBottom: '5px' }} htmlFor="lastname">Last Name</label>
         <input type="text" id="lastname" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} value={editMode ? formData.lastname : userData.lastname} disabled={!editMode} onChange={handleChange} />
 
         <label style={{ marginBottom: '5px' }} htmlFor="email">Email</label>
         <input type="email" id="email" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} value={userData.email} disabled />
 
         <label style={{ marginBottom: '5px' }} htmlFor="password">Password</label>
         <input type="password" id="password" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} value={editMode ? formData.password : userData.password} disabled={!editMode} onChange={handleChange} />
         
         <label style={{ marginBottom: '5px' }} htmlFor="role">Role</label>
         <input type="text" id="role" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} value={userData.role} disabled />
 
         {/* Edit, Cancel, and Save buttons */}
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           {editMode ? (
             <>
               <button type="button" style={{ padding: '10px 20px', backgroundColor: '#dc3545', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }} onClick={handleCancel}>Cancel</button>
               <button type="button" style={{ padding: '10px 20px', backgroundColor: '#007bff', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSave} disabled={!saveEnabled}>Save</button>
             </>
           ) : (
             <button type="button" style={{ padding: '10px 20px', backgroundColor: '#007bff', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }} onClick={handleEdit}>Edit</button>
           )}
         </div>
       </form>
     </div>
   );
 };
 
 export default ProfilePage;
 