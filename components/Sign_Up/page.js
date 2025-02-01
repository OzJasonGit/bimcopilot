"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/menu";

const Signup = () => {
  const router = useRouter(); // Router for navigation
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/signup", formData);

      if (data.error) {
        toast.error(data.error?.message || "Something went wrong!");
      } else {
        toast.success("Registered Successfully!");
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("profile", JSON.stringify(data));
          router.push("/"); // Navigate to the homepage
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
      console.log("Signup failed!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSuccess = async (res) => {
    try {
      const { credential } = res;
      const response = await axios.post("/api/google_login", {
        token: credential,
      });
  
      const { user, token } = response.data;
      
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("profile", JSON.stringify({user,token}));
        router.push("/"); 
      }
      toast.success("Google Login Successful!");
    } catch (error) {
      toast.error("Google Login Faileddd!");
    }
  };

  return (
    <>
      <Menu/>
      <Header/>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <ToastContainer />
        <div
          className="min-h-screen w-full flex items-center justify-center bg-black"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(39,39,45,1) 35%, rgba(39,39,45,1) 52%)",
          }}
        >
          <div
            className={`max-w-md min-w-[320px] min-h-[605px] p-6 bg-gray-300 rounded-md shadow-md ${
              isLoading && "flex justify-center items-center"
            }`}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  {[
                    "firstName",
                    "lastName",
                    "email",
                    "password",
                    "confirmPassword",
                  ].map((field) => (
                    <div key={field} className="mb-4">
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-600"
                      >
                        {field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <input
                        type={field.includes("password") ? "password" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className={`w-full shadow bg-blue-500 text-white p-2 rounded-md ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                    }`}
                    disabled={isLoading}
                  >
                    Sign Up
                  </button>
                </form>
                <div className="mt-4 w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={() => toast.error("Google Login Failed!")}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>

      <Footer/>
    </>
  );
};

export default Signup;
