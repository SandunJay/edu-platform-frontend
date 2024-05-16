import Navbar from "@/app/ui/clientDashboard/navbar/navbar";
import Footer from "../ui/dashboard/footer/footer";
import styles from "../ui/dashboard/dashboard.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
