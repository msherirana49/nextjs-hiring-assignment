"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/table/DataTable";
import { USERS_DATA } from "@/constants/demoData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSectionLoading } from "@/redux/slices/uiLoadingSlice";
import type { ColumnConfig } from "@/types/table";
import type { DashboardUser } from "@/types/user";
import { formatCurrency, formatDate } from "@/utils/format";

const columns: ColumnConfig<DashboardUser>[] = [
  {
    key: "name",
    header: "Name",
    width: 210,
    render: (value, row) => (
      <div>
        <p className="font-black text-ink">{String(value)}</p>
        <p className="text-xs font-semibold text-muted">{row.email}</p>
      </div>
    )
  },
  {
    key: "role",
    header: "Role",
    width: 210
  },
  {
    key: "status",
    header: "Status",
    width: 140,
    align: "center",
    render: (value) => {
      const status = String(value);
      const tone = status === "Active" ? "success" : status === "Invited" ? "warning" : "danger";
      return <Badge tone={tone}>{status}</Badge>;
    }
  },
  {
    key: "team",
    header: "Team",
    width: 150
  },
  {
    key: "createdAt",
    header: "Created",
    width: 150,
    render: (value) => formatDate(String(value))
  },
  {
    key: "revenue",
    header: "Revenue",
    width: 150,
    align: "right",
    render: (value) => formatCurrency(Number(value))
  }
];

export function UserManagementTable() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.uiLoading.sections.usersTable ?? false);

  useEffect(() => {
    dispatch(setSectionLoading({ key: "usersTable", value: true }));
    const timeout = window.setTimeout(() => {
      dispatch(setSectionLoading({ key: "usersTable", value: false }));
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-line bg-surface/90 p-6 shadow-soft backdrop-blur-glass">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">Users</p>
        <h1 className="mt-3 text-title font-black text-ink">Team access and performance</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Resize columns, drag headers to reorder, sort, search, and paginate without external table libraries.
        </p>
      </div>

      <DataTable<DashboardUser>
        columns={columns}
        data={USERS_DATA}
        rowKey={(row) => row.id}
        loading={loading}
        title="Workspace members"
        description="Reusable table component with dynamic rows, columns, loading skeletons, empty states, sorting, search, pagination, resizing, and drag-and-drop."
        colors={{ accent: "secondary" }}
      />
    </div>
  );
}
