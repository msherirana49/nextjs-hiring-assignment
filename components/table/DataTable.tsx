"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, GripVertical, Search } from "lucide-react";
import { useMemo, useState, type DragEvent, type MouseEvent as ReactMouseEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import type { ColumnConfig, SortDirection, TableColorConfig } from "@/types/table";
import { cn } from "@/utils/cn";

interface DataTableProps<TData extends object> {
  columns: ColumnConfig<TData>[];
  data: TData[];
  rowKey: (row: TData) => string | number;
  loading?: boolean;
  title?: string;
  description?: string;
  colors?: TableColorConfig;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

interface SortState<TData extends object> {
  key: Extract<keyof TData, string>;
  direction: SortDirection;
}

function getComparableValue(value: unknown): string | number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const date = Date.parse(value);
    if (!Number.isNaN(date) && value.includes("-")) {
      return date;
    }
    return value.toLowerCase();
  }

  return String(value ?? "").toLowerCase();
}

function alignClass(align: "left" | "center" | "right" | undefined): string {
  if (align === "right") {
    return "text-right";
  }

  if (align === "center") {
    return "text-center";
  }

  return "text-left";
}

const accentClasses: Record<NonNullable<TableColorConfig["accent"]>, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  success: "bg-success text-white",
  danger: "bg-danger text-white",
  warning: "bg-warning text-white"
};

export function DataTable<TData extends object>({
  columns,
  data,
  rowKey,
  loading = false,
  title,
  description,
  colors = { accent: "primary" },
  pageSizeOptions = [5, 10, 25],
  defaultPageSize = 5
}: DataTableProps<TData>) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [sort, setSort] = useState<SortState<TData> | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [columnOrder, setColumnOrder] = useState<Array<Extract<keyof TData, string>>>(columns.map((column) => column.key));
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    Object.fromEntries(columns.map((column) => [column.key, column.width ?? 180]))
  );
  const [draggedColumnKey, setDraggedColumnKey] = useState<Extract<keyof TData, string> | null>(null);

  const orderedColumns = useMemo(() => {
    return columnOrder
      .map((key) => columns.find((column) => column.key === key))
      .filter((column): column is ColumnConfig<TData> => Boolean(column));
  }, [columnOrder, columns]);

  const filteredData = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return data;
    }

    const searchableColumns = columns.filter((column) => column.searchable !== false);
    return data.filter((row) =>
      searchableColumns.some((column) => String(row[column.key] ?? "").toLowerCase().includes(normalizedQuery))
    );
  }, [columns, data, debouncedQuery]);

  const sortedData = useMemo(() => {
    if (!sort) {
      return filteredData;
    }

    return [...filteredData].sort((first, second) => {
      const firstValue = getComparableValue(first[sort.key]);
      const secondValue = getComparableValue(second[sort.key]);

      if (firstValue < secondValue) {
        return sort.direction === "asc" ? -1 : 1;
      }
      if (firstValue > secondValue) {
        return sort.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPageIndex = Math.min(pageIndex, pageCount - 1);
  const paginatedData = sortedData.slice(currentPageIndex * pageSize, currentPageIndex * pageSize + pageSize);

  const handleSort = (key: Extract<keyof TData, string>, sortable?: boolean) => {
    if (sortable === false) {
      return;
    }

    setPageIndex(0);
    setSort((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const startResize = (event: ReactMouseEvent<HTMLSpanElement>, key: string, minWidth = 120) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = columnWidths[key] ?? 180;

    const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const nextWidth = Math.max(minWidth, startWidth + moveEvent.clientX - startX);
      setColumnWidths((current) => ({ ...current, [key]: nextWidth }));
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleDrop = (event: DragEvent<HTMLTableCellElement>, targetKey: Extract<keyof TData, string>) => {
    event.preventDefault();
    if (!draggedColumnKey || draggedColumnKey === targetKey) {
      return;
    }

    setColumnOrder((current) => {
      const next = current.filter((key) => key !== draggedColumnKey);
      const targetIndex = next.indexOf(targetKey);
      next.splice(targetIndex, 0, draggedColumnKey);
      return next;
    });
    setDraggedColumnKey(null);
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <div className="flex flex-col gap-4 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          {title ? <h2 className="text-xl font-black tracking-tight text-ink">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm leading-6 text-muted">{description}</p> : null}
        </div>
        <div className="w-full sm:max-w-xs">
          <Input
            aria-label="Search table"
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Search records"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPageIndex(0);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-muted/5">
              {orderedColumns.map((column) => {
                const activeSort = sort?.key === column.key;
                return (
                  <th
                    key={column.key}
                    draggable
                    onDragStart={() => setDraggedColumnKey(column.key)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => handleDrop(event, column.key)}
                    className={cn("group relative select-none px-4 py-4 font-black text-muted", alignClass(column.align))}
                    style={{ width: columnWidths[column.key], minWidth: column.minWidth ?? 120 }}
                    scope="col"
                  >
                    <button
                      type="button"
                      className={cn("inline-flex items-center gap-2", column.sortable === false ? "cursor-default" : "hover:text-primary")}
                      onClick={() => handleSort(column.key, column.sortable)}
                    >
                      <GripVertical className="h-3.5 w-3.5 opacity-30 transition group-hover:opacity-80" />
                      {column.header}
                      {activeSort ? (
                        <ChevronDown className={cn("h-4 w-4 transition", sort?.direction === "asc" ? "rotate-180" : "rotate-0")} />
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                    <span
                      className="absolute right-0 top-1/2 h-7 w-1 -translate-y-1/2 cursor-col-resize rounded bg-line transition hover:bg-primary"
                      onMouseDown={(event) => startResize(event, column.key, column.minWidth)}
                      role="separator"
                      aria-orientation="vertical"
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: pageSize }).map((_, rowIndex) => (
                  <tr className="border-b border-line last:border-b-0" key={`skeleton-${rowIndex.toString()}`}>
                    {orderedColumns.map((column) => (
                      <td className="px-4 py-4" key={column.key}>
                        <Skeleton className="h-5 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : paginatedData.map((row) => (
                  <tr className="border-b border-line transition last:border-b-0 hover:bg-primary/5" key={rowKey(row)}>
                    {orderedColumns.map((column) => {
                      const rawValue = row[column.key];
                      return (
                        <td className={cn("px-4 py-4 font-semibold text-ink", alignClass(column.align))} key={column.key}>
                          {column.render ? column.render(rawValue, row) : String(rawValue ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!loading && paginatedData.length === 0 ? (
        <div className="grid place-items-center px-6 py-16 text-center">
          <div className="rounded-2xl bg-muted/10 px-6 py-5">
            <p className="text-lg font-black text-ink">No Data Found</p>
            <p className="mt-1 text-sm text-muted">Try adjusting the search query.</p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-semibold text-muted">
          Showing {paginatedData.length === 0 ? 0 : currentPageIndex * pageSize + 1}-
          {Math.min((currentPageIndex + 1) * pageSize, sortedData.length)} of {sortedData.length}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-muted">
            Rows
            <select
              className="rounded-lg border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-primary"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPageIndex(0);
              }}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-2">
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-primary hover:text-primary disabled:opacity-40"
              type="button"
              disabled={currentPageIndex === 0}
              onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className={cn("rounded-lg px-3 py-2 text-sm font-black", accentClasses[colors.accent ?? "primary"])}>
              {currentPageIndex + 1} / {pageCount}
            </span>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-primary hover:text-primary disabled:opacity-40"
              type="button"
              disabled={currentPageIndex >= pageCount - 1}
              onClick={() => setPageIndex((current) => Math.min(pageCount - 1, current + 1))}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
