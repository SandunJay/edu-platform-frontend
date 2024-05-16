
"use client";
import React, { useState, useEffect } from "react";

import { UploadDropzone,UploadButton } from "@/lib/utils/uploadthing";

export default function UpdateContent({ params }) {
    console.log(params);
    const { contentId } = params; 
    console.log(contentId);
    const[contentName, setContentName] = useState('');
    const [description, setDescription] = useState('');
    const [courseId, setCourseId] = useState('');
    const [videourl, setVideourl] = useState('');
    const [pdfurl, setPdfurl] = useState('');
    const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/api/content/getcontent/${contentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const content = await response.json();
        setContentName(content.title);
        setDescription(content.description);
        setCourseId(content.courseId);
        setVideourl(content.videourl);
        setPdfurl(content.pdfurl);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [contentId]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
        title: contentName,
        description: description,
        courseId: courseId,
        videoUrl: videourl,
        pdfUrl:pdfurl,
    };

    console.log("Data: ", data);
    try {
      const response = await fetch(`http://localhost:8081/api/content/${contentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Course updated successfully");
          // Clear form fields
          setContentName('');
          setDescription('');
          setCourseId('');
          setVideourl('');
          setPdfurl('');
      } else {
        console.error("Failed to update content");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Replace this with your preferred loading UI
  }

  // Rest of the component remains the same...
  // Replace the form in your original component with this updated form
   
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Create Content</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Content Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    name="coursename"
                    id="coursename"
                    value={contentName}
                    onChange={(e) => setContentName(e.target.value)}
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Course Name"
                  />
                </div>
              </div>
            </div>

            


            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Content Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a brief introduction about content.</p>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Course Id
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  <input
                    type="text"
                    name="courseId"
                    id="courseId"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Course Name"
                  />
                </div>
              </div>
            </div>

 
           
           
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Video Here
              </label>
               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                 
               
               <UploadDropzone
                  endpoint="videoUploader"
                  onClientUploadComplete={(res) => {
                   // Do something with the response
                   console.log("Files: ", res);
                   setVideourl(res[0].url);
                   console.log(res[0].url);
                   alert("Upload Completed");
                  }}
                 onUploadError={(error) => {
                  // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                </div> 
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Document Here
              </label>
               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                 
               
               <UploadButton
                    endpoint="courseAttachment"
                  onClientUploadComplete={(res) => {
                   // Do something with the response
                   console.log("Files: ", res);
                   setPdfurl(res[0].url);
                   console.log(res[0].url);
                   alert("Upload Completed");
                  }}
                 onUploadError={(error) => {
                  // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                </div> 
            </div>
          </div>
        </div>

   

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      </div>
    </form>
  )
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { contentId } = params; // Destructure courseId from params

  return {
    props: {
      contentId,
    },
  };
}
