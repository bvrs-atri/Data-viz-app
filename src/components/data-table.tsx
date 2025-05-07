import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDataContext } from "@/context/DataContext";
import { DataTablePagination } from "./data-table-pagination";
import { DownloadButton } from "./download-button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: (
    handleDelete: (rowIndex: number) => void
  ) => ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedRow: (row: TData) => void;
  setIsEditSheetOpen: (open: boolean) => void;
}

export function DataTable<TData, TValue>({
  columns,
  setSelectedRow,
  setIsEditSheetOpen,
}: DataTableProps<TData, TValue>) {
  const { data: tableData, setData: setTableData } = useDataContext();

  const handleDelete = (rowIndex: number) => {
    setTableData((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: tableData,
    columns: columns(handleDelete),
    state: {
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="rounded-md border flex flex-2/3 flex-col overflow-hidden">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background shadow-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getPaginationRowModel().rows.map((row) => (
                <TableRow
                  className="text-center  group hover:bg-muted relative"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  data-testid="table-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  <TableCell className="relative w-[120px]">
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-2">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => {
                          setSelectedRow(row.original);
                          setIsEditSheetOpen(true);
                        }}
                        data-testid="editbutton"
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => handleDelete(row.index)}
                        data-testid="deletebutton"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns(handleDelete).length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-4">
        <div className="overflow-x-auto whitespace-nowrap flex-1">
          <ScrollArea className="flex whitespace-nowrap rounded-md border">
            <DataTablePagination table={table} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <DownloadButton data={tableData} />
      </div>
    </div>
  );
}
