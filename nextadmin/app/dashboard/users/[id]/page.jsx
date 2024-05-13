import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleOrderPage = async ({ params }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>User 1</div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>User Name</label>
          <input type="text" placeholder="Kamal" />
          <label>Email</label>
          <input type="text" placeholder="Kamal@gmail.com" />
          <label>Created At</label>
          <input type="text" placeholder="2025-5-10" />
          <label>Role</label>
          <input type="text" placeholder="admin" />
          <label>Status</label>
          <input type="text" placeholder="active" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleOrderPage;
