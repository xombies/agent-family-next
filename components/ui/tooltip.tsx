import * as React from "react";
export function TooltipProvider({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function Tooltip({ children }: any) { return <span>{children}</span>; }
export function TooltipTrigger({ asChild = false, children, ...props }: any) {
  return React.cloneElement(children, props);
}
export function TooltipContent({ children }: any) { return <span className="ml-2 text-xs text-white/70">{children}</span>; }
