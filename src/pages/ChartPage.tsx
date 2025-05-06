// pages/ChartPage.tsx
import { TaskDurationBarChart } from "@/components/BarChartComponent"; // if you have one
import { PieChartComponent } from "@/components/PieChartComponent";
import { DataTransferBarChart } from "@/components/bar-chart-datatransfer";
import ExecutionTimeLineChart from "@/components/executiontimelinechart";
import { Card } from "@/components/ui/card";
import { useDataContext } from "@/context/DataContext";

export default function ChartPage() {
  const { data } = useDataContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold"></h2>
      <Card className="mt-4">
        <div className="grid grid-cols-3 p-3">
          <PieChartComponent data={data} />
          <TaskDurationBarChart data={data} />
          <DataTransferBarChart data={data} />
        </div>
        <ExecutionTimeLineChart data={data} />
      </Card>
    </div>
  );
}
