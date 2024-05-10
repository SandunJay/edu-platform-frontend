import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card item={{ title: "Users", number: 10, change: 10 }} />
          <Card item={{ title: "Courses", number: 10, change: 10 }} />
          <Card item={{ title: "Orders", number: 10, change: 10 }} />
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
