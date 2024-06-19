'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './subform.module.css';

import { Form, Input, Button } from "antd";
import CheckoutButton from "@/components/Payment/checkoutButton";


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
        onFinish={handleSubmit} // Use onFinish for form submission
        style={{
            display: "flex",
            marginBottom: "0",
            height: "100%",
            gridArea: "FORM",
            paddingBottom: "0",
            width: "100%",

        }}
        id={styles.FORM}
      >
        <Form.Item
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
            style={{ marginBottom: "0", height: "52px", width: "23vw", marginRight: "5%" }}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary"
            htmlType="submit"
            id={styles.SUB_BUTTON}
            loading={isLoading}
            style={{ height: "48px" }}
            className="w-full shadow bg-emerald-300 ml-4 "
          >
            <h2 className="text-stone-700 font-avant_garde_bold text-lg"
              style={{ top: "3px" }}
              id={styles._H2}
            >
              <a id={styles.TEXT_OUTLINE}>Click Here!</a>
            </h2>
          </Button>
        </Form.Item>
      </Form><br/>
      {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
      <br/><br/>
      <CheckoutButton amount={10000000} currency={"usd"}/>
    </div>
  );
}

export default Subform;