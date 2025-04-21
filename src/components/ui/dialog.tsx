import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-lg p-4 sm:p-6">
        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DialogContent({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn("mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogTitle({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <h2
      className={cn("text-xl font-semibold text-white", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn("text-sm text-white/60", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function DialogFooter({ className, children, ...props }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn("mt-6 flex justify-end space-x-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
