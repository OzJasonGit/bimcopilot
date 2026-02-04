"use client";

import styles from "@/components/Sign_In/sign_in.module.css";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Subfooter2 from "@/components/Subfooter2/subfooter2";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Menu from "@/components/Menu/menu";
import Sides from "@/components/Sides/sides";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email: email.trim() });
      if (data.error) {
        toast.error(data.error.message);
      } else {
        setSent(true);
        toast.success(data.message || "Check your email for a reset link.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <Menu />
      <Header />
      <Sides />
      <ToastContainer position="top-right" autoClose={3000} />
      <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
        <div className={styles.grid_0_blogimageholder}>
          <div id={styles.SIGN_IN} style={{ maxWidth: "400px" }}>
            <div style={{ gridArea: "SIGN_IN", width: "100%" }}>
              <h2 id={styles._H2} className="text-center text-stone-400 font-avant_garde_bold">
                Forgot password
              </h2>
              <p className="text-stone-400 text-sm mt-2 mb-4 text-center">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
              {sent ? (
                <div className="text-center text-stone-400">
                  <p className="mb-4">If an account exists with that email, you&apos;ll receive a reset link.</p>
                  <Link href="/signin" className="text-stone-200 underline">
                    Back to Sign in
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="text-left text-stone-400 font-avant_garde_bold" id={styles._H3}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 border rounded-md w-full"
                      required
                      style={{ width: "100%", height: "40px", padding: "15px" }}
                      placeholder="you@example.com"
                    />
                  </div>
                  <Button
                    variant="outline"
                    id={styles.FORM_BUTTON}
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", height: "40px", marginTop: "25px" }}
                  >
                    {loading ? "Sending…" : "Send reset link"}
                  </Button>
                  <p className="text-center mt-4">
                    <Link href="/signin" className="text-stone-400 hover:text-stone-200">
                      Back to Sign in
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Subfooter2 />
      <Footer />
    </>
  );
}
