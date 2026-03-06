import {
  flexRender,
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  SortingState,
  RowSelectionState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Search } from 'lucide-react';

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  containerClassName?: string
  pageSize?: number
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: React.Dispatch<
    React.SetStateAction<RowSelectionState>
  >;
  enableSelection?: boolean;
  toolbarActions?: React.ReactNode;
  tablecellClass?: string;
}

export function DataTable<TData>({
  columns,
  data,
  pageSize = 5,
  containerClassName,
  enableSelection = false,
  toolbarActions,
  onRowSelectionChange,
  rowSelection

}: DataTableProps<TData>) {

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const Data = Array.isArray(data) ? data : [];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
      sorting,
      ...(rowSelection ? { rowSelection } : {}),
    },
    getRowId: (row: any) => row.id,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    ...(onRowSelectionChange
      ? { onRowSelectionChange, enableSelection: true }
      : { enableSelection: false }),
  })



  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex gap-4 justify-between">
        {/* Left section */}
        {/* <div className="flex items-center gap-3">
          {enableSelection && (
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          )}
        </div> */}

        {/* Right section — search */}
        <div className="w-full relative">
          <Search className="absolute w-4 top-1.5 left-2 text-gray-700"/>
         <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className={cn("broder border-slate-400 w-1/5 ps-8")}
        />
        </div>
     
        {toolbarActions}
      </div>
      <div
        className={cn(
          "w-full overflow-x-auto rounded-lg border bg-background",
          containerClassName
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-sm font-semibold text-muted-foreground"
                  >
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b last:border-b-0 hover:bg-muted/40 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-sm align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button
          type="button"
          className="btn-box-shadow"
          variant="paginationBtn"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft className="!h-4 !w-4"/>
        </Button>
        <span className="text-md">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button 
          type="button"
          className="btn-box-shadow "
          variant="paginationBtn"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight className="!h-4 !w-4" />
        </Button>
      </div>
    </div>
  )
}
