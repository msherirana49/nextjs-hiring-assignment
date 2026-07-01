import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export interface ColumnConfig<TData extends object> {
  key: Extract<keyof TData, string>;
  header: string;
  width?: number;
  minWidth?: number;
  sortable?: boolean;
  searchable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: TData[Extract<keyof TData, string>], row: TData) => ReactNode;
}

export interface TableColorConfig {
  accent?: "primary" | "secondary" | "success" | "danger" | "warning";
}
