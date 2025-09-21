"use client";
import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Switch({ label, ...props }: Props) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="h-6 w-10 rounded-full bg-slate-300 transition peer-checked:bg-primary relative">
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-4" />
      </span>
      {label && <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>}
    </label>
  );
}
