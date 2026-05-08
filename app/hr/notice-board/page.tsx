"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { Bell, Megaphone, Info, AlertTriangle, Plus, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NoticeBoardPage() {
  const notices = [
    { title: "Quarterly Town Hall Meeting", type: "info", date: "May 15, 2026", priority: "high" },
    { title: "New Health Insurance Policy Updates", type: "policy", date: "May 12, 2026", priority: "medium" },
    { title: "Office Renovation on 2nd Floor", type: "announcement", date: "May 10, 2026", priority: "low" },
    { title: "Security Protocols Reminder", type: "alert", date: "May 08, 2026", priority: "high" },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Notice Board & Announcements" 
            description="Stay updated with company-wide news, policies, and events."
          />
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus className="h-5 w-5" />
            Post New Notice
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
             {notices.map((notice, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
               >
                 <div className="flex items-start gap-5">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                      notice.type === "info" ? "bg-blue-500/10 text-blue-500" :
                      notice.type === "alert" ? "bg-rose-500/10 text-rose-500" :
                      notice.type === "policy" ? "bg-emerald-500/10 text-emerald-500" :
                      "bg-amber-500/10 text-amber-500"
                    )}>
                       {notice.type === "alert" ? <AlertTriangle className="h-6 w-6" /> : 
                        notice.type === "policy" ? <Info className="h-6 w-6" /> :
                        <Megaphone className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-3">
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{notice.title}</h4>
                          {notice.priority === "high" && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Urgent</span>
                          )}
                       </div>
                       <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                         Dear Team, we are pleased to announce the upcoming quarterly town hall meeting. We will discuss our growth roadmap and new initiatives...
                       </p>
                       <div className="mt-4 flex items-center gap-4 text-xs font-bold text-muted-foreground/60">
                          <span>{notice.date}</span>
                          <div className="h-1 w-1 rounded-full bg-border" />
                          <span>Posted by HR Admin</span>
                       </div>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>

          <div className="w-full md:w-80 space-y-6">
             <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                   <Bell className="h-5 w-5 text-primary" />
                   Recent Activity
                </h3>
                <div className="space-y-6 border-l-2 border-border ml-2 pl-6">
                   {[
                     { text: "John Doe liked 'Quarterly Update'", time: "2h ago" },
                     { text: "New policy published", time: "5h ago" },
                     { text: "Town Hall event created", time: "1d ago" },
                   ].map((act, i) => (
                     <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary border-4 border-card" />
                        <p className="text-xs font-bold">{act.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{act.time}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
