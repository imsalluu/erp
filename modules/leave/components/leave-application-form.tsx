"use client";

import { useState } from "react";
import { 
  Calendar, FileText, Send, ChevronRight, 
  UserCheck, Building2, ShieldCheck, Clock 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LeaveApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
          <Send className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-600">Application Sent!</h3>
        <p className="mt-2 text-muted-foreground max-w-sm mx-auto font-medium">Your leave request has been submitted and is currently awaiting Supervisor approval.</p>
        <div className="mt-10 max-w-xs mx-auto">
           <ApprovalTimeline status="PENDING_SUPERVISOR" />
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-border bg-card p-8 shadow-xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Leave Type</label>
          <select className="w-full rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Emergency Leave</option>
          </select>
        </div>
        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duration</label>
           <div className="flex items-center gap-2">
              <input type="date" className="flex-1 rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm font-bold outline-none focus:border-primary transition-all" />
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <input type="date" className="flex-1 rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm font-bold outline-none focus:border-primary transition-all" />
           </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reason for Leave</label>
        <textarea 
          placeholder="Please provide a brief reason..."
          className="w-full h-32 rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
        />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
         <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
               <Clock className="h-3.5 w-3.5" />
               Total: 3 Days
            </div>
            <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full">
               <FileCheck className="h-3.5 w-3.5" />
               Attachments Optional
            </div>
         </div>
         <button className="flex items-center gap-2 rounded-xl bg-primary px-10 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
           Submit Application
           <Send className="h-4 w-4" />
         </button>
      </div>
    </form>
  );
}

export function ApprovalTimeline({ status }: { status: "PENDING_SUPERVISOR" | "PENDING_HR" | "APPROVED" }) {
  const steps = [
    { label: "Applied", icon: FileText, current: true, done: true },
    { label: "Supervisor", icon: UserCheck, current: status === "PENDING_SUPERVISOR", done: status !== "PENDING_SUPERVISOR" },
    { label: "HR Admin", icon: Building2, current: status === "PENDING_HR", done: status === "APPROVED" },
    { label: "Final Status", icon: ShieldCheck, current: false, done: status === "APPROVED" },
  ];

  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4 relative">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all z-10 bg-card",
            step.done ? "bg-emerald-500 border-emerald-500 text-white" : 
            step.current ? "border-primary text-primary shadow-lg shadow-primary/20 animate-pulse" : 
            "border-border text-muted-foreground"
          )}>
            <step.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 text-left">
            <p className={cn("text-xs font-black uppercase tracking-widest", step.current || step.done ? "text-foreground" : "text-muted-foreground")}>
               {step.label}
            </p>
            {step.current && <p className="text-[10px] font-medium text-primary">In Progress</p>}
            {step.done && <p className="text-[10px] font-medium text-emerald-500">Approved</p>}
          </div>
          {i < steps.length - 1 && (
             <div className={cn("absolute left-5 top-10 h-6 w-0.5 -z-0", steps[i+1].done ? "bg-emerald-500" : "bg-border")} />
          )}
        </div>
      ))}
    </div>
  );
}

function FileCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-check"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
  );
}
