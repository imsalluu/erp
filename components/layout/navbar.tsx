"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Search, Bell, User, Settings, LogOut, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur transition-all">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, employees, or tasks..."
            className="w-full rounded-full border border-border bg-muted/50 py-1.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
            className="relative rounded-full p-2 hover:bg-accent transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
          </button>
          
          {isNotificationsOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 p-2"
            >
               <div className="p-3 border-b border-border/50 flex justify-between items-center">
                  <span className="font-bold">Notifications</span>
                  <span className="text-xs text-primary font-bold cursor-pointer">Mark all read</span>
               </div>
               <div className="max-h-[300px] overflow-y-auto w-full">
                  <div className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer border-b border-border/50">
                     <p className="text-sm font-semibold">New project assigned</p>
                     <p className="text-xs text-muted-foreground mt-1">You were added to "Q4 Marketing Redesign"</p>
                     <p className="text-[10px] text-muted-foreground/60 mt-2 font-bold uppercase tracking-widest">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer border-b border-border/50">
                     <p className="text-sm font-semibold">Leave Request Approved</p>
                     <p className="text-xs text-muted-foreground mt-1">Your PTO for Oct 12th was approved.</p>
                     <p className="text-[10px] text-muted-foreground/60 mt-2 font-bold uppercase tracking-widest">Yesterday</p>
                  </div>
                  <div className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                     <p className="text-sm font-semibold">System Update</p>
                     <p className="text-xs text-muted-foreground mt-1">The ERP platform was successfully updated.</p>
                     <p className="text-[10px] text-muted-foreground/60 mt-2 font-bold uppercase tracking-widest">2 days ago</p>
                  </div>
               </div>
               <div className="p-2 text-center border-t border-border/50 mt-1">
                 <span className="text-xs font-bold text-primary cursor-pointer hover:underline">View All Notifications</span>
               </div>
            </motion.div>
          )}
        </div>

        <div className="h-8 w-px bg-border mx-2 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); }}
            className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role.replace("_", " ").toLowerCase()}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>

          {isProfileOpen && (
             <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 p-1"
             >
                <div className="p-3 border-b border-border/50 lg:hidden">
                   <p className="text-sm font-semibold truncate">{user.name}</p>
                   <p className="text-xs text-muted-foreground capitalize truncate">{user.role}</p>
                </div>
                <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg text-sm text-foreground transition-colors m-1" onClick={() => setIsProfileOpen(false)}>
                   <User className="h-4 w-4 text-muted-foreground" /> View Profile
                </Link>
                <Link href="/workspace/settings" className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg text-sm text-foreground transition-colors m-1" onClick={() => setIsProfileOpen(false)}>
                   <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                </Link>
                <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg text-sm text-foreground transition-colors m-1" onClick={() => setIsProfileOpen(false)}>
                   <Shield className="h-4 w-4 text-muted-foreground" /> Change Password
                </Link>
                <div className="h-px bg-border/50 my-1 mx-2" />
                <button 
                  onClick={() => { setIsProfileOpen(false); logout(); router.push('/login'); }}
                  className="flex items-center gap-2 p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-sm text-muted-foreground transition-colors m-1 w-full text-left"
                >
                   <LogOut className="h-4 w-4" /> Logout
                </button>
             </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
