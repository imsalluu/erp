"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Target, MessagesSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectManagementSection() {
  return (
    <section className="py-24 bg-muted/10 relative overflow-hidden">
       {/* Background Blob */}
       <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          
          {/* Left Visual Mockup */}
          <div className="w-full lg:w-1/2 relative space-y-6">
             <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border rounded-3xl p-6 shadow-2xl relative z-10"
             >
                <div className="flex justify-between items-center mb-6">
                   <h4 className="font-bold flex items-center gap-2">
                     <LayoutGrid className="h-5 w-5 text-primary" /> Kanban Board
                   </h4>
                   <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                       <div key={i} className="h-8 w-8 rounded-full bg-muted border-2 border-card z-10" />
                     ))}
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Column 1 */}
                  <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold uppercase">To Do</span>
                       <span className="h-5 w-5 rounded-full bg-background flex items-center justify-center text-[10px] font-bold shadow-sm">2</span>
                     </div>
                     <div className="bg-background rounded-xl p-3 shadow-sm border border-border space-y-2 cursor-pointer hover:border-primary/50 transition-colors">
                        <p className="text-xs font-bold">Design Landing Page</p>
                        <div className="h-1.5 w-1/2 rounded-full bg-rose-500/20" />
                     </div>
                     <div className="bg-background rounded-xl p-3 shadow-sm border border-border space-y-2 cursor-pointer hover:border-primary/50 transition-colors">
                        <p className="text-xs font-bold">Client Briefing</p>
                        <div className="h-1.5 w-full rounded-full bg-amber-500/20" />
                     </div>
                  </div>
                  
                  {/* Column 2 */}
                  <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-primary uppercase">In Progress</span>
                       <span className="h-5 w-5 rounded-full bg-background flex items-center justify-center text-[10px] font-bold shadow-sm text-primary">1</span>
                     </div>
                     <div className="bg-card rounded-xl p-3 shadow-md border border-primary/20 ring-1 ring-primary/10 space-y-2 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                        <p className="text-xs font-bold text-primary">API Integration</p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-3/4 rounded-full bg-primary/20" />
                        </div>
                     </div>
                  </div>

                  {/* Column 3 */}
                  <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                     <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-emerald-500 uppercase">Done</span>
                       <span className="h-5 w-5 rounded-full bg-background flex items-center justify-center text-[10px] font-bold shadow-sm text-emerald-500">1</span>
                     </div>
                     <div className="bg-background rounded-xl p-3 shadow-sm border border-emerald-500/20 space-y-2 opacity-60">
                        <p className="text-xs font-bold line-through">DB Schema Outline</p>
                     </div>
                  </div>
                </div>
             </motion.div>
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold tracking-widest uppercase">
              Project Management
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Ship software faster, together.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect your tasks directly to employee goals and compensation. Powerful visualizations keep everyone aligned.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <Target className="h-8 w-8 text-primary shrink-0" />
                <div>
                   <h5 className="font-bold">Sprint Planning</h5>
                   <p className="text-sm text-muted-foreground">Organize complex workflows with milestones and dependencies.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <MessagesSquare className="h-8 w-8 text-amber-500 shrink-0" />
                <div>
                   <h5 className="font-bold">Team Collaboration</h5>
                   <p className="text-sm text-muted-foreground">Real-time comments, file sharing, and integrated chat.</p>
                </div>
              </div>
            </div>

            <Button size="lg" asChild className="rounded-xl px-8 h-14 font-bold shadow-lg shadow-primary/20 w-full sm:w-auto mt-4">
              <Link href="/login">View Project Features</Link>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
