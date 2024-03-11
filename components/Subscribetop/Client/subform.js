'use client';


import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from './subform.module.css'

import { Form, Input, Button, Item } from "antd";





const Subform = () => {


  const [isLoading, setIsLoading] = useState(false);
      const navigate = useRouter();
      const [formData, setFormData] = useState({
          email: "",
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
              toast.error(data.error?.message);
          } else {
              toast("Registered Succesfully!");
              if(typeof window !== undefined && window.localStorage) {
                  localStorage.setItem("profile", data);
                  router.push("/");
              }
          }
      } catch (error) {
          console.log(error);
      }
      setIsLoading(false);
  };



    return (

        <div id={styles.SUBSCRIBE}>
            <Form
                  onSubmit={handleSubmit}
                  style={{
                    marginBottom: "0",
                    height: "100%",
                    gridArea: "FORM",
                    paddingBottom: "0",
                  }}
                  id={styles.FORM}
                  name={["user", "name"]}
                  label="Email"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                <Input style={{ marginBottom: "0", height: "100%" }} 
                       onChange={handleChange}/>
            </Form>

            <Button id={styles.SUB_BUTTON}
                    className="w-full shadow bg-emerald-300 ">

                        <h2 class=" text-stone-700 ... font-avant_garde_bold text-lg ..."
                            style={{position: "relative", top: "3px"}}
                            id={styles._H2}>
                                <a id={styles.TEXT_OUTLINE}>Click Here!</a>                           
                        </h2>
            </Button>
        </div>             
    )

}

export default Subform;             