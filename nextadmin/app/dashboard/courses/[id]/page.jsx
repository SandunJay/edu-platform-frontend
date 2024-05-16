"use client";
import styles from "@/app/ui/dashboard/courses/singleCourse/singleCourse.module.css";
import { useState, useEffect } from "react";

const SingleCoursePage = ({ params }) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8093/api/course/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const courseData = await response.json();
        setCourse(courseData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [params.id]);

  const updateCourse = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8093/api/course/${course.courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          alert("Course not found");
        } else {
          alert("An error occurred");
        }
        return;
      }
      const updatedCourse = await response.json();
      setCourse(updatedCourse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>Course ID = {course.id}</div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={updateCourse}>
          <label>Course Code</label>
          <input
            type="text"
            name="courseId"
            value={course.courseId || ""}
            onChange={handleChange}
            style={{ color: "black" }}
          />
          <label>Course Name</label>
          <input
            type="text"
            name="name"
            value={course.name || ""}
            onChange={handleChange}
            style={{ color: "black" }}
          />
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={course.description || ""}
            onChange={handleChange}
            style={{ color: "black" }}
          />
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={course.author || ""}
            onChange={handleChange}
            style={{ color: "black" }}
          />
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={course.price || ""}
            onChange={handleChange}
            style={{ color: "black" }}
          />
          <label>Learning Out come</label>
          <input
            type="text"
            name="learningoutcome"
            value={course.learningoutcome || ""}
            onChange={handleChange}
            style={{ color: "black" }}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCoursePage;
