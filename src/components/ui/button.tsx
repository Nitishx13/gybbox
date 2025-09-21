import * as React from "react";
import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ring-primary disabled:opacity-50 disabled:cursor-not-allowed";
    const variants: Record<string, string> = {
      default: "bg-primary text-white hover:bg-primary-dark",
      outline:
        "border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
      ghost: "text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    };
    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    );
  }
);
Button.displayName = "Button";
