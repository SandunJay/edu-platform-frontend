"use client";
import Search from "@/src/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/courses/courses.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pagination from "@/src/app/ui/dashboard/pagination/pagination";

const CoursesPage = () => {
  const COURSE_API_BASE_URL = "http://localhost:8093/api/course";
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(COURSE_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const courses = await response.json();
        setCourses(courses);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search a course"} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Course ID</td>
            <td>Course Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>ACTION</td>
          </tr>
        </thead>
        {!loading && courses && (
          <tbody className="bg-white">
            {courses?.map((course) => (
              <Course course={course} key={course.id} />
            ))}
          </tbody>
        )}
      </table>
      <Pagination />
    </div>
  );
};

function Course({ course }) {
  return (
    <tr key={course.id}>
      <td>{course.id}</td>
      <td>{course.name}</td>
      <td>{course.description}</td>
      <td>{course.price}</td>

      <td>
        <div className={styles.buttons}>
          <Link href="/dashboard/courses/test">
            <button className={`${styles.button} ${styles.view}`}>Edit</button>
          </Link>
          <button className={`${styles.button} ${styles.delete}`}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CoursesPage;
