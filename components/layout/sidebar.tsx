"use client";

import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  PlaneTakeoff,
  LineChart,
  FolderKanban,
  CheckSquare,
  Clock,
  ShieldCheck,
  CreditCard,
  Building2,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Role } from "@/types";
import React from "react";

interface MenuItem {
  title: string;
  icon: any;
  href: string;
  roles: Role[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "HR Management",
    icon: ShieldCheck,
    href: "/hr",
    roles: ["BUSINESS_OWNER", "HR"],
  },
  {
    title: "Employee Management",
    icon: Users,
    href: "/workspace/employees",
    roles: ["BUSINESS_OWNER", "HR"],
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    href: "/workspace/attendance",
    roles: ["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Leave Management",
    icon: PlaneTakeoff,
    href: "/workspace/leaves",
    roles: ["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "KPI Management",
    icon: LineChart,
    href: "/workspace/kpi",
    roles: ["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/workspace/projects",
    roles: ["BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Tasks / Todo",
    icon: CheckSquare,
    href: "/workspace/tasks",
    roles: ["BUSINESS_OWNER", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Shift Management",
    icon: Clock,
    href: "/shifts",
    roles: ["BUSINESS_OWNER", "HR", "SUPERVISOR"],
  },
  {
    title: "Subscription",
    icon: CreditCard,
    href: "/platform/subscription",
    roles: ["SYSTEM_ADMIN"],
  },
  {
    title: "Tenants",
    icon: Building2,
    href: "/platform/tenants",
    roles: ["SYSTEM_ADMIN"],
  },
  {
    title: "Audit Logs",
    icon: FileText,
    href: "/platform/audit-logs",
    roles: ["SYSTEM_ADMIN"],
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/workspace/reports",
    roles: ["BUSINESS_OWNER", "HR", "PROJECT_MANAGER"],
  },
  {
    title: "Demo Leads",
    icon: Users,
    href: "/platform/demo-requests",
    roles: ["SYSTEM_ADMIN"],
  },
  {
    title: "Platform Settings",
    icon: Settings,
    href: "/platform/settings",
    roles: ["SYSTEM_ADMIN"],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/workspace/settings",
    roles: ["BUSINESS_OWNER"],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const filteredMenu = MENU_ITEMS.filter((item) => item.roles.includes(user.role));

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className={cn(
        "relative flex h-screen flex-col border-r border-border bg-card text-card-foreground transition-all duration-300 ease-in-out z-40",
        "fixed md:sticky top-0 left-0"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
              E
            </div>
            <span>ERP+</span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="mx-auto h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
            E
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground relative",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "group-hover:text-foreground")} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {item.title}
                </motion.span>
              )}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t border-border p-4 space-y-4">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
          {!isCollapsed && <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all",
            isCollapsed && "justify-center"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!isCollapsed && <span>Collapse</span>}
        </button>

        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
