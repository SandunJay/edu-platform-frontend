import Navbar from "@/app/ui/homepage/navbar/navbar";
import Sidebar from "@/app/ui/dashboard/sidebar/sidebar";

import styles from "@/app/ui/dashboard/dashboard.module.css";

const Layout = ({ children }) => {
  return (
    <div >
       
      <div >
        <Navbar />
        {children}
        
      </div>
    </div>
  );
};

export default Layout;
