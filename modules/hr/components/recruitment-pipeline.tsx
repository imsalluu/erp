"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Star, Calendar, MessageSquare, Plus, Filter, X } from "lucide-react";
import { RECRUITMENT_STAGES, CANDIDATES as INITIAL_CANDIDATES } from "@/mock-data/detailed-mock-data";

export default function RecruitmentPipeline() {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addCandidateOpen, setAddCandidateOpen] = useState(false);
  
  // Drag and Drop State
  const [draggedId, setDraggedId] = useState<string | null>(null);
  
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    // slightly delay hiding the element so it clones for drag correctly
    setTimeout(() => {
       const el = document.getElementById(`candidate-${id}`);
       if (el) el.style.opacity = "0.5";
    }, 0);
  };
  
  const handleDragEnd = (e: React.DragEvent, id: string) => {
    setDraggedId(null);
    const el = document.getElementById(`candidate-${id}`);
    if (el) el.style.opacity = "1";
  };
  
  const handleDragOver = (e: React.DragEvent) => {
     e.preventDefault();
     e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, stageName: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id || id === "") return;
    
    setCandidates((prev) => 
      prev.map((c) => c.id === id ? { ...c, stage: stageName } : c)
    );
    setDraggedId(null);
  };

  const handleAddCandidate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCand = {
       id: `c${Date.now()}`,
       name: formData.get("name") as string,
       role: formData.get("role") as string,
       stage: formData.get("stage") as string || "SOURCED",
       rating: 0,
    };
    setCandidates([newCand, ...candidates]);
    setAddCandidateOpen(false);
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recruitment Pipeline</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and track candidates through hiring stages.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-muted transition-all"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button 
            onClick={() => setAddCandidateOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Candidate
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {RECRUITMENT_STAGES.map((stage) => {
           const stageCandidates = candidates.filter(c => c.stage === stage.name);
           return (
             <div 
               key={stage.id} 
               className="flex-none w-80 space-y-4"
               onDragOver={handleDragOver}
               onDrop={(e) => handleDrop(e, stage.name)}
             >
               <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-sm uppercase tracking-widest">{stage.name}</span>
                   <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                     {stageCandidates.length}
                   </span>
                 </div>
                 <ColumnMenu />
               </div>

               <div className="min-h-[500px] rounded-2xl bg-muted/20 p-3 space-y-4 border border-dashed border-border transition-colors hover:bg-muted/40">
                 {stageCandidates.map((candidate) => (
                   <CandidateCard 
                     key={candidate.id} 
                     candidate={candidate} 
                     handleDragStart={handleDragStart}
                     handleDragEnd={handleDragEnd}
                   />
                 ))}
                 <button 
                   onClick={() => setAddCandidateOpen(true)}
                   className="w-full py-3 rounded-xl border-2 border-dashed border-border/50 text-xs font-bold text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                 >
                   <Plus className="h-3.5 w-3.5" />
                   Add to {stage.name}
                 </button>
               </div>
             </div>
           );
        })}
      </div>

      {/* Simple Modals overlaid */}
      <AnimatePresence>
         {filterOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
               <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="bg-card border border-border p-6 rounded-3xl shadow-2xl w-full max-w-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg">Filter Candidates</h3>
                     <button onClick={() => setFilterOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                     <select className="w-full rounded-xl border border-border bg-background p-3 text-sm">
                        <option>All Roles</option>
                        <option>Frontend Engineer</option>
                        <option>Backend Engineer</option>
                     </select>
                     <select className="w-full rounded-xl border border-border bg-background p-3 text-sm">
                        <option>Any Rating</option>
                        <option>4+ Stars</option>
                        <option>3+ Stars</option>
                     </select>
                     <button onClick={() => setFilterOpen(false)} className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4">Apply Filters</button>
                  </div>
               </motion.div>
            </div>
         )}

         {addCandidateOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
               <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="bg-card border border-border p-6 rounded-3xl shadow-2xl w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg">Add New Candidate</h3>
                     <button onClick={() => setAddCandidateOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
                  </div>
                  <form onSubmit={handleAddCandidate} className="space-y-4">
                     <input name="name" required placeholder="Candidate Full Name" className="w-full rounded-xl border border-border bg-background p-3 text-sm" />
                     <input name="role" required placeholder="Applied Role (e.g. Designer)" className="w-full rounded-xl border border-border bg-background p-3 text-sm" />
                     <select name="stage" className="w-full rounded-xl border border-border bg-background p-3 text-sm">
                        {RECRUITMENT_STAGES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                     </select>
                     <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-4">Create Profile</button>
                  </form>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}

function ColumnMenu() {
   const [open, setOpen] = useState(false);
   return (
      <div className="relative">
         <button onClick={() => setOpen(!open)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">
           <MoreVertical className="h-4 w-4" />
         </button>
         {open && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-20">
               <button onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-muted">Edit Stage</button>
               <button onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-muted text-red-500">Clear Stage</button>
            </div>
         )}
      </div>
   );
}

function CandidateCard({ candidate, handleDragStart, handleDragEnd }: { candidate: any, handleDragStart: any, handleDragEnd: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      id={`candidate-${candidate.id}`}
      draggable
      onDragStart={(e) => handleDragStart(e, candidate.id)}
      onDragEnd={(e) => handleDragEnd(e, candidate.id)}
      className="rounded-xl border border-border bg-card p-4 shadow-sm group hover:border-primary/40 transition-all cursor-grab active:cursor-grabbing relative"
    >
      <div className="flex items-start justify-between relative">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
          {candidate.name[0]}
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-lg">
             <Star className="h-3 w-3 fill-amber-500" />
             <span className="text-[10px] font-black">{candidate.rating}</span>
           </div>
           
           <div className="relative">
             <button onClick={() => setMenuOpen(!menuOpen)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded-md transition-opacity">
                <MoreVertical className="h-3 w-3" />
             </button>
             {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-24 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-20 text-xs font-medium">
                   <button onClick={() => setMenuOpen(false)} className="w-full text-left px-3 py-1.5 hover:bg-muted">View</button>
                   <button onClick={() => setMenuOpen(false)} className="w-full text-left px-3 py-1.5 hover:bg-muted text-red-500">Reject</button>
                </div>
             )}
           </div>
        </div>
      </div>

      <div className="mt-4 pointer-events-none">
        <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{candidate.name}</h4>
        <p className="text-[11px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">{candidate.role}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 pointer-events-none">
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
    </div>
  );
}
