 

"use client";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/courses/courses.module.css";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { useState, useEffect } from "react";

const UnapprovedContent = () => {
  const COURSE_API_BASE_URL = "http://localhost:8081/api/content/unapproved";
  const [contents, setContents] = useState([]);
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
        const contents = await response.json();
        setContents(contents);
        console.log(contents);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/content/approve/${id}`, {
        method: 'POST', // or 'PUT' if your API requires it
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
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
                ID
               </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                 Course ID
               </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                Title
               </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                Description
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                 Video URL
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                PDF URL
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                Actions
               </th>
            </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contents.map((content) => (
                    <tr key={content.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.courseId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.description}</td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.videoUrl}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.pdfUrl}</td> */}
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  <a href={content.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video URL</a>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  <a href={content.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">PDF URL</a>
</td>   
                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2"
                        onClick={() => handleAccept(content.id)} >
                          Accept
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Reject
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

export default UnapprovedContent;

