import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { Event } from "../lib/data";
import { DefaultHeader } from "./default-header";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";

const columnHelper = createColumnHelper<Event>();

export const getColumns = (handleDelete: (rowIndex: number) => void) => [
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
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-5">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-b shadow z-10 bg-background shadow-md w-25 rounded-md ">
          <DropdownMenuLabel className="flex items-center justify-center text-center h-8">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-t" />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(row.index)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];
