"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, MoreVertical, MessageSquare, 
  Tag, Clock, AlertCircle, CheckCircle2 
} from "lucide-react";
import { PROJECT_TASKS } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

const TODO_COLUMNS = [
  { id: "Todo", label: "To Do", color: "bg-blue-500" },
  { id: "In Progress", label: "Working", color: "bg-indigo-500" },
  { id: "Review", label: "Review", color: "bg-amber-500" },
  { id: "Completed", label: "Done", color: "bg-emerald-500" },
];

export default function TodoKanban() {
  const [activeTab, setActiveTab] = useState<"personal" | "team">("personal");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2 bg-muted/20 p-1.5 rounded-2xl border border-border">
            <button 
              onClick={() => setActiveTab("personal")}
              className={cn("px-6 py-2 rounded-xl text-xs font-bold transition-all", activeTab === "personal" ? "bg-card text-primary shadow-sm border border-border" : "text-muted-foreground hover:text-foreground")}
            >
               My Tasks
            </button>
            <button 
              onClick={() => setActiveTab("team")}
              className={cn("px-6 py-2 rounded-xl text-xs font-bold transition-all", activeTab === "team" ? "bg-card text-primary shadow-sm border border-border" : "text-muted-foreground hover:text-foreground")}
            >
               Team Stream
            </button>
         </div>
         <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus className="h-4 w-4" />
            New Task
         </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
        {TODO_COLUMNS.map((column) => (
          <div key={column.id} className="flex-none w-80 space-y-4">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", column.color)} />
                  <span className="font-extrabold text-[10px] uppercase tracking-widest">{column.label}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-black">
                     {PROJECT_TASKS.filter(t => t.status === column.id).length}
                  </span>
               </div>
               <button className="text-muted-foreground hover:bg-muted p-1 rounded-lg">
                  <MoreVertical className="h-4 w-4" />
               </button>
            </div>

            <div className="min-h-[600px] rounded-3xl bg-muted/10 p-3 space-y-4 border border-dashed border-border/50">
               {PROJECT_TASKS.filter(t => t.status === column.id).map((task) => (
                 <TodoCard key={task.id} task={task} />
               ))}
               <button className="w-full py-4 rounded-2xl border-2 border-dashed border-border/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all">
                  Next Step
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodoCard({ task }: { task: any }) {
  const priorityColors = {
    "High": "text-rose-500 bg-rose-500/10",
    "Medium": "text-amber-500 bg-amber-500/10",
    "Low": "text-emerald-500 bg-emerald-500/10",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:border-primary/40 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
         <span className={cn("px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter", priorityColors[task.priority as keyof typeof priorityColors])}>
            {task.priority}
         </span>
         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-muted-foreground hover:text-primary transition-colors"><CheckCircle2 className="h-3.5 w-3.5" /></button>
            <button className="text-muted-foreground hover:text-primary transition-colors"><MoreVertical className="h-3.5 w-3.5" /></button>
         </div>
      </div>

      <h4 className="font-bold text-sm tracking-tight leading-tight group-hover:text-primary transition-colors">{task.title}</h4>
      
      <div className="mt-6 flex items-center justify-between">
         <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{task.dueDate}</span>
         </div>
         <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
               <MessageSquare className="h-3 w-3" />
               <span className="text-[10px] font-bold">4</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[8px] border-2 border-card">
               {task.assignee.firstName[0]}
            </div>
         </div>
      </div>
    </motion.div>
  );
}
