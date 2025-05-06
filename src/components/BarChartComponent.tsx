"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/lib/data"; // adjust path if needed
import * as React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: Event[];
};

export function TaskDurationBarChart({ data }: Props) {
  const chartData = React.useMemo(() => {
    const durations = data.map((d) => d.TaskDuration);
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const avg = durations.reduce((sum, val) => sum + val, 0) / durations.length;

    return [
      { label: "Min", value: min },
      { label: "Avg", value: parseFloat(avg.toFixed(2)) },
      { label: "Max", value: max },
    ];
  }, [data]);

  return (
    <Card className="p-4 mr-3">
      <CardHeader className="items-center justify-center">
        <CardTitle>Task Duration </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full">
        <BarChart
          width={300}
          height={200}
          data={chartData}
          className="v-center"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="hsl(0, 0%, 40%)" />
        </BarChart>
      </CardContent>
    </Card>
  );
}
