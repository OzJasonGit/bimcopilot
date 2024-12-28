"use client";
import Admin from "@/Modules/Admin/admin";
import { useState } from "react";

export default function Dashboard() {

  // const [story, setStory] = useState({
  //     title: "",
  //     author: "",
  //     subtitle: "",
  //     image: "",
  //     image2: "",
  //     introduction:"",
  //     video: "",
  //     conclusion: "",
  // });
  // console.log("step 1 start")

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setStory((prev) => ({ ...prev, [name]: value }));
  // };
  // console.log("step 2 start")

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("step 3 start")
  //   try {
  //     console.log(story,"story")
  //     const res = await fetch("/api/admin_route", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(story),
  //     });
  
  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       console.error("Error submitting story:", errorData);
  //       alert(`Error: ${errorData.error || "Failed to submit story"}`);
  //     } else {
  //       alert("Story added successfully!");
  //       setStory({
  //         title: "",
  //         author: "",
  //         subtitle: "",
  //         image: "",
  //         image2: "",
  //         introduction:"",
  //         video: "",
  //         conclusion: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Submission failed:", error);
  //     alert("An unexpected error occurred. Check the console for details.");
  //   }
  // };
  

  return (
    // <Admin story={story} handleChange={handleChange} handleSubmit={handleSubmit} />
    <Admin/>
  );
}
