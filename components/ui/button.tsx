import * as React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline";
  className?: string;
  children?: React.ReactNode;
}

// Merge classNames from child + ours
function mergeClassNames(child: any, own: string) {
  const childClass = (child?.props?.className ?? "").toString();
  return clsx(childClass, own);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = "default", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
    const variantCls = variant === "outline" ? "border border-white/15 bg-transparent" : "bg-white/10";

    if (asChild && React.isValidElement(children)) {
      // Clone the child element and inject our classes/props
      return React.cloneElement(children as React.ReactElement, {
        className: mergeClassNames(children, clsx(base, variantCls, className)),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={clsx(base, variantCls, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
