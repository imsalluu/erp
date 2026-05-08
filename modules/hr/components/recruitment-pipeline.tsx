"use client";

import { motion } from "framer-motion";
import { MoreVertical, Star, Calendar, MessageSquare, Plus, Filter } from "lucide-react";
import { RECRUITMENT_STAGES, CANDIDATES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

export default function RecruitmentPipeline() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recruitment Pipeline</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and track candidates through hiring stages.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus className="h-4 w-4" />
            Add Candidate
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {RECRUITMENT_STAGES.map((stage) => (
          <div key={stage.id} className="flex-none w-80 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm uppercase tracking-widest">{stage.name}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                  {CANDIDATES.filter(c => c.stage === stage.name).length || 0}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-[500px] rounded-2xl bg-muted/20 p-3 space-y-4 border border-dashed border-border">
              {CANDIDATES.filter(candidate => candidate.stage === stage.name).map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
              <button className="w-full py-3 rounded-xl border-2 border-dashed border-border/50 text-xs font-bold text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                <Plus className="h-3.5 w-3.5" />
                Add to {stage.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CandidateCard({ candidate }: { candidate: any }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="rounded-xl border border-border bg-card p-4 shadow-sm group hover:border-primary/40 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
          {candidate.name[0]}
        </div>
        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-lg">
          <Star className="h-3 w-3 fill-amber-500" />
          <span className="text-[10px] font-black">{candidate.rating}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{candidate.name}</h4>
        <p className="text-[11px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">{candidate.role}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex -space-x-1.5">
          {[1,2].map(i => (
             <div key={i} className="h-5 w-5 rounded-full border border-card bg-muted" />
          ))}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span className="text-[10px] font-bold">2</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="text-[10px] font-bold">Today</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
