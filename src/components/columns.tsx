import { createColumnHelper } from "@tanstack/react-table";
import { Event } from "../lib/data";
import { DefaultHeader } from "./default-header";

export const columnHelper = createColumnHelper<Event>();

export const columns = [
  columnHelper.accessor("PipelineId", {
    id: "PipelineId",
    cell: (info) => info.getValue(),
    header: (info) => <DefaultHeader info={info} name="Pipeline Id" />,
  }),
  columnHelper.accessor((row) => row.TaskStatus, {
    id: "TaskStatus",
    cell: (info) => info.renderValue(),
    header: (info) => <DefaultHeader info={info} name="Task Status" />,
  }),
  columnHelper.accessor("TaskDuration", {
    header: (info) => <DefaultHeader info={info} name="Task Duration" />,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("DataTransferVolume", {
    header: (info) => <DefaultHeader info={info} name="DataTransfer Volume" />,
  }),
  columnHelper.accessor("ResourceUtilization", {
    header: (info) => <DefaultHeader info={info} name="Resource Utilization" />,
  }),
  columnHelper.accessor("ExecutionTime", {
    header: (info) => <DefaultHeader info={info} name="Execution Time" />,
  }),
];
