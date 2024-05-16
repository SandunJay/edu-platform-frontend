
"use client";
import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { UploadDropzone } from "@/lib/utils/uploadthing";

export default function UpdateCourse({params}) {
  console.log(params);
  const { courseId } = params; 
  console.log(courseId);
  const [courseName, setCourseName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [coverPhotourl, setCoverPhotourl] = useState('');
  const [learningOutcomes,setLearningOutcomes] = useState('');
  const [category,setCategory] = useState('');
  const [loading, setLoading] = useState(true);

   

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8082/api/course/by-courseId/${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const course = await response.json();
        setCourseName(course.name);
        setAuthorName(course.author);
        setDescription(course.description);
        setCoursePrice(course.price);
        setCoverPhotourl(course.imageurl);
        setLearningOutcomes(course.learningoutcome);
        setCategory(course.category);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: courseName,
      author: authorName,
      description: description,
      price: coursePrice,
      imageurl: coverPhotourl,
      learningoutcome: learningOutcomes,
      category:category
    };

    console.log("Data: ", data);
    try {
      const response = await fetch(`http://localhost:8082/api/course/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Course updated successfully");
          // Clear form fields
          setCourseName('');
          setAuthorName('');
          setDescription('');
          setCoursePrice('');
          setCoverPhotourl('');
          setLearningOutcomes('');
          setCategory('');
          
      } else {
        console.error("Failed to update course");
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
        <h2 className="text-base font-semibold leading-7 text-gray-900">Create Course</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Course Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                
                <input
                  type="text"
                  name="coursename"
                  id="coursename"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Course Name"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Author Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                
                <input
                  type="text"
                  name="authorname"
                  id="authorname"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Author Name"
                />
              </div>
            </div>
          </div>


          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Course Description
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
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a brief introduction about course.</p>
          </div>
{/* learning out come */}
          <div className="col-span-full">
          <label htmlFor="learningOutcomes" className="block text-sm font-medium leading-6 text-gray-900">
                 Learning Outcomes
          </label>
           <div className="mt-2">
            <textarea
                 id="learningOutcomes"
                 name="learningOutcomes"
                 value={learningOutcomes}
                 onChange={(e) => setLearningOutcomes(e.target.value)}
                 rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter learning outcomes..."
              defaultValue={''}
           />
         </div>
         <p className="mt-2 text-sm text-gray-500">List the learning outcomes of the course, separated by commas or new lines.</p>
         </div>
{/* course category */}
          <div className="col-span-full">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
           Course Category
           </label>
          <div className="mt-2">
           <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
           className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                 <option value="" disabled>Select a category</option>
                 <option value="Engineering">Engineering</option>
                 <option value="Information Technology">Information Technology</option>
                <option value="Business Management">Business Management</option>
                 <option value="Arts">Arts</option>
            </select>
            </div>
            </div>


{/* price */}
          <div className="sm:col-span-4">
            <label htmlFor="courseprice" className="block text-sm font-medium leading-6 text-gray-900">
              Course Price
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                
                <input
                  type="text"
                  name="courseprice"
                  id="courseprice"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Course Price"
                />
              </div>
            </div>
          </div>
         
          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
             <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
               
             
             <UploadDropzone
                  endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                 // Do something with the response
                 console.log("Files: ", res);
                 setCoverPhotourl(res[0].url);
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
  const { courseId } = params; // Destructure courseId from params

  return {
    props: {
      courseId,
    },
  };
}
