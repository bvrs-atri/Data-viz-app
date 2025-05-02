// pages/TablePage.tsx
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { data, Event } from "@/lib/data";

export default function TablePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center"></h2>
      <DataTable<Event, any> columns={columns} data={data} />
    </div>
  );
}
