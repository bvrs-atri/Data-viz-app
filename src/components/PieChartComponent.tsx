"use client";

import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Event } from "@/lib/data"; // adjust path as needed

const chartConfig = {
  "In Progress": {
    label: "In Progress",
    color: "hsl(0,0,20%)",
  },
  Done: {
    label: "Done",
    color: "hsl(0,0%,80%)",
  },
  Errors: {
    label: "Errors",
    color: "hsl(0,0%,60%)",
  },
  Pending: {
    label: "Pending",
    color: "hsl(0,0%,40%)",
  },
} satisfies ChartConfig;

type PieChartComponentProps = {
  data: Event[];
};

export function PieChartComponent({ data }: PieChartComponentProps) {
  const chartData = React.useMemo(() => {
    const statusCounts: Record<string, number> = {};

    data.forEach((item) => {
      statusCounts[item.TaskStatus] = (statusCounts[item.TaskStatus] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      fill: chartConfig[status as keyof typeof chartConfig]?.color || "#ccc",
    }));
  }, [data]);

  const total = chartData.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <Card className="p-4 mr-3">
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
