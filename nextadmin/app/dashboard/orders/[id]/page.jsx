import styles from "@/app/ui/dashboard/courses/singleCourse/singleCourse.module.css";

const SingleOrderPage = async ({ params }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>Course 1</div>
      <div className="formContainer">
        <label>Order ID</label>
        <input type="text" placeholder="1234" />
        <label>Order Number</label>
        <input type="text" placeholder="Course 1" />
        <label>Code</label>
        <input type="text" placeholder="Code 1" />
        <label>User ID</label>
        <input type="text" placeholder="1234" />
        <label>Price</label>
        <input type="text" placeholder="Rs 1" />
        <label>Quantity</label>
        <input type="text" placeholder="Course 1" />
        <label>Order Date</label>
        <input type="text" placeholder="2024-5-10" />
      </div>
    </div>
  );
};

export default SingleOrderPage;
