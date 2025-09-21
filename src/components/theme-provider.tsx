"use client";
import * as React from "react";

// Minimal theme provider that toggles the `dark` class on <html>
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);
  return <>{children}</>;
}
