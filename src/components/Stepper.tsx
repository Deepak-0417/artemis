import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  current: number; // 1-indexed
  total: number;
}

export const Stepper = ({ current, total }: StepperProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        Step {current} of {total}
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const idx = i + 1;
          const isDone = idx < current;
          const isCurrent = idx === current;
          return (
            <div key={i} className="flex items-center">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                  isDone && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  !isDone && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : idx}
              </div>
              {idx < total && (
                <div
                  className={cn(
                    "h-0.5 w-8 transition-colors",
                    isDone ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
