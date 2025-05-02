"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/lib/data";
import { useMemo } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: Event[];
}

export default function ExecutionTimeLineChart({ data }: Props) {
  const chartData = useMemo(
    () =>
      data.map((row) => ({
        y: row.ExecutionTime,
      })),
    [data]
  );

  return (
    <Card className="ml-3 mb-3 mr-6">
      <CardHeader>
        <CardTitle>Execution Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis tick={false} axisLine={false} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#000000" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
