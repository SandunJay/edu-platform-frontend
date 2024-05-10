// import { updateCourse } from "@/app/lib/actions";
// import { fetchCourse } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/courses/singleCourse/singleCourse.module.css";

const SingleCoursePage = async ({ params }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>Course 1</div>
      <div className="formContainer">
        <label>Course Name</label>
        <input type="text" placeholder="Course 1" />
        <label>Description</label>
        <input type="text" placeholder="Course 1" />
        <label>price</label>
        <input type="text" placeholder="Course 1" />
        <button>Update</button>
      </div>
    </div>
  );
};

export default SingleCoursePage;

//   const { id } = params;
// //   const course = await fetchCourse(id);
// return (
//     // <div className={styles.container}>
// //       <div className={styles.infoContainer}>{course.name}</div>
// //       <div className={styles.formContainer}>
// //         <form action={updateCourse} className={styles.form}>
// //           <input type="hidden" name="id" value={course.id} />
// //           <label>Course Name</label>
// //           <input type="text" name="coursename" placeholder={course.name} />
// //           <label>Description</label>
// //           <input
// //             type="text"
// //             name="coursedescription"
// //             placeholder={course.description}
// //           />
// //           <label>price</label>
// //           <input type="text" name="text" placeholder={course.price} />
// //           <button>Update</button>
// //         </form>
// //       </div>
// //     </div>
//   );
