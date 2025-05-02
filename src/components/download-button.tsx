"use client";

import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  data: Record<string, any>[];
}

export function DownloadButton({ data }: DownloadButtonProps) {
  const handleDownload = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);

    const csvRows = data.map((row) =>
      headers
        .map((key) => `"${String(row[key]).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "full-table-data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download CSV</Button>;
}
