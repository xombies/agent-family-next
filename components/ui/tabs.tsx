import * as React from "react";

export function Tabs({ defaultValue, children, className }: any) {
  const [value, setValue] = React.useState(defaultValue);
  return <div className={className} data-value={value}>{React.Children.map(children, (child: any) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { value, setValue });
  })}</div>;
}
export function TabsList({ children, className, value, setValue }: any) {
  return <div className={className}>{React.Children.map(children, (child: any) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { value, setValue });
  })}</div>;
}
export function TabsTrigger({ value: v, setValue, value, children }: any) {
  const active = value === v;
  return (
    <button
      onClick={() => setValue(v)}
      className={active ? "px-3 py-1.5 text-sm rounded-xl bg-white/20" : "px-3 py-1.5 text-sm rounded-xl hover:bg-white/10"}
    >
      {children}
    </button>
  );
}
export function TabsContent({ value, children, className, ...props }: any) {
  if (props.value !== value) return null;
  return <div className={className}>{children}</div>;
}
