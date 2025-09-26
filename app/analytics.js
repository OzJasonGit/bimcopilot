// app/analytics.js

"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !window.gtag) return;

    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
}