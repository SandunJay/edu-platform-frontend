// import Navbar from "@/app/ui/dashboard/navbar/navbar";
import Sidebar from "../ui/instructor/sidebar/sidebar";
import Footer from "@/app/ui/dashboard/footer/footer";
import styles from "@/app/ui/dashboard/dashboard.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
