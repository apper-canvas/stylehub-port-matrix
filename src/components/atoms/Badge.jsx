import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className,
  variant = "primary",
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;