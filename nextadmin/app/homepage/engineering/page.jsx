 
"use client";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/courses/courses.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Image from 'next/image'


const CoursesPage = () => {
  const COURSE_API_BASE_URL = "http://localhost:8082/api/course";
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
        // Filter courses that belong to the "Arts" category
        const engCourses = courses.filter(course => course.category === 'Engineering');
        setCourses(engCourses);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <Search placeholder={"Search a course"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {!loading &&
          courses &&
          courses.map((course) => <CourseCard course={course} key={course.courseId} />)}
      </div>
      
    </div>
  );
};

function CourseCard({ course }) {
  return (
     
    <Link href={`/homepage/courses/${course.courseId}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image fill className="object-cover" alt={course.name} src={course.imageurl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-primary md:text-base">
            {course.name}
          </div>
          <p className="text-xs text-muted-foreground">{course.author}</p>
          <p className="text-xs text-muted-foreground">${course.price}</p>
           
        </div>
      </div>
    </Link>
  );
  
}

export default CoursesPage;

 
