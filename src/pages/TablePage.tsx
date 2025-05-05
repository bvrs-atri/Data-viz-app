// pages/TablePage.tsx
import { AddRowButton } from "@/components/AddRowButton";
import { getColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useDataContext } from "@/context/DataContext";
import { Event } from "@/lib/data";

export default function TablePage() {
  const { data } = useDataContext();

  return (
    <div>
      <AddRowButton></AddRowButton>
      <DataTable<Event, any> columns={getColumns} data={data} />
    </div>
  );
}
