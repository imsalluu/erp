"use client";

import { StatCard, SectionHeader } from "../../dashboard/components/dashboard-ui";
import { Users2, UserPlus, FileCheck2, Landmark, TrendingUp, Calendar, Zap } from "lucide-react";
import RecruitmentPipeline from "../components/recruitment-pipeline";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function HRManagementView() {
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [allInterviewsOpen, setAllInterviewsOpen] = useState(false);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeader 
          title="HR Excellence Center" 
          description="Manage talent, payroll, and organizational health from a single deck."
          badge="Admin Center"
        />
        <div className="flex items-center gap-3">
           <QuickAction icon={UserPlus} label="New Candidate" onClick={() => {
              const addBtn = document.querySelector('button[aria-label="Add Candidate"], button:contains("Add Candidate")') as HTMLButtonElement | null;
              if (addBtn) addBtn.click(); // Hacky solution, but opens the pipeline modal if on same page. It's actually better to just have its own modal later but this is fine.
           }} />
           <QuickAction icon={Zap} label="Quick Onboard" primary onClick={() => setOnboardOpen(true)} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Hires" value="124" change="+12%" trend="up" icon={Users2} />
        <StatCard label="Active Openings" value="8" icon={FileCheck2} />
        <StatCard label="Avg. Time to Hire" value="22 Days" trend="up" icon={TrendingUp} />
        <StatCard label="Payroll Status" value="Processing" icon={Landmark} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
           <RecruitmentPipeline />
        </div>
        <div className="space-y-8">
           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Interview Schedule
              </h3>
              <div className="space-y-4">
                {[
                  { name: "James Wilson", time: "10:00 AM", type: "Technical" },
                  { name: "Anna White", time: "02:30 PM", type: "Culter Fit" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border group hover:border-primary/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase">{item.type}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-primary">{item.time}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setAllInterviewsOpen(true)}
                className="w-full mt-6 py-3 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-all"
              >
                View All Interviews
              </button>
           </div>

           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Onboarding Progress</h3>
              <div className="space-y-4">
                <OnboardItem name="Kevin Lee" progress={80} />
                <OnboardItem name="Elena Rodriguez" progress={45} />
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
         {onboardOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
               <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="bg-card border border-border p-6 rounded-3xl shadow-2xl w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg">Quick Onboard Employee</h3>
                     <button onClick={() => setOnboardOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); setOnboardOpen(false); }} className="space-y-4">
                     <p className="text-sm text-muted-foreground mb-4">Fast-track an employee directly into standard payroll operations without pipeline tracking.</p>
                     <input required placeholder="Employee Name" className="w-full rounded-xl border border-border bg-background p-3 text-sm" />
                     <input required placeholder="Email Address" type="email" className="w-full rounded-xl border border-border bg-background p-3 text-sm" />
                     <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4">Confirm Onboarding</button>
                  </form>
               </motion.div>
            </div>
         )}
         {allInterviewsOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
               <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="bg-card border border-border p-6 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg">All Requested Interviews</h3>
                     <button onClick={() => setAllInterviewsOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between p-4 bg-muted/30 rounded-xl border border-border">
                        <div>
                           <p className="font-bold text-sm">James Wilson <span className="text-muted-foreground font-medium ml-2">Sr. Product Designer</span></p>
                           <p className="text-xs text-primary font-bold mt-1 uppercase tracking-widest">Technical &bull; Oct 10</p>
                        </div>
                        <span className="text-xs font-black self-center">10:00 AM</span>
                     </div>
                     <div className="flex justify-between p-4 bg-muted/30 rounded-xl border border-border">
                        <div>
                           <p className="font-bold text-sm">Anna White <span className="text-muted-foreground font-medium ml-2">Director of HR</span></p>
                           <p className="text-xs text-emerald-500 font-bold mt-1 uppercase tracking-widest">Culture Fit &bull; Oct 10</p>
                        </div>
                        <span className="text-xs font-black self-center">02:30 PM</span>
                     </div>
                     <div className="flex justify-between p-4 bg-muted/30 rounded-xl border border-border">
                        <div>
                           <p className="font-bold text-sm">Kevin Lee <span className="text-muted-foreground font-medium ml-2">DevOps Engineer</span></p>
                           <p className="text-xs text-blue-500 font-bold mt-1 uppercase tracking-widest">Final Round &bull; Oct 12</p>
                        </div>
                        <span className="text-xs font-black self-center">09:00 AM</span>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

function QuickAction({ icon: Icon, label, primary, onClick }: { icon: any; label: string; primary?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={cn(
      "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm",
      primary ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90" : "bg-card border border-border hover:bg-muted"
    )}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function OnboardItem({ name, progress }: { name: string; progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span>{name}</span>
        <span className="text-primary">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
