
"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image'

const CourseIdPage = ({params}) =>  {
  const { courseId } = params; // Destructure courseId from props
  console.log(courseId);
  const COURSE_API_BASE_URL = `http://localhost:8082/api/course/by-courseId/${courseId}`;
  const [course, setCourse] = useState(null);
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
        const course = await response.json();
        setCourse(course);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId]);
 
  
  return (
  <div className="flex justify-center items-center overflow-auto h-screen">
    <div className="container mx-auto px-4">
      {/* Increased maximum width */}
      <div className="w-full max-w-2xl mx-auto">
        {!loading && course && (
          <div className="flex justify-center">
            <div className="bg-white rounded-lg border border-black border-opacity-10 p-6 w-full">
              {/* Separate container for course image */}
              <div className="mb-4 text-center">
                <Image
                  className="object-cover rounded-md"
                  alt={course.name}
                  src={course.imageurl}
                  width={720}
                  height={360}
                />
              </div>
              {/* Course details */}
              <div className="text-left">
                {/* Course name with increased font size and bold */}
                <h1 className="text-2xl font-semibold mb-2">{course.name}</h1>
                {/* Course description with decreased font size */}
                <p className="text-md text-muted-foreground mb-4">{course.description}</p>
                <div>
                <p className="text-md text-muted-foreground mb-4 font-bold">Learning Out Comes :</p>
    <ul>
      {/* Split learning outcomes by comma and map to list items */}
      {course.learningoutcome.split(',').map((outcome, index) => (
        <li key={index} className="text-md text-muted-foreground mb-4">--{outcome.trim()}</li>
      ))}
    </ul>
  </div>
                <div>
                  {/* Author and price with increased font size */}
                  <p className="text-base text-muted-foreground mb-4">
                 <span className="font-bold">Author:</span> {course.author}
                 </p>
                 <p className="text-base text-muted-foreground mb-4">
                 <span className="font-bold">Price:</span>${course.price}
                 </p>
                  
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Enroll Me
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { courseId } = params; // Destructure courseId from params

  return {
    props: {
      courseId,
    },
  };
}


export default CourseIdPage;
