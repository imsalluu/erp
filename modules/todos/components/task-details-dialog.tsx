"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  X, Send, Paperclip, Smile,
  MoreHorizontal, Flag, Calendar, Hash 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskDetailsDialogProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskDetailsDialog({ task, isOpen, onClose }: TaskDetailsDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-card w-full max-w-3xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh]"
      >
        {/* Left: Task Content */}
        <div className="flex-1 p-8 overflow-y-auto space-y-8 border-r border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Hash className="h-4 w-4 text-muted-foreground" />
               <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Task-1024</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-all">
               <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
             <h2 className="text-3xl font-black tracking-tight">{task.title}</h2>
             <p className="text-muted-foreground leading-relaxed">
                Implement a secure data migration pipeline from legacy SQL databases to the new cloud infrastructure. Ensure all PHI data is encrypted at rest and in transit.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
             <InfoItem label="Priority" value={task.priority} icon={Flag} />
             <InfoItem label="Due Date" value={task.dueDate} icon={Calendar} />
             <InfoItem label="Assignee" value={task.assignee.firstName} icon={Hash} />
             <InfoItem label="Status" value={task.status} icon={Hash} />
          </div>

          <div className="space-y-4 pt-10">
             <h3 className="font-bold text-lg flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-primary" />
                Attachments
             </h3>
             <div className="flex gap-4">
                <div className="h-24 w-32 rounded-2xl border-2 border-dashed border-border border-muted-foreground/20 flex items-center justify-center hover:border-primary/50 cursor-pointer transition-all">
                   <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
             </div>
          </div>
        </div>

        {/* Right: Comments & Feed */}
        <div className="w-full md:w-80 bg-muted/5 flex flex-col h-full">
           <div className="p-6 border-b border-border bg-card">
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Discussion</h3>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[8px]">M</div>
                      <span className="text-xs font-bold uppercase">Mike J.</span>
                      <span className="text-[9px] text-muted-foreground">2h ago</span>
                   </div>
                   <p className="text-xs bg-card border border-border p-3 rounded-2xl rounded-tl-none shadow-sm leading-relaxed">
                      Hey team, the migration script is 80% complete. Need eyes on the encryption module.
                   </p>
                </div>
              ))}
           </div>

           <div className="p-4 border-t border-border bg-card">
              <div className="relative">
                 <textarea 
                    placeholder="Write a comment..." 
                    className="w-full rounded-2xl border border-border bg-muted/20 px-4 py-3 text-xs outline-none focus:border-primary transition-all resize-none min-h-[80px]"
                 />
                 <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground"><Smile className="h-4 w-4" /></button>
                    <button className="p-1.5 bg-primary text-white rounded-lg shadow-lg shadow-primary/20"><Send className="h-4 w-4" /></button>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoItem({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="space-y-1">
       <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground block">{label}</span>
       <div className="flex items-center gap-2 font-bold text-sm">
          <Icon className="h-3.5 w-3.5 text-primary" />
          <span>{value}</span>
       </div>
    </div>
  );
}

function Plus(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}
