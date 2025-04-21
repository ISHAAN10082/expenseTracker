import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </div>
  );
}
