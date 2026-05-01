import { ArrowLeft, ChevronDown, ChevronUp, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { CodeRow, CostCenterTable, GLCodeType } from "@shared/api";

export type Split = {
  id: string;
  ccTableId: string;
  ccAccount: string;
  glAccount: string;
};

export type Mapping = {
  fallback: string;
  splits: Split[];
};

interface MappingCardProps {
  row: CodeRow;
  codeType: GLCodeType;
  expanded: boolean;
  onToggle: () => void;
  mapping: Mapping;
  onUpdateFallback: (val: string) => void;
  onAddSplit: () => void;
  onUpdateSplit: (id: string, patch: Partial<Split>) => void;
  onRemoveSplit: (id: string) => void;
  ccTables: CostCenterTable[];
}

const MappingCard = ({
  row,
  codeType,
  expanded,
  onToggle,
  mapping,
  onUpdateFallback,
  onAddSplit,
  onUpdateSplit,
  onRemoveSplit,
  ccTables,
}: MappingCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex w-full flex-col gap-4 px-5 py-4 hover:bg-muted/40 transition-colors md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-8 min-w-[44px] items-center justify-center rounded-md bg-muted px-2.5 text-xs font-semibold text-foreground/80"
          >
            {row.code}
          </button>
          <span className="truncate text-sm font-medium text-foreground">{row.description}</span>
          <span className="rounded-md border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {codeType === "EARNING" ? "Earning" : "Deduction"}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1 md:max-w-sm">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            General Account #
          </label>
          <Input
            value={mapping.fallback}
            onChange={(event) => onUpdateFallback(event.target.value)}
            placeholder="Enter account #"
            className="h-10"
          />
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "inline-flex items-center justify-center gap-1 rounded-md border px-2.5 py-2 text-xs font-medium transition-colors",
            expanded
              ? "border-primary/30 bg-success-soft text-success-soft-foreground"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {expanded && (
        <div className="px-5 pb-5 pt-1 space-y-5 border-t border-border">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Cost Center Splits</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Add one or more cost center accounts (no percentage required).
            </p>

            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-[1fr_1fr_1fr_44px] gap-3 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div>Cost Center Table</div>
                <div>Cost Center Account</div>
                <div>Account #</div>
                <div className="text-right">Actions</div>
              </div>

              {mapping.splits.length === 0 && (
                <div className="rounded-md border border-dashed border-border px-4 py-6 text-center text-xs text-muted-foreground">
                  No splits yet. Click "Add Split" to begin.
                </div>
              )}

              {mapping.splits.map((split) => {
                const table = ccTables.find((t) => t.id === split.ccTableId);
                return (
                  <div key={split.id} className="grid grid-cols-[1fr_1fr_1fr_44px] gap-3 items-center">
                    <Select
                      value={split.ccTableId}
                      onValueChange={(v) =>
                        onUpdateSplit(split.id, { ccTableId: v, ccAccount: "" })
                      }
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        {ccTables.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={split.ccAccount}
                      onValueChange={(v) => onUpdateSplit(split.id, { ccAccount: v })}
                      disabled={!table}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {table?.accounts.map((a) => (
                          <SelectItem key={a.name} value={a.name}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      value={split.glAccount}
                      onChange={(event) =>
                        onUpdateSplit(split.id, { glAccount: event.target.value })
                      }
                      placeholder="Enter account #"
                      className="h-10"
                    />

                    <button
                      type="button"
                      onClick={() => onRemoveSplit(split.id)}
                      aria-label="Remove split"
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-destructive-soft text-destructive-soft-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={onAddSplit}
                className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Split
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface CostCenterPanelProps {
  tables: CostCenterTable[];
  activeId: string;
  onChange: (id: string) => void;
}

const CostCenterPanel = ({ tables, activeId, onChange }: CostCenterPanelProps) => {
  return (
    <aside className="rounded-2xl border border-border bg-card shadow-sm sticky top-6">
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Cost Center Tables</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Click a table to view its cost center accounts.
        </p>

        <div className="mt-4 flex gap-1 border-b border-border -mb-4">
          {tables.map((t) => {
            const active = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={cn(
                  "px-3 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {t.id}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
        {tables.map((t) => (
          <div key={t.id}>
            <h4 className="text-sm font-semibold text-foreground mb-2">{t.id}</h4>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="grid grid-cols-[40px_1fr] bg-muted/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div>#</div>
                <div>Cost Center Account</div>
              </div>
              <div className="divide-y divide-border">
                {t.accounts.map((a) => (
                  <div
                    key={a.num}
                    className="grid grid-cols-[40px_1fr] items-center px-3 py-2 text-sm text-foreground"
                  >
                    <div className="text-muted-foreground">{a.num}</div>
                    <div>{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

interface MappingPageProps {
  selectedEarningRows: CodeRow[];
  selectedDeductionRows: CodeRow[];
  ccTables: CostCenterTable[];
  expandedCode: string | null;
  setExpandedCode: (c: string | null) => void;
  mappings: Record<string, Mapping>;
  setMappings: React.Dispatch<React.SetStateAction<Record<string, Mapping>>>;
  activeCcId: string;
  setActiveCcId: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
  isSaving?: boolean;
}

export const MappingPage = ({
  selectedEarningRows,
  selectedDeductionRows,
  ccTables,
  expandedCode,
  setExpandedCode,
  mappings,
  setMappings,
  activeCcId,
  setActiveCcId,
  onBack,
  onContinue,
  isSaving = false,
}: MappingPageProps) => {
  const getMappingKey = (codeType: GLCodeType, code: string) =>
    `${codeType}:${code}`;

  const ensureMapping = (codeType: GLCodeType, code: string): Mapping =>
    mappings[getMappingKey(codeType, code)] || { fallback: "", splits: [] };

  const updateMapping = (
    codeType: GLCodeType,
    code: string,
    updater: (m: Mapping) => Mapping,
  ) => {
    const key = getMappingKey(codeType, code);
    setMappings((prev) => ({ ...prev, [key]: updater(ensureMapping(codeType, code)) }));
  };

  const renderMappingSection = (
    title: string,
    description: string,
    codeType: GLCodeType,
    rows: CodeRow[],
    emptyMessage: string,
  ) => (
    <section className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {rows.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      )}

      {rows.map((row) => {
        const mappingKey = getMappingKey(codeType, row.code);
        return (
          <MappingCard
            key={mappingKey}
            row={row}
            codeType={codeType}
            expanded={expandedCode === mappingKey}
            onToggle={() =>
              setExpandedCode(expandedCode === mappingKey ? null : mappingKey)
            }
            mapping={ensureMapping(codeType, row.code)}
            ccTables={ccTables}
            onUpdateFallback={(val) =>
              updateMapping(codeType, row.code, (m) => ({ ...m, fallback: val }))
            }
            onAddSplit={() =>
              updateMapping(codeType, row.code, (m) => ({
                ...m,
                splits: [
                  ...m.splits,
                  {
                    id: crypto.randomUUID(),
                    ccTableId: "",
                    ccAccount: "",
                    glAccount: "",
                  },
                ],
              }))
            }
            onUpdateSplit={(id, patch) =>
              updateMapping(codeType, row.code, (m) => ({
                ...m,
                splits: m.splits.map((s) => (s.id === id ? { ...s, ...patch } : s)),
              }))
            }
            onRemoveSplit={(id) =>
              updateMapping(codeType, row.code, (m) => ({
                ...m,
                splits: m.splits.filter((s) => s.id !== id),
              }))
            }
          />
        );
      })}
    </section>
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-border">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-[hsl(var(--primary-hover))] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Code Selection
        </button>
        <div className="text-sm font-medium text-muted-foreground">
          Step 2 of 4
          <span className="ml-3 inline-flex items-center gap-1 align-middle">
            <span className="h-1.5 w-8 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-1.5 w-8 rounded-full bg-muted" />
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span className="h-1.5 w-8 rounded-full bg-muted" />
            <span className="h-2 w-2 rounded-full bg-muted" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 p-8">
        <div className="space-y-6">
          {renderMappingSection(
            "Map Earning Codes",
            "Map each selected earning code to a General Ledger account. You can split to multiple cost centers.",
            "EARNING",
            selectedEarningRows,
            "No earning codes selected. Go back and select at least one code.",
          )}

          {renderMappingSection(
            "Map Deduction Codes",
            "Map each selected deduction code to a General Ledger account. You can split to multiple cost centers.",
            "DEDUCTION",
            selectedDeductionRows,
            "No deduction codes selected. Go back and select at least one code.",
          )}

          <div className="flex justify-center pt-2">
            <Button
              size="lg"
              onClick={onContinue}
              disabled={isSaving}
              className="gap-2 px-6 shadow-sm"
            >
              {isSaving ? "Saving..." : "Save & Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CostCenterPanel
          tables={ccTables}
          activeId={activeCcId}
          onChange={setActiveCcId}
        />
      </div>
    </div>
  );
};
