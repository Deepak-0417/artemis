import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDeductionCodes, getEarningCodes } from "@/api/codes";
import { getCostCenterTables } from "@/api/costCenters";
import { saveGLMappings } from "@/api/glMappings";
import { CodeSelection } from "@/components/CodeSelection";
import { MappingPage, Mapping } from "@/components/MappingPage";
import { toast } from "sonner";
import type { SaveGLCodeMapping } from "@shared/api";

const Index = () => {
  const { co } = useParams<{ co: string }>();
  const [step, setStep] = useState<1 | 2>(1);

  const {
    data: earningCodes = [],
    isLoading: isLoadingEarnings,
    isError: hasEarningError,
  } = useQuery({
    queryKey: ["earning-codes", co],
    queryFn: () => getEarningCodes(co || ""),
    enabled: Boolean(co),
  });

  const {
    data: deductionCodes = [],
    isLoading: isLoadingDeductions,
    isError: hasDeductionError,
  } = useQuery({
    queryKey: ["deduction-codes", co],
    queryFn: () => getDeductionCodes(co || ""),
    enabled: Boolean(co),
  });

  const {
    data: costCenterTables = [],
    isLoading: isLoadingCostCenters,
    isError: hasCostCenterError,
  } = useQuery({
    queryKey: ["cost-center-tables", co],
    queryFn: () => getCostCenterTables(co || ""),
    enabled: Boolean(co),
  });

  const isLoadingCodes =
    isLoadingEarnings || isLoadingDeductions || isLoadingCostCenters;
  const hasCodeError =
    hasEarningError || hasDeductionError || hasCostCenterError;

  const [selectedEarnings, setSelectedEarnings] = useState<Set<string>>(
    new Set()
  );
  const [selectedDeductions, setSelectedDeductions] = useState<Set<string>>(
    new Set()
  );

  const [mappings, setMappings] = useState<Record<string, Mapping>>({});

  const [expandedCode, setExpandedCode] = useState<string | null>(null);
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
    [earningCodes, selectedEarnings]
  );

  const selectedDeductionRows = useMemo(
    () => deductionCodes.filter((r) => selectedDeductions.has(r.code)),
    [deductionCodes, selectedDeductions]
  );

  const saveMappingsMutation = useMutation({
    mutationFn: saveGLMappings,
    onSuccess: () =>
      toast.success("Mappings saved", {
        description: "Your GL mapping inputs were saved.",
      }),
    onError: () =>
      toast.error("Could not save mappings", {
        description: "Please check the inputs and try again.",
      }),
  });

  const buildSplitRows = (mapping: Mapping) =>
    mapping.splits.map((split, index) => {
      const table = costCenterTables.find((t) => t.id === split.ccTableId);
      const account = table?.accounts.find((a) => a.name === split.ccAccount);

      return {
        ccTable: split.ccTableId,
        ccCode: account?.num ?? "",
        ccName: split.ccAccount || null,
        accountNumber: split.glAccount,
        sortOrder: index + 1,
      };
    });

  const getMappingKey = (codeType: "EARNING" | "DEDUCTION", code: string) =>
    `${codeType}:${code}`;

  const handleSaveMappings = () => {
    const earningMappings: SaveGLCodeMapping[] = selectedEarningRows.map((row) => {
      const mapping = mappings[getMappingKey("EARNING", row.code)] || {
        fallback: "",
        splits: [],
      };

      return {
        codeType: "EARNING",
        code: row.code,
        description: row.description,
        fallbackAccount: mapping.fallback,
        splits: buildSplitRows(mapping),
      };
    });

    const deductionMappings: SaveGLCodeMapping[] = selectedDeductionRows.map((row) => {
      const mapping = mappings[getMappingKey("DEDUCTION", row.code)] || {
        fallback: "",
        splits: [],
      };

      return {
        codeType: "DEDUCTION",
        code: row.code,
        description: row.description,
        fallbackAccount: mapping.fallback,
        splits: buildSplitRows(mapping),
      };
    });

    saveMappingsMutation.mutate({
      co: co || "",
      mappings: [...earningMappings, ...deductionMappings],
    });
  };

  if (!co) {
    return (
      <main className="min-h-screen bg-page py-10 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Company code required
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Open the wizard with a company code in the URL, for example /0250.
          </p>
        </div>
      </main>
    );
  }

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
                Artemis
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

        {isLoadingCodes ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground shadow-sm">
            Loading earning, deduction, and cost center codes...
          </div>
        ) : hasCodeError ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-sm text-destructive shadow-sm">
            Could not load earning, deduction, or cost center codes for company {co}.
          </div>
        ) : step === 1 ? (
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
            selectedEarningRows={selectedEarningRows}
            selectedDeductionRows={selectedDeductionRows}
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
            onContinue={handleSaveMappings}
            isSaving={saveMappingsMutation.isPending}
          />
        )}
      </div>
    </main>
  );
};

export default Index;
