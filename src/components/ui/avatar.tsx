import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  fallback: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  className,
  src,
  fallback,
  size = "md",
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-block overflow-hidden rounded-full bg-white/10",
        {
          "h-8 w-8": size === "sm",
          "h-10 w-10": size === "md",
          "h-12 w-12": size === "lg",
        },
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={fallback}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
          {fallback}
        </div>
      )}
    </div>
  );
}
