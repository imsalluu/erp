"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { 
  Bell, Search, User, 
  Menu, X, Command, 
  Settings, LogOut, LayoutGrid,
  Plus, Calendar, Activity,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const { user } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8fafc]/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-border/50 transition-colors duration-500">
      <div className="flex h-20 items-center justify-between px-6 gap-6">
        
        {/* Left Section: Context & Global Search */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <button 
            onClick={onMenuClick}
            className="p-2.5 rounded-xl bg-card border border-border/50 shadow-sm hover:bg-muted transition-all md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative w-full max-w-xl group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search talent, initiatives, or artifacts [⌘K]"
              className="w-full rounded-2xl border border-border/50 bg-card/50 py-2.5 pl-12 pr-4 text-sm font-medium outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all italic"
            />
          </div>
        </div>

        {/* Right Section: Core Actions & Node Status */}
        <div className="flex items-center gap-4">
          
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <QuickAction icon={Zap} label="Quick Run" />
            <QuickAction icon={Globe} label="Portal" />
          </div>

          <div className="h-8 w-px bg-border/50 mx-2 hidden sm:block" />

          <button className="relative p-2.5 rounded-xl bg-card border border-border/50 shadow-sm hover:bg-muted transition-all group">
            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-card animate-pulse" />
          </button>

          <div className="flex items-center gap-3 ml-2 pl-2">
            <div className="flex flex-col text-right hidden lg:flex">
              <span className="text-sm font-black tracking-tight leading-none italic uppercase">{user.name}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">
                {user.role.replace("_", " ")}
              </span>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 p-[2px] shadow-lg shadow-primary/20 cursor-pointer hover:rotate-3 transition-transform group">
               <div className="h-full w-full rounded-[14px] bg-card flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-black text-primary text-sm italic">{user.name[0]}</span>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function QuickAction({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
       <Icon className="h-4 w-4" />
       <span className="hidden xl:inline">{label}</span>
    </button>
  );
}
