"use client";
import Navbar from "@/app/ui/homepage/navbar/navbar";
import Sidebar from "@/app/ui/dashboard/sidebar/sidebar";
import { BrowserRouter as Router } from 'react-router-dom';

import styles from "@/app/ui/dashboard/dashboard.module.css";

const Layout = ({ children }) => {
  return (
    <Router> 
    <div >
       
      <div >
        <Navbar />
        {children}
        
      </div>
    </div>
    </Router>
  );
};

export default Layout;
