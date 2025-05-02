// components/data-table-pagination.tsx
"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<T> {
  table: Table<T>
}

export function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  const currentPage = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            aria-disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>

        {Array.from({ length: pageCount }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index === currentPage}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            aria-disabled={!table.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
