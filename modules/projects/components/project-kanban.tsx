"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MoreVertical, Plus, MessageSquare, 
  Paperclip, Tag, Clock 
} from "lucide-react";
import { PROJECT_TASKS } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";

interface ProjectKanbanProps {
  projectId: string;
}

const COLUMNS = [
  { id: "Todo", label: "Backlog" },
  { id: "In Progress", label: "In Flight" },
  { id: "Review", label: "Quality Check" },
  { id: "Completed", label: "Shipped" },
];

export default function ProjectKanban({ projectId }: ProjectKanbanProps) {
  const tasks = PROJECT_TASKS.filter(t => t.projectId === projectId);

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
      {COLUMNS.map((column) => (
        <div key={column.id} className="flex-none w-80 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[10px] uppercase tracking-[0.2em]">{column.label}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-black">
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>
            <button className="text-muted-foreground hover:bg-muted p-1 rounded-lg transition-all">
               <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-[500px] rounded-3xl bg-muted/20 p-3 space-y-4 border-2 border-dashed border-border/50">
             {tasks.filter(t => t.status === column.id).map((task) => (
               <KanbanCard key={task.id} task={task} />
             ))}
             <button className="w-full py-4 rounded-2xl border-2 border-dashed border-border/50 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all">
                Add New Task
             </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanCard({ task }: { task: any }) {
  const priorityColors = {
    "High": "bg-rose-500",
    "Medium": "bg-amber-500",
    "Low": "bg-emerald-500",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-card border border-border p-5 rounded-2xl shadow-sm group hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between mb-4">
         <div className={cn("h-1 w-8 rounded-full", priorityColors[task.priority as keyof typeof priorityColors])} />
         <button className="text-muted-foreground hover:bg-muted p-1 rounded-lg">
            <MoreVertical className="h-3 w-3" />
         </button>
      </div>
      
      <h4 className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{task.title}</h4>
      
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
         <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[8px] font-black">
               {task.assignee.firstName[0]}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
               <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span className="text-[10px] font-bold">2</span>
               </div>
               <div className="flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-[10px] font-bold">1</span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-1 text-[10px] font-black uppercase text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>5d</span>
         </div>
      </div>
    </motion.div>
  );
}
