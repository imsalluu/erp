"use client";

import React from "react";
import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderKanban,
  CheckSquare,
  FileText,
  Settings,
  CreditCard,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Command,
  Zap,
  Activity,
  ShieldCheck,
  LineChart,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Role } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface MenuItem {
  title: string;
  icon: any;
  href: string;
  roles: Role[];
  badge?: string;
  isAction?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Intelligence",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Talent Ops",
    icon: Users,
    href: "/employees",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR"],
    badge: "TEAM"
  },
  {
    title: "Leaves",
    icon: Calendar,
    href: "/leaves",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Project Center",
    icon: FolderKanban,
    href: "/projects",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "Task Matrix",
    icon: CheckSquare,
    href: "/tasks",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
    badge: "12"
  },
  {
     title: "Timeline",
     icon: Clock,
     href: "/attendance",
     roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
  {
    title: "KPI Engine",
    icon: LineChart,
    href: "/kpi",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR"],
  },
  {
    title: "Insights",
    icon: FileText,
    href: "/reports",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER"],
  },
  {
    title: "SaaS Billing",
    icon: CreditCard,
    href: "/subscription",
    roles: ["BUSINESS_OWNER", "SYSTEM_ADMIN"],
  },
  {
    title: "Tenant Hub",
    icon: Building2,
    href: "/admin/tenants",
    roles: ["SYSTEM_ADMIN"],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    roles: ["SYSTEM_ADMIN", "BUSINESS_OWNER", "HR", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"],
  },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const filteredMenu = MENU_ITEMS.filter((item) => item.roles.includes(user.role));

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isOpen ? 280 : 80,
      }}
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-card/80 backdrop-blur-xl border-r border-border/50 flex flex-col transition-all duration-500 ease-in-out",
        "shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)]"
      )}
    >
      {/* Brand Section */}
      <div className="h-20 flex items-center px-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-white ring-2 ring-primary/20">
            <Command className="h-6 w-6" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-black text-lg tracking-tighter leading-none italic">
                  E-CORP<span className="text-primary italic">.</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mt-1">
                  Enterprise
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-1.5 pt-2">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-white" : "group-hover:text-primary"
              )} />
              
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="truncate flex-1 text-left italic"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {item.badge && isOpen && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-black",
                  isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                )}>
                  {item.badge}
                </span>
              )}

              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border/50 bg-muted/5 space-y-2">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted transition-all"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}
          {isOpen && <span className="italic">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted transition-all",
            !isOpen && "justify-center"
          )}
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          {isOpen && <span className="italic">Minimize System</span>}
        </button>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="italic uppercase tracking-widest text-[10px] font-black">Terminate Session</span>}
        </button>
      </div>
    </motion.aside>
  );
}
