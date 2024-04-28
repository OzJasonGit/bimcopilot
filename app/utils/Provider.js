"use client";

import { useEffect, useState } from "react";

function Provider({ children }) {
  const [hydration, setHydration] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydration(true);
    }
  }, []);

  return <div attribute="class">{hydration ? <>{children}</> : <>Loading !!!</>}</div>;
}

export default Provider;
