import * as React from "react";
import { cn } from "../../lib/utils";

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}
export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} className={cn("[&_th]:text-left", props.className)} />;
}
export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}
export function TR(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} className={cn("border-b last:border-0 border-slate-200 dark:border-slate-800", props.className)} />;
}
export function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} className={cn("py-2 px-3 font-medium text-slate-600 dark:text-slate-300", props.className)} />;
}
export function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={cn("py-2 px-3", props.className)} />;
}
