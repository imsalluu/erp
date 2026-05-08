"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, Kanban, Calendar, 
  Users, Files, History, Settings,
  CheckCircle2, Clock, AlertTriangle, Play 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ProjectKanban from "@/modules/projects/components/project-kanban";
import ProjectTimeline from "@/modules/projects/components/project-timeline";

interface ProjectDetailsViewProps {
  project: any;
}

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "kanban", label: "Board", icon: Kanban },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "team", label: "Team", icon: Users },
  { id: "files", label: "Files", icon: Files },
  { id: "history", label: "Log", icon: History },
];

export default function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-card border border-border p-8 rounded-3xl shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
               {project.status}
             </span>
             <span className="text-muted-foreground text-xs font-bold">Due: {project.dueDate}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter">{project.name}</h1>
          <p className="text-muted-foreground font-medium max-w-2xl">{project.description}</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold shadow-sm hover:bg-muted transition-all">
             <Settings className="h-4 w-4" />
             Project Settings
           </button>
           <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
             <Play className="h-4 w-4" />
             Launch Sprint
           </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 bg-muted/20 p-2 rounded-2xl border border-border w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-card text-primary shadow-sm border border-border" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="min-h-[500px]"
        >
          {activeTab === "overview" && <OverviewTab project={project} />}
          {activeTab === "kanban" && <ProjectKanban projectId={project.id} />}
          {activeTab === "timeline" && <ProjectTimeline  />}
          {activeTab === "team" && <TeamTab team={project.team} />}
          {activeTab === "files" && <PlaceholderTab label="Files & Documents" icon={Files} />}
          {activeTab === "history" && <PlaceholderTab label="Activity History" icon={History} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function OverviewTab({ project }: { project: any }) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <StatMiniCard label="Tasks Done" value="24/36" icon={CheckCircle2} color="text-emerald-500" />
          <StatMiniCard label="Days Left" value="45" icon={Clock} color="text-blue-500" />
          <StatMiniCard label="Risk Level" value="Low" icon={AlertTriangle} color="text-amber-500" />
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
           <h3 className="text-xl font-bold mb-6">Recent Deliverables</h3>
           <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:bg-muted/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                       <Files className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">System Architecture v2.pdf</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">Uploaded by Mike · 2h ago</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground group-hover:text-primary p-2">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="space-y-8">
         <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Manager</h3>
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                 {project.manager[0]}
               </div>
               <div>
                  <p className="font-bold">{project.manager}</p>
                  <p className="text-xs text-muted-foreground font-medium">Head of Engineering</p>
               </div>
            </div>
         </div>

         <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Client Info</h3>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Stakeholder</p>
            <p className="font-bold text-lg">{project.client}</p>
            <button className="w-full mt-6 py-3 rounded-xl border border-border text-xs font-bold hover:bg-muted transition-all">
               Contact Client
            </button>
         </div>
      </div>
    </div>
  );
}

function TeamTab({ team }: { team: any[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {team.map((member, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all text-center group">
           <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all text-xl">
              {member.firstName[0]}
           </div>
           <h4 className="font-bold">{member.firstName} {member.lastName}</h4>
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{member.designation}</p>
           <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-4">
              <button className="text-xs font-bold text-primary hover:underline">View Load</button>
              <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Chat</button>
           </div>
        </div>
      ))}
    </div>
  );
}

function StatMiniCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any, color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2 text-muted-foreground">
        <Icon className={cn("h-4 w-4", color)} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xl font-black">{value}</p>
    </div>
  );
}

function PlaceholderTab({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <div className="flex flex-col items-center justify-center py-40 bg-muted/5 rounded-3xl border-2 border-dashed border-border text-muted-foreground">
      <Icon className="h-16 w-16 mb-4 opacity-20" />
      <p className="text-lg font-bold">{label} content will be here</p>
    </div>
  );
}
