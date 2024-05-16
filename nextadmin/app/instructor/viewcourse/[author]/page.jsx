
"use client";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/courses/courses.module.css";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { useState, useEffect } from "react";
import Link from 'next/link';

const ViewCourses = ({params}) => {
  console.log(params);
  const { author } = params; 
  console.log(author);
  const COURSE_API_BASE_URL = `http://localhost:8082/api/course/by-author/${author}`;
  const [course, setCourses] = useState([]);
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
        console.log(courses);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

   
 
return (
    <div className="flex flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                Course ID
               </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                 Course Name
               </th>
                
               <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                Actions
               </th>
            </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {course.map((course) => (
                    <tr key={content.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.courseId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                      
                       
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <Link href="/path-to-new-page" passHref>
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                               Update
                        </button>
                    </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { author } = params; // Destructure courseId from params

  return {
    props: {
      author,
    },
  };
}

export default ViewContent;

