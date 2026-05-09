"use client";

import React from "react";
import {
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  ListTodo,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const columns = [
  { id: "TODO", title: "To Do", icon: <ListTodo className="h-4 w-4" /> },
  { id: "IN_PROGRESS", title: "In Progress", icon: <Clock className="h-4 w-4 text-primary" /> },
  { id: "REVIEW", title: "Review", icon: <AlertCircle className="h-4 w-4 text-amber-500" /> },
  { id: "DONE", title: "Completed", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
];

export default function TaskList({ tasks, setTasks }: { tasks: any[], setTasks: React.Dispatch<React.SetStateAction<any[]>> }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL": return "text-red-600 bg-red-50 border-red-200";
      case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
      case "MEDIUM": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusDisplay = (statusId: string) => {
    const col = columns.find(c => c.id === statusId);
    if (!col) return null;
    return (
      <div className="flex items-center gap-2">
        {col.icon}
        <span className="text-xs font-bold uppercase tracking-wider">{col.title}</span>
      </div>
    );
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-2xl border border-dashed border-border/60">
        <ListTodo className="h-10 w-10 text-muted-foreground/30 mb-4" />
        <h3 className="font-bold text-muted-foreground">No tasks found</h3>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Task Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Assignee</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-semibold">{task.title}</td>
                <td className="px-6 py-4">{getStatusDisplay(task.status)}</td>
                <td className="px-6 py-4">
                  <div className={cn("inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border", getPriorityColor(task.priority))}>
                    {task.priority}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                    <Calendar className="h-3 w-3" />
                    {task.dueDate || "No Date"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold uppercase">
                    {task.assignee ? task.assignee.substring(0, 2) : "??"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-muted-foreground hover:bg-muted p-1.5 rounded-lg transition-all">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
