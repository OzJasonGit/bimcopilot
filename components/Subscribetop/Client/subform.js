'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './subform.module.css';


import { Button } from "@/components/ui/button"
import { Form, Input, Button } from "antd";

const Subform = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/email_route", values); // Updated API endpoint
      toast("Registered Successfully!");
      form.resetFields();
      if (typeof window !== undefined && window.localStorage) {
        localStorage.setItem("profile", JSON.stringify(data));
        router.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email already registered.");
      } else {
        console.log(error);
        toast.error("An error occurred during registration.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div id={styles.SUBSCRIBE}>
      <Form
        form={form}
        onFinish={handleSubmit}
        id={styles.FORM}
        style={{ marginBottom: "0", height: "100%", width: "100%" }}
      >
        <Form.Item
          id={styles.FORM_ITEM}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
            {
              type: "email",
              message: "The input is not a valid email!",
            },
          ]}
        >
          <Input
            id={styles.FORM_INPUT}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item>
         {/* <Button
            id={styles.FORM_BUTTON}
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full shadow bg-emerald-300  "
          >
            <h2
              className="text-stone-700 font-avant_garde_bold text-lg"
              id={styles._H2}
            >
              <a id={styles.TEXT_OUTLINE}>Click Here!</a>
            </h2>
          </Button> */}

          <Button variant="outline"
                  style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",}}>Click Here!</Button>
        </Form.Item>
      </Form>
      {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
    </div>
  );
}

export default Subform;
