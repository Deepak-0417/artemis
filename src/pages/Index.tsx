import { useMemo, useState } from "react";
import { CodeSelection } from "@/components/CodeSelection";
import { MappingPage, Mapping } from "@/components/MappingPage";
import { costCenterTables, deductionCodes, earningCodes } from "@/data/glData";
import { toast } from "sonner";

const Index = () => {
  const [step, setStep] = useState<1 | 2>(1);

  // Preselect codes to mirror the mockup's initial state
  const [selectedEarnings, setSelectedEarnings] = useState<Set<string>>(
    new Set(["1", "12DD", "2", "3", "B", "Bus"])
  );
  const [selectedDeductions, setSelectedDeductions] = useState<Set<string>>(
    new Set(["401K", "FED", "MED", "SS"])
  );

  // Pre-fill the Salary mapping like the mockup
  const [mappings, setMappings] = useState<Record<string, Mapping>>({
    "1": {
      fallback: "5000 - Salaries Expense",
      splits: [
        { id: crypto.randomUUID(), ccTableId: "CC1", ccAccount: "Front Door", glAccount: "5101 - FOH Front Door" },
        { id: crypto.randomUUID(), ccTableId: "CC1", ccAccount: "Main Dining Room", glAccount: "5102 - FOH Dining Room" },
        { id: crypto.randomUUID(), ccTableId: "CC1", ccAccount: "Patio", glAccount: "5103 - FOH Patio" },
        { id: crypto.randomUUID(), ccTableId: "CC1", ccAccount: "Bar Area", glAccount: "5104 - FOH Bar" },
        { id: crypto.randomUUID(), ccTableId: "CC1", ccAccount: "Restrooms", glAccount: "5105 - FOH Restrooms" },
      ],
    },
  });

  const [expandedCode, setExpandedCode] = useState<string | null>("1");
  const [activeCcId, setActiveCcId] = useState("CC1");

  const toggleEarning = (code: string) => {
    setSelectedEarnings((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  const toggleDeduction = (code: string) => {
    setSelectedDeductions((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  const selectedEarningRows = useMemo(
    () => earningCodes.filter((r) => selectedEarnings.has(r.code)),
    [selectedEarnings]
  );

  return (
    <main className="min-h-screen bg-page py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              GL
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground leading-tight">
                GL Export Wizard
              </h1>
              <p className="text-xs text-muted-foreground">
                Map payroll codes to your General Ledger
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium ${
                step === 1
                  ? "border-primary/30 bg-success-soft text-success-soft-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${step === 1 ? "bg-primary" : "bg-muted-foreground/40"}`} />
              Page 1 · Select Codes
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium ${
                step === 2
                  ? "border-primary/30 bg-success-soft text-success-soft-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${step === 2 ? "bg-primary" : "bg-muted-foreground/40"}`} />
              Page 2 · Map Accounts
            </span>
          </div>
        </header>

        {step === 1 ? (
          <CodeSelection
            earningCodes={earningCodes}
            deductionCodes={deductionCodes}
            selectedEarnings={selectedEarnings}
            selectedDeductions={selectedDeductions}
            onToggleEarning={toggleEarning}
            onToggleDeduction={toggleDeduction}
            onContinue={() => {
              setStep(2);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : (
          <MappingPage
            selectedRows={selectedEarningRows}
            ccTables={costCenterTables}
            expandedCode={expandedCode}
            setExpandedCode={setExpandedCode}
            mappings={mappings}
            setMappings={setMappings}
            activeCcId={activeCcId}
            setActiveCcId={setActiveCcId}
            onBack={() => {
              setStep(1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onContinue={() =>
              toast.success("Mappings saved", {
                description: "Continue to the next step of the wizard.",
              })
            }
          />
        )}
      </div>
    </main>
  );
};

export default Index;
