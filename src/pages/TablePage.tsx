// pages/TablePage.tsx
import { getColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useDataContext } from "@/context/DataContext";
import { Event } from "@/lib/data";

export default function TablePage() {
  const { data } = useDataContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center"></h2>
      <DataTable<Event, any> columns={getColumns} data={data} />
    </div>
  );
}
