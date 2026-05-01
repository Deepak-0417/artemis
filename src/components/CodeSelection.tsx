import { useState } from "react";
import { Check, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CodeRow } from "@shared/api";

interface CodeTableProps {
  title: string;
  rows: CodeRow[];
  selected: Set<string>;
  onToggle: (code: string) => void;
}

const CodeTable = ({ title, rows, selected, onToggle }: CodeTableProps) => {
  const [expanded, setExpanded] = useState(false);
  const visibleRows = expanded ? rows : rows.slice(0, 7);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="inline-flex items-center rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success-soft-foreground">
          Selected: {selected.size}
        </span>
      </div>

      <div className="px-6 pt-4">
        <div className="grid grid-cols-[110px_1fr_70px] gap-4 px-2 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Code</div>
          <div>Description</div>
          <div className="text-right">Select</div>
        </div>

        <div className="divide-y divide-border">
          {visibleRows.map((row) => {
            const isSelected = selected.has(row.code);
            return (
              <div
                key={row.code}
                className="grid grid-cols-[110px_1fr_70px] items-center gap-4 px-2 py-3"
              >
                <div>
                  <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-foreground/80 min-w-[44px]">
                    {row.code}
                  </span>
                </div>
                <div className="text-sm text-foreground">{row.description}</div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onToggle(row.code)}
                    aria-pressed={isSelected}
                    aria-label={`Select ${row.description}`}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md border transition-all",
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground shadow-sm"
                        : "bg-card border-input hover:border-primary/50"
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4" strokeWidth={3} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {rows.length > 7 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-center gap-1 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? "Show less" : "Show more"}
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
};

interface CodeSelectionProps {
  earningCodes: CodeRow[];
  deductionCodes: CodeRow[];
  selectedEarnings: Set<string>;
  selectedDeductions: Set<string>;
  onToggleEarning: (code: string) => void;
  onToggleDeduction: (code: string) => void;
  onContinue: () => void;
}

export const CodeSelection = ({
  earningCodes,
  deductionCodes,
  selectedEarnings,
  selectedDeductions,
  onToggleEarning,
  onToggleDeduction,
  onContinue,
}: CodeSelectionProps) => {
  const canContinue = selectedEarnings.size > 0 || selectedDeductions.size > 0;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="px-8 pt-8 pb-6 border-b border-border">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Artemis – Select Codes
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Select the earning and deduction codes you want to map.
        </p>
      </div>

      <div className="space-y-6 p-8">
        <CodeTable
          title="Earning Codes"
          rows={earningCodes}
          selected={selectedEarnings}
          onToggle={onToggleEarning}
        />
        <CodeTable
          title="Deduction Codes"
          rows={deductionCodes}
          selected={selectedDeductions}
          onToggle={onToggleDeduction}
        />
      </div>

      <div className="flex justify-end px-8 pb-8">
        <Button
          size="lg"
          onClick={onContinue}
          disabled={!canContinue}
          className="gap-2 px-6 shadow-sm"
        >
          Continue to Mapping
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
