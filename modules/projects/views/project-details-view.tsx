"use client";

import React, { useState, useRef } from "react";
import { 
  LayoutDashboard, Kanban, Calendar, 
  Users, Files, History, Settings,
  CheckCircle2, Clock, AlertTriangle, Play,
  Plus, X, UploadCloud, FileIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ProjectKanban from "@/modules/projects/components/project-kanban";
import ProjectTimeline from "@/modules/projects/components/project-timeline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [projectState, setProjectState] = useState(project);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [settingsForm, setSettingsForm] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    dueDate: project.dueDate
  });

  const handleSaveSettings = () => {
    setProjectState((prev: any) => ({ ...prev, ...settingsForm }));
    setIsSettingsOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-card border border-border p-8 rounded-3xl shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
               {projectState.status}
             </span>
             <span className="text-muted-foreground text-xs font-bold">Due: {projectState.dueDate}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter">{projectState.name}</h1>
          <p className="text-muted-foreground font-medium max-w-2xl">{projectState.description}</p>
        </div>
        <div className="flex items-center gap-3">
           <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
             <DialogTrigger asChild>
               <button className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold shadow-sm hover:bg-muted transition-all">
                 <Settings className="h-4 w-4" />
                 Project Settings
               </button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black">Project Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                   <div className="space-y-2">
                     <Label>Project Name</Label>
                     <Input value={settingsForm.name} onChange={e => setSettingsForm({ ...settingsForm, name: e.target.value })} />
                   </div>
                   <div className="space-y-2">
                     <Label>Description</Label>
                     <Input value={settingsForm.description} onChange={e => setSettingsForm({ ...settingsForm, description: e.target.value })} />
                   </div>
                   <div className="space-y-2">
                     <Label>Status</Label>
                     <Input value={settingsForm.status} onChange={e => setSettingsForm({ ...settingsForm, status: e.target.value })} />
                   </div>
                   <div className="space-y-2">
                     <Label>Due Date</Label>
                     <Input value={settingsForm.dueDate} onChange={e => setSettingsForm({ ...settingsForm, dueDate: e.target.value })} />
                   </div>
                   <button onClick={handleSaveSettings} className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all">
                     Save Changes
                   </button>
                </div>
             </DialogContent>
           </Dialog>
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
          {activeTab === "overview" && <OverviewTab project={projectState} />}
          {activeTab === "kanban" && <ProjectKanban projectId={projectState.id} />}
          {activeTab === "timeline" && <ProjectTimeline  />}
          {activeTab === "team" && <TeamTab team={projectState.team} onAddMember={(newMember: any) => setProjectState((prev: any) => ({...prev, team: [...prev.team, newMember]}))} />}
          {activeTab === "files" && <FilesTab />}
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

function TeamTab({ team, onAddMember }: { team: any[], onAddMember?: (member: any) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({ firstName: "", lastName: "", designation: "" });

  const handleAdd = () => {
    if (newMember.firstName && newMember.lastName) {
      if (onAddMember) onAddMember(newMember);
      setNewMember({ firstName: "", lastName: "", designation: "" });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all text-center group">
             <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all text-xl">
                {member.firstName[0]}
             </div>
             <h4 className="font-bold">{member.firstName} {member.lastName}</h4>
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{member.designation || "Member"}</p>
             <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-4">
                <button className="text-xs font-bold text-primary hover:underline">View Load</button>
                <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Chat</button>
             </div>
          </div>
        ))}
      </div>

      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input value={newMember.firstName} onChange={e => setNewMember({...newMember, firstName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input value={newMember.lastName} onChange={e => setNewMember({...newMember, lastName: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <Input value={newMember.designation} onChange={e => setNewMember({...newMember, designation: e.target.value})} placeholder="e.g. Frontend Developer" />
            </div>
            <button 
               onClick={handleAdd}
               className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all"
             >
               Add to Project
             </button>
          </div>
        </DialogContent>
      </Dialog>
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

function FilesTab() {
  const [files, setFiles] = useState([
    { name: "System Architecture v2.pdf", size: "2.4 MB", date: "2h ago", type: "pdf" }
  ]);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      setFiles([{
        name: newFile.name,
        size: (newFile.size / 1024 / 1024).toFixed(1) + " MB",
        date: "Just now",
        type: newFile.name.split('.').pop() || "file"
      }, ...files]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFile = e.dataTransfer.files[0];
      setFiles([{
        name: newFile.name,
        size: (newFile.size / 1024 / 1024).toFixed(1) + " MB",
        date: "Just now",
        type: newFile.name.split('.').pop() || "file"
      }, ...files]);
    }
  };

  return (
    <div className="space-y-8">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
        onDragLeave={() => setIsHovering(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "w-full flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed transition-all cursor-pointer",
          isHovering ? "border-primary bg-primary/5" : "border-border bg-muted/5 hover:bg-muted/10"
        )}
      >
        <UploadCloud className={cn("h-16 w-16 mb-4 transition-all", isHovering ? "text-primary scale-110" : "text-muted-foreground opacity-20")} />
        <p className="text-lg font-bold mb-1">Click or drag file to this area to upload</p>
        <p className="text-xs text-muted-foreground font-medium">Supports single or bulk upload. Strict prohibit from uploading company data or other band files.</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {files.map((f, i) => (
          <div key={i} className="flex items-center p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/30 transition-all group border-l-4 border-l-primary leading-tight">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4">
              <FileIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">{f.name}</h4>
              <div className="flex items-center text-xs text-muted-foreground font-medium mt-1">
                <span>{f.size}</span>
                <span className="mx-2">•</span>
                <span>{f.date}</span>
              </div>
            </div>
            <button 
               onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
               className="text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
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
