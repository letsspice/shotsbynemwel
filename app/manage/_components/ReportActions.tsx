"use client";

import { Download, FileJson } from "lucide-react";
import { buttonClass } from "./ui";

/** PDF via the browser's print dialog (print styles hide the admin chrome), plus a JSON backup. */
export default function ReportActions({ records }: { records: unknown }) {
  function downloadJson() {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shotsbynemwel-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <button type="button" className={buttonClass.secondary} onClick={downloadJson}>
        <FileJson size={16} aria-hidden /> Export JSON backup
      </button>
      <button type="button" className={buttonClass.primary} onClick={() => window.print()}>
        <Download size={16} aria-hidden /> Download PDF
      </button>
    </>
  );
}
