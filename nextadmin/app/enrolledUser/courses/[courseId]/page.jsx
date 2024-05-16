"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image'

const CourseIdPage = ({params}) =>  {
  const { courseId } = params; // Destructure courseId from props
  console.log(courseId);
  const COURSE_API_BASE_URL = `http://localhost:8082/api/course/by-courseId/${courseId}`;
  const CONTENT_API_BASE_URL = `http://localhost:8081/api/content/course/${courseId}`;
  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const[content,setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCourseLoading(true);
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
        setCourse(null);
      }
      setCourseLoading(false);
    };
    fetchData();
  }, [courseId]);

  
  useEffect(() => {
    const fetchData = async () => {
      setContentLoading(true);
      try {
        const response = await fetch(CONTENT_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const content = await response.json();
        setContent(content);
      } catch (error) {
        console.log(error);
        setContent(null); 
      }
      setContentLoading(false);
    };
    fetchData();
  }, [courseId]);
 // Check if data is still loading
if (courseLoading || contentLoading) {
  return <div>Loading...</div>;
}

// Check if data is null (fetch failed)
if (!course || !content) {
  return <div>Error loading data</div>;
}

  
return (
  <div className="flex justify-center items-center overflow-auto h-screen ">
    <div className="container mx-auto px-4 flex justify-end items-center">
      {/* Left Side - Course Details */}
      <div className="w-2/3">
        <div className="w-full max-w-2xl mx-auto">
          {!contentLoading && course && (
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
                    
                  </div>
                  {/* <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Enroll Me
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Right Side - Content List */}
<div className="w-1/3 mt-[-2in]">
  <div className="bg-white rounded-lg border border-black border-opacity-10 p-6">
    <h2 className="text-lg font-semibold mb-4">Chapters</h2>
    {/* Example of chapters */}
    <div className="text-md text-muted-foreground">
      <details className="mb-2 cursor-pointer hover:text-blue-500">
        <summary>Chapter 1</summary>
        {/* {content[1].videourl} */}
        <div> <a href={content[0].videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video URL</a>
        </div>
        <div> <a href={content[0].pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">PDF URL</a>
        </div>
      </details>
      <details className="mb-2 cursor-pointer hover:text-blue-500">
        <summary>Chapter 2</summary>
        {/* <a href={content[1].videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video URL</a>
        <a href={content[1].pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">PDF URL</a> */}
      </details>
      <details className="mb-2 cursor-pointer hover:text-blue-500">
        <summary>Chapter 3</summary>
        {/* <a href={content[2].videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video URL</a>
        <a href={content[2].pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">PDF URL</a> */}
      </details>
      {/* Add more chapters here */}
    </div>
  </div>
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
