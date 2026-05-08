"use client";

import React, { useState } from "react";
import { useModal } from "@/components/shared/modal-provider";
import { useToast } from "@/components/shared/toast-system";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  Send, 
  ChevronRight,
  Info,
  Zap,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const LEAVE_TYPES = [
  { id: "casual", label: "Casual Leave", color: "bg-primary" },
  { id: "sick", label: "Sick Leave", color: "bg-rose-500" },
  { id: "annual", label: "Annual Leave", color: "bg-emerald-500" },
  { id: "unpaid", label: "Unpaid Leave", color: "bg-slate-500" },
];

export default function LeaveApplicationModal() {
  const { closeModal } = useModal();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Leave application has been transmitted to your Supervisor for review.", "success");
    closeModal();
  };

  return (
    <div className="space-y-10">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-2">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2 shadow-inner">
           <CalendarIcon className="h-7 w-7" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter italic">Request Absence<span className="text-primary italic">.</span></h2>
        <p className="text-sm font-medium text-muted-foreground italic">Initialize an automated approval sequence for your planned leave.</p>
      </div>

      {/* Progress Timeline */}
      <div className="flex items-center gap-4 px-1">
         {[1, 2].map(i => (
           <React.Fragment key={i}>
              <div className={cn(
                "h-2 flex-1 rounded-full transition-all duration-500",
                step >= i ? "bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "bg-muted"
              )} />
              {i < 2 && <ChevronRight className="h-3 w-3 text-muted-foreground opacity-30" />}
           </React.Fragment>
         ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
             <div className="grid grid-cols-2 gap-4">
                {LEAVE_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({...formData, type: type.id})}
                    className={cn(
                      "group p-6 rounded-3xl border transition-all text-left relative overflow-hidden",
                      formData.type === type.id 
                        ? "bg-card border-primary ring-4 ring-primary/5 shadow-xl" 
                        : "bg-muted/10 border-border/50 hover:bg-muted/30"
                    )}
                  >
                    <div className={cn("h-2 w-8 rounded-full mb-4", type.color)} />
                    <p className="text-xs font-black uppercase tracking-widest">{type.label}</p>
                    {formData.type === type.id && <CheckCircle2 className="absolute top-4 right-4 h-4 w-4 text-primary" />}
                  </button>
                ))}
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">V-Start Date</label>
                   <input required type="date" className="w-full bg-muted/20 border border-border/50 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">V-End Date</label>
                   <input required type="date" className="w-full bg-muted/20 border border-border/50 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                </div>
             </div>

             <button type="button" onClick={() => setStep(2)} className="w-full py-5 rounded-2xl bg-card border border-border/50 text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all shadow-sm">
                Proceed to justification
             </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Context & Justification</label>
                <textarea required placeholder="Briefly describe the operational context for this absence..." className="w-full bg-muted/20 border border-border/50 rounded-3xl px-6 py-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none transition-all min-h-[160px] resize-none" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
             </div>

             <div className="rounded-[32px] bg-indigo-500/5 border border-indigo-500/10 p-6 flex gap-4 items-start">
                <ShieldCheck className="h-5 w-5 text-indigo-500 shrink-0 mt-1" />
                <p className="text-[11px] font-medium leading-relaxed italic text-indigo-900/70 dark:text-indigo-200/50">
                   This request will be processed through the multi-tier approval matrix. You will receive a notification once the HR node finalizes the status.
                </p>
             </div>

             <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl border border-border/50 text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">Back</button>
                <button type="submit" className="flex-[2] py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                   Transmit Protocol
                   <Send className="h-4 w-4" />
                </button>
             </div>
          </div>
        ) }
      </form>
    </div>
  );
}
