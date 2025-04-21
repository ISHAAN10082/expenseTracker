import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-white/10 text-white": variant === "default",
          "bg-green-500/20 text-green-400": variant === "success",
          "bg-yellow-500/20 text-yellow-400": variant === "warning",
          "bg-red-500/20 text-red-400": variant === "error",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
