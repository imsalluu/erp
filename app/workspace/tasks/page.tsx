"use client";

import React, { useState, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import TaskKanban from "@/modules/tasks/components/task-kanban";
import TaskList from "@/modules/tasks/components/task-list";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List as ListIcon, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockTasks = [
  { id: "1", title: "Fix login hydration error", status: "TODO", priority: "HIGH", dueDate: "2026-05-10", assignee: "JW", projectId: "P1" },
  { id: "2", title: "Implement project filters", status: "IN_PROGRESS", priority: "MEDIUM", dueDate: "2026-05-12", assignee: "MIKE", projectId: "P1" },
  { id: "3", title: "Design settings page", status: "TODO", priority: "LOW", dueDate: "2026-05-15", assignee: "ANNA", projectId: "P2" },
  { id: "4", title: "Leave module testing", status: "REVIEW", priority: "HIGH", dueDate: "2026-05-08", assignee: "JW", projectId: "P3" },
  { id: "5", title: "Setup CI/CD pipeline", status: "DONE", priority: "CRITICAL", dueDate: "2026-05-01", assignee: "MIKE", projectId: "P2" },
  { id: "6", title: "Review onboarding materials", status: "TODO", priority: "MEDIUM", dueDate: "2026-05-18", assignee: "AW", projectId: "P1" },
  { id: "7", title: "Write weekly status report", status: "IN_PROGRESS", priority: "LOW", dueDate: "2026-05-12", assignee: "AW", projectId: "P1" },
  { id: "8", title: "Bug fix: Navbar overflow", status: "REVIEW", priority: "HIGH", dueDate: "2026-05-15", assignee: "AW", projectId: "P2" },
  { id: "9", title: "Update dependencies", status: "DONE", priority: "MEDIUM", dueDate: "2026-05-05", assignee: "AW", projectId: "P1" },
  { id: "10", title: "Client feedback presentation", status: "TODO", priority: "CRITICAL", dueDate: "2026-05-22", assignee: "MIKE", projectId: "P3" },
];

export default function TasksPage() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const canCreateTask = user?.role === "BUSINESS_OWNER" || user?.role === "PROJECT_MANAGER" || user?.role === "SUPERVISOR" || user?.role === "EMPLOYEE";
  const isEmployee = user?.role === "EMPLOYEE";
  const userInitials = user?.name ? user.name.split(" ").map(n => n.charAt(0)).join("").toUpperCase() : "";
  
  const [tasks, setTasks] = useState(mockTasks);
  const [projectFilter, setProjectFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "MEDIUM", dueDate: "", assignee: "", projectId: "P1" });

  const filteredTasks = tasks
    .filter(t => {
       if (isEmployee) return t.assignee === userInitials;
       return assigneeFilter === "all" || t.assignee === assigneeFilter;
    })
    .filter(t => projectFilter === "all" || t.projectId === projectFilter)
    .filter(t => !dateFilter || t.dueDate === dateFilter);

  const handleCreateTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now().toString(), status: "TODO" }]);
      setIsCreateOpen(false);
      setNewTask({ title: "", priority: "MEDIUM", dueDate: "", assignee: "", projectId: "P1" });
    }
  };

  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER", "PROJECT_MANAGER", "SUPERVISOR", "EMPLOYEE"]}>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SectionHeader 
            title="Tasks & Todo" 
            description="Manage your personal and team tasks across projects."
          />
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <button 
                onClick={() => dateInputRef.current?.showPicker()}
                className={`flex w-[155px] overflow-hidden whitespace-nowrap items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 ${dateFilter ? "bg-primary text-white border-primary pr-8" : "border-border bg-card hover:bg-muted text-muted-foreground"}`}
              >
                 <Filter className="h-4 w-4 shrink-0" />
                 {dateFilter ? dateFilter : "Date Ordered"}
              </button>
              <input 
                ref={dateInputRef}
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  if (e.target.value) setView("list");
                }}
                title="Filter by date"
                className="sr-only"
              />
              {dateFilter && (
                <button 
                  onClick={() => setDateFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 text-white z-10 p-1"
                >
                  ✕
                </button>
              )}
            </div>
            {canCreateTask && (
               <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                 <DialogTrigger asChild>
                   <Button className="rounded-xl font-bold px-6 py-2.5 h-auto shadow-lg shadow-primary/20">
                     <Plus className="h-4 w-4 mr-2" />
                     New Task
                   </Button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-black">Create New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                       <div className="space-y-2">
                         <Label>Task Title</Label>
                         <Input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="e.g. Update user dashboard" />
                       </div>
                       <div className="space-y-2">
                         <Label>Due Date</Label>
                         <Input type="date" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} />
                       </div>
                       <div className="space-y-2">
                         <Label>Priority</Label>
                         <select 
                           value={newTask.priority} 
                           onChange={e => setNewTask({...newTask, priority: e.target.value})}
                           className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                         >
                           <option value="LOW">Low</option>
                           <option value="MEDIUM">Medium</option>
                           <option value="HIGH">High</option>
                           <option value="CRITICAL">Critical</option>
                         </select>
                       </div>
                       <div className="space-y-2">
                         <Label>Assignee</Label>
                         <Input value={newTask.assignee} onChange={e => setNewTask({...newTask, assignee: e.target.value})} placeholder="e.g. JW (Initials)" />
                       </div>
                       <div className="space-y-2">
                         <Label>Project</Label>
                         <select 
                           value={newTask.projectId} 
                           onChange={e => setNewTask({...newTask, projectId: e.target.value})}
                           className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                         >
                           <option value="P1">Project 1</option>
                           <option value="P2">Project 2</option>
                           <option value="P3">Project 3</option>
                         </select>
                       </div>
                       <button onClick={handleCreateTask} className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all">
                         Create Task
                       </button>
                    </div>
                 </DialogContent>
               </Dialog>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/20 p-4 rounded-2xl border border-border">
          <div className="flex items-center gap-6">
            {!isEmployee && (
              <>
                <div className="text-sm flex items-center gap-2">
                  <span className="text-muted-foreground font-medium">Project:</span>
                  <select 
                    value={projectFilter} 
                    onChange={e => setProjectFilter(e.target.value)}
                    className="bg-card text-foreground font-bold border border-border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="all">All Projects</option>
                    <option value="P1">Project 1</option>
                    <option value="P2">Project 2</option>
                    <option value="P3">Project 3</option>
                  </select>
                </div>
                <div className="text-sm flex items-center gap-2">
                  <span className="text-muted-foreground font-medium">Assignee:</span>
                  <select 
                    value={assigneeFilter} 
                    onChange={e => setAssigneeFilter(e.target.value)}
                    className="bg-card text-foreground font-bold border border-border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer uppercase"
                  >
                    <option value="all">Everyone</option>
                    <option value="JW">JW</option>
                    <option value="MIKE">MIKE</option>
                    <option value="ANNA">ANNA</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 p-1 bg-card rounded-xl border border-border shadow-sm">
            <button 
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg shadow-sm transition-all ${view === "grid" ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={`p-2 rounded-lg shadow-sm transition-all ${view === "list" ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <TaskKanban tasks={filteredTasks} setTasks={setTasks} />
        ) : (
          <TaskList tasks={filteredTasks} setTasks={setTasks} />
        )}
      </div>
    </MainLayout>
  );
}
