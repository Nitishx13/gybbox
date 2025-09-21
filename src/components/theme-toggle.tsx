"use client";

export function ThemeToggle() {
  return (
    <button
      className="h-8 w-8 rounded-md border border-slate-300 dark:border-slate-700"
      onClick={() => {
        const html = document.documentElement;
        html.classList.toggle("dark");
        localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
      }}
      aria-label="Toggle theme"
      title="Toggle dark mode"
    />
  );
}
