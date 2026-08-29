"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type PaginationState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2, Download, Search } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./button";
import { Input } from "./input";
import { Select } from "./select";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  error?: string;
  // Server-side options
  manualPagination?: boolean;
  pageCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  // Localized messages
  locale?: "km" | "en";
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  error,
  manualPagination = false,
  pageCount = -1,
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
  locale = "km",
  className,
}: DataTableProps<TData, TValue>) {
  // Local states for filtering, sorting, visibility, selection
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Handle server-side triggers
  React.useEffect(() => {
    if (manualPagination && onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [pagination, manualPagination]);

  React.useEffect(() => {
    if (manualPagination && onSortingChange) {
      onSortingChange(sorting);
    }
  }, [sorting, manualPagination]);

  React.useEffect(() => {
    if (manualPagination && onColumnFiltersChange) {
      onColumnFiltersChange(columnFilters);
    }
  }, [columnFilters, manualPagination]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    // Server-side flags
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    // Handlers
    onSortingChange: (updater) => {
      const nextState = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(nextState);
    },
    onColumnFiltersChange: (updater) => {
      const nextState = typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(nextState);
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const nextState = typeof updater === "function" ? updater(pagination) : updater;
      setPagination(nextState);
    },
    // Core models
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Localized pagination text
  const kmPagination = {
    search: "ស្វែងរក...",
    csvExport: "ទាញយក CSV",
    columns: "ជម្រើសជួរឈរ",
    page: "ទំព័រ",
    of: "នៃ",
    goToPage: "ទៅកាន់ទំព័រ",
    rowsPerPage: "ចំនួនជួរក្នុងមួយទំព័រ",
    showing: "បង្ហាញជួរទី",
    to: "ដល់",
    total: "នៃចំនួនសរុប",
    noResults: "គ្មានទិន្នន័យត្រូវបានរកឃើញទេ",
    loading: "កំពុងទាញយកទិន្នន័យ...",
    error: "មានកំហុសក្នុងការទាញយកទិន្នន័យ",
  };

  const enPagination = {
    search: "Search...",
    csvExport: "Export CSV",
    columns: "Columns",
    page: "Page",
    of: "of",
    goToPage: "Go to page",
    rowsPerPage: "Rows per page",
    showing: "Showing",
    to: "to",
    total: "of",
    noResults: "No results found.",
    loading: "Loading data...",
    error: "Error loading data",
  };

  const labels = locale === "km" ? kmPagination : enPagination;

  // CSV Export utility
  const handleCSVExport = () => {
    const headers = columns
      .filter((col) => typeof col.header === "string")
      .map((col) => col.header as string);

    if (headers.length === 0) return;

    const rows = table.getFilteredRowModel().rows.map((row) => {
      return columns
        .filter((col) => typeof col.header === "string")
        .map((col) => {
          const cellValue = row.getValue(col.id || (col as any).accessorKey);
          return cellValue !== undefined ? `"${String(cellValue).replace(/"/g, '""')}"` : '""';
        });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `data_table_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Table controls header */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder={labels.search}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="w-full"
            animated={false}
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* CSV Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCSVExport}
            leftIcon={<Download className="h-4 w-4" />}
            className="text-xs"
            animated={false}
          >
            {labels.csvExport}
          </Button>

          {/* Column toggling */}
          <Select
            options={table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                value: column.id,
                label: typeof column.columnDef.header === "string" ? (column.columnDef.header as string) : column.id,
              }))}
            onChange={(val) => {
              const column = table.getColumn(val);
              if (column) {
                column.toggleVisibility(!column.getIsVisible());
              }
            }}
            placeholder={labels.columns}
            searchable={false}
            locale={locale}
            animated={false}
            className="w-[140px] text-xs h-9"
          />
        </div>
      </div>

      {/* Main Table view */}
      <div className="rounded-md border border-border bg-card overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block w-full overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm select-none">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-border bg-muted/50 hover:bg-muted/50 transition-colors"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {labels.loading}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-destructive font-medium">
                    {labels.error}: {error}
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {labels.noResults}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors data-[state=selected]:bg-muted"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card mode */}
        <div className="block md:hidden p-4 space-y-4">
          {loading ? (
            <div className="py-6 text-center text-muted-foreground">{labels.loading}</div>
          ) : error ? (
            <div className="py-6 text-center text-destructive font-medium">
              {labels.error}: {error}
            </div>
          ) : table.getRowModel().rows.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">{labels.noResults}</div>
          ) : (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className={cn(
                  "rounded-lg border border-border bg-background p-4 space-y-3 shadow-sm transition-colors",
                  row.getIsSelected() && "border-primary bg-muted/20"
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  const headerText = typeof cell.column.columnDef.header === "string"
                    ? (cell.column.columnDef.header as string)
                    : "";

                  return (
                    <div key={cell.id} className="flex justify-between items-start gap-4">
                      {headerText && (
                        <span className="text-xs font-semibold text-muted-foreground select-none">
                          {headerText}
                        </span>
                      )}
                      <span className="text-sm text-right">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination control footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-1 select-none">
        <div className="text-xs text-muted-foreground">
          {labels.showing}{" "}
          <span className="font-semibold text-foreground">
            {pagination.pageIndex * pagination.pageSize + (data.length > 0 ? 1 : 0)}
          </span>{" "}
          {labels.to}{" "}
          <span className="font-semibold text-foreground">
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, table.getFilteredRowModel().rows.length)}
          </span>{" "}
          {labels.total}{" "}
          <span className="font-semibold text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {labels.rowsPerPage}
            </span>
            <Select
              options={[10, 20, 30, 40, 50].map((size) => ({
                value: String(size),
                label: String(size),
              }))}
              value={String(pagination.pageSize)}
              onChange={(val) => table.setPageSize(Number(val))}
              searchable={false}
              locale={locale}
              animated={false}
              className="w-[70px] h-8 text-xs"
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              animated={false}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              animated={false}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-xs text-muted-foreground px-2 whitespace-nowrap">
              {labels.page} <span className="font-semibold text-foreground">{pagination.pageIndex + 1}</span> {labels.of}{" "}
              <span className="font-semibold text-foreground">{table.getPageCount() || 1}</span>
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              animated={false}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              animated={false}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
