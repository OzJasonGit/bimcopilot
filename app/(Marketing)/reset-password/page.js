"use client";

import styles from "@/components/Sign_In/sign_in.module.css";
import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Subfooter2 from "@/components/Subfooter2/subfooter2";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Menu from "@/components/Menu/menu";
import Sides from "@/components/Sides/sides";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link. Please use the link from your email.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/reset-password", {
        token,
        password,
        confirmPassword,
      });
      if (data.error) {
        toast.error(data.error.message);
      } else {
        setSuccess(true);
        toast.success("Password reset. Redirecting to sign in…");
        setTimeout(() => router.push("/signin"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.error?.message || "Something went wrong");
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <>
        <Menu />
        <Header />
        <Sides />
        <ToastContainer position="top-right" autoClose={3000} />
        <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
          <div className={styles.grid_0_blogimageholder}>
            <div id={styles.SIGN_IN} style={{ maxWidth: "400px" }}>
              <div style={{ gridArea: "SIGN_IN", width: "100%", padding: "2rem", textAlign: "center" }}>
                <h2 id={styles._H2} className="text-stone-400 font-avant_garde_bold">
                  Invalid reset link
                </h2>
                <p className="text-stone-400 mt-4">
                  <Link href="/forgot-password" className="text-stone-200 underline">
                    Request a new reset link
                  </Link>
                </p>
                <p className="mt-4">
                  <Link href="/signin" className="text-stone-400 hover:text-stone-200">
                    Back to Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Subfooter2 />
        <Footer />
      </>
    );
  }

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
                Set new password
              </h2>
              <p className="text-stone-400 text-sm mt-2 mb-4 text-center">
                Enter your new password below.
              </p>
              {success ? (
                <div className="text-center text-stone-400">
                  <p>Password has been reset. Redirecting to sign in…</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="password" className="text-left text-stone-400 font-avant_garde_bold" id={styles._H3}>
                      New password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 border rounded-md w-full"
                      required
                      minLength={8}
                      style={{ width: "100%", height: "40px", padding: "15px" }}
                      placeholder="At least 8 characters, letter + number"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="text-left text-stone-400 font-avant_garde_bold" id={styles._H3}>
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 border rounded-md w-full"
                      required
                      minLength={8}
                      style={{ width: "100%", height: "40px", padding: "15px" }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    id={styles.FORM_BUTTON}
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", height: "40px", marginTop: "25px" }}
                  >
                    {loading ? "Resetting…" : "Reset password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh] text-stone-400">
        Loading…
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
