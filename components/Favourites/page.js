"use client";

import styles from './favourites.module.css';

import axios from "axios";
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button"

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Menu from "../Menu/menu";




const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/signin", formData);
      if (data.error) {
        toast.error(data.error?.message);
      } else {
        toast("Logged in successfully!");
        if (typeof window !== undefined && window.localStorage) {
          localStorage.setItem("profile", JSON.stringify(data));
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("Login failed! Please try again.");
      console.error("Login failed!", error);
    }
    setIsLoading(false);
  };

  const googleSuccess = async (res) => {
    try {
      const { credential } = res;
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`
      );

      const { name, email } = response.data;

      const form = {
        name,
        email,
        jwt: credential,
      };

      if (typeof window !== undefined && window.localStorage) {
        localStorage.setItem("profile", JSON.stringify(form));
        router.push("/");
      }
      toast.success("Logged in with Google!");
    } catch (error) {
      toast.error("Google login failed! Please try again.");
      console.error("Google login failed!", error);
    }
  };

  return (
    <>
      <Menu/>
      <Header/>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_blogimageholder}>

          <div id={styles.SIGN_IN}>

            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
              <ToastContainer />
              <div
                style={{
                  gridArea: "SIGN_IN",             
                }}
              >
                <div
                  className={` ${ isLoading && "flex justify-left items-center" }`}
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
                      <h2 id={styles._H2}  className="text-left ... text-stone-400 ... font-avant_garde_bold">Sign In</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">




                          <label
                            htmlFor="email"
                            className="text-left ... text-stone-400 ... font-avant_garde_bold"
                            id={styles._H3}
                          >
                            Email
                          </label>




                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 border rounded-md"
                            required
                            style={{
                                  width: "100%",
                                  height: "65px",
                                  padding: "20px",
                                  }}
                          />
                        </div>
                        <div className="mb-4">





                          <label
                            htmlFor="password"
                            className="text-left ... text-stone-400 ... font-avant_garde_bold"
                            id={styles._H3}
                          >
                            Password
                          </label>



                          <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 border rounded-md"
                            required

                            style={{
                                  width: "100%",
                                  height: "65px",
                                  padding: "20px",
                                  }}
                          />
                        </div>


                        {/*<button
                          type="submit"
                          className="w-full shadow bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                          Sign In
                        </button>*/}

                        <Button variant="outline"
                            id={styles.FORM_BUTTON}
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            style={{
                                width: "170px",
                                height: "65px",
                                margintop:"20px",
                                }}>
                            Sign In!
                        </Button>


                          {/* Google Sign-In Button */}
                          <div className="mt-4 w-full flex justify-left" id={styles.GOOGLE_BUTTON}>
                            <GoogleLogin
                              onSuccess={googleSuccess}
                              onError={() => {
                                toast.error("Google Login failed.");
                              }}
                            />
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </GoogleOAuthProvider>

          </div>
          
          

        </div>
      </section>


      <Footer/>
    </>
  );
};

export default Favourites;
