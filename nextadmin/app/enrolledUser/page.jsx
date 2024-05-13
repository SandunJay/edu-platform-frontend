  
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

  // return (
  //   <div className="container mx-auto px-4">
  //     {!loading && course && (
  //       <div className="flex justify-center items-center mt-8">
  //         <div className="bg-white rounded-lg border p-6 w-full md:w-3/4 lg:w-1/2">
  //           <div className="flex justify-center mb-4">
  //             <div className="w-1/2">
  //               <Image
  //                 className="object-cover rounded-md"
  //                 alt={course.name}
  //                 src={course.imageurl}
  //                 width={720}
  //                 height={360}
  //               />
  //             </div>
  //           </div>
  //           <div className="text-center">
  //             <h2 className="text-xl font-medium mb-2">{course.name}</h2>
  //             <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
  //             <p className="text-sm text-muted-foreground">Author: {course.author}</p>
  //             <p className="text-sm text-muted-foreground">Price: {course.price}</p>
  //             {/* <p className="text-sm text-muted-foreground">Rating: {course.rating}/5</p>
  //             <p className="text-sm text-muted-foreground">Enrolled Students: {course.enrolledStudents}</p> */}
  //             <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //               Enroll Now
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-3/4">
        {!loading && course && (
          <div className="flex justify-center items-center mt-8">
            <div className="bg-white rounded-lg border border-black border-opacity-10 p-6 w-full md:w-3/4 lg:w-1/2">
              <div className="flex justify-center mb-4">
                <div className="w-1/2">
                  <Image
                    className="object-cover rounded-md"
                    alt={course.name}
                    src={course.imageurl}
                    width={720}
                    height={360}
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-medium mb-2">{course.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                <p className="text-sm text-muted-foreground">Author: {course.author}</p>
                <p className="text-sm text-muted-foreground">Price: {course.price}</p>
                {/* <p className="text-sm text-muted-foreground">Rating: {course.rating}/5</p>
                <p className="text-sm text-muted-foreground">Enrolled Students: {course.enrolledStudents}</p> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/4">
        <div className="mt-8 bg-ash rounded-lg border border-black border-opacity-10 p-6">
          <h4 className="text-lg font-semibold mb-2 underline">Course Contents</h4>
          <ul className="space-y-4">
            <li className="text-lg text-blue-600 cursor-pointer">
            <a href="/enrolledUser/content">Content 1</a>
            </li>
            <li className="text-lg text-blue-600 cursor-pointer">Content 2</li>
            <li className="text-lg text-blue-600 cursor-pointer">Content 3</li>
            <li className="text-lg text-blue-600 cursor-pointer">Content 4</li>
            <li className="text-lg text-blue-600 cursor-pointer">Content 5</li>
            <li className="text-lg text-blue-600 cursor-pointer">Content 6</li>
            <li className="text-lg text-blue-600 cursor-pointer">Content 7</li>
            {/* Add more content items as needed */}
          </ul>
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
