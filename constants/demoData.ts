import type { DashboardUser } from "@/types/user";

export const KPI_DATA = [
  { label: "Qualified leads", value: "8,482", change: "+18.4%", trend: [14, 20, 18, 24, 29, 33, 41] },
  { label: "Revenue pipeline", value: "$128.6K", change: "+11.2%", trend: [30, 32, 31, 38, 42, 47, 52] },
  { label: "Conversion rate", value: "42.8%", change: "+6.7%", trend: [12, 18, 22, 19, 28, 31, 35] },
  { label: "Response SLA", value: "1.6h", change: "-22.0%", trend: [45, 43, 38, 35, 29, 24, 19] }
] as const;

export const USERS_DATA: DashboardUser[] = [
  { id: 1, name: "Anderson M", email: "anderson.m@omega.com", role: "Financial Director", status: "Active", team: "Revenue", createdAt: "2026-01-09", revenue: 24386 },
  { id: 2, name: "Ava Sterling", email: "ava.sterling@omega.com", role: "Sales Lead", status: "Active", team: "Growth", createdAt: "2026-01-14", revenue: 18420 },
  { id: 3, name: "Noah Bennett", email: "noah.bennett@omega.com", role: "Account Executive", status: "Invited", team: "Enterprise", createdAt: "2026-02-01", revenue: 12780 },
  { id: 4, name: "Mia Laurent", email: "mia.laurent@omega.com", role: "CRM Strategist", status: "Paused", team: "Lifecycle", createdAt: "2025-12-18", revenue: 9860 },
  { id: 5, name: "Kai Morgan", email: "kai.morgan@omega.com", role: "Product Manager", status: "Active", team: "Platform", createdAt: "2026-02-05", revenue: 21590 },
  { id: 6, name: "Sophia Chen", email: "sophia.chen@omega.com", role: "Customer Success", status: "Active", team: "Support", createdAt: "2026-01-21", revenue: 14670 },
  { id: 7, name: "Leo Carter", email: "leo.carter@omega.com", role: "Data Analyst", status: "Invited", team: "Insights", createdAt: "2026-02-08", revenue: 7200 },
  { id: 8, name: "Isla Reed", email: "isla.reed@omega.com", role: "Marketing Ops", status: "Active", team: "Growth", createdAt: "2025-11-27", revenue: 17340 },
  { id: 9, name: "Omar Hayes", email: "omar.hayes@omega.com", role: "Solutions Engineer", status: "Paused", team: "Enterprise", createdAt: "2026-01-30", revenue: 11920 },
  { id: 10, name: "Nina Patel", email: "nina.patel@omega.com", role: "Revenue Ops", status: "Active", team: "Revenue", createdAt: "2025-10-11", revenue: 28610 }
];
