import * as React from "react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={clsx("h-10 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
