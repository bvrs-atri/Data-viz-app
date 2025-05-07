// pages/TablePage.tsx
import { AddRowButton } from "@/components/AddRowButton";
import { getColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { EditSheet } from "@/components/EditSheet";
import { useDataContext } from "@/context/DataContext";
import { Event } from "@/lib/data";
import { useState } from "react";

export default function TablePage() {
  const { data } = useDataContext();
  const [selectedRow, setSelectedRow] = useState<Event | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  return (
    <div data-testid="cytable">
      <AddRowButton></AddRowButton>
      <DataTable
        data={data}
        columns={getColumns} // columns will just be pure data columns now
        setSelectedRow={setSelectedRow}
        setIsEditSheetOpen={setIsEditSheetOpen}
      />
      <EditSheet
        open={isEditSheetOpen}
        row={selectedRow}
        onOpenChange={setIsEditSheetOpen}
      />
    </div>
  );
}
