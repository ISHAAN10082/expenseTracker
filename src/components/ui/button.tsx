import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600":
            variant === "primary",
          "bg-white/10 text-white hover:bg-white/20": variant === "secondary",
          "border border-white/10 bg-transparent text-white hover:bg-white/10":
            variant === "outline",
          "bg-transparent text-white hover:bg-white/10": variant === "ghost",
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
