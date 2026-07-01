import { Gauge, Settings, Users, LayoutDashboard, UserRoundCog } from "lucide-react";
import type { NavigationItem } from "@/types/navigation";

export const PRIVATE_NAVIGATION: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Gauge,
    children: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users
      }
    ]
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    children: [
      {
        title: "Profile",
        href: "/dashboard/settings",
        icon: UserRoundCog
      }
    ]
  }
];
