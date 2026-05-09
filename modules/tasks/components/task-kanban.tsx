"use client";

import React from "react";
import { 
  Calendar, 
  MoreVertical, 
  Plus, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ListTodo
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const columns = [
  { id: "TODO", title: "To Do", icon: <ListTodo className="h-4 w-4" /> },
  { id: "IN_PROGRESS", title: "In Progress", icon: <Clock className="h-4 w-4 text-primary" /> },
  { id: "REVIEW", title: "Review", icon: <AlertCircle className="h-4 w-4 text-amber-500" /> },
  { id: "DONE", title: "Completed", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
];

export default function TaskKanban({ tasks, setTasks }: { tasks: any[], setTasks: React.Dispatch<React.SetStateAction<any[]>> }) {
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL": return "text-red-600 bg-red-50 border-red-200";
      case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
      case "MEDIUM": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, statusId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: statusId } : t
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              {column.icon}
              <h3 className="font-bold text-sm uppercase tracking-wider">{column.title}</h3>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-medium">
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div 
             className="flex-1 space-y-4 p-2 bg-muted/20 rounded-2xl border border-dashed border-border/60"
             onDragOver={handleDragOver}
             onDrop={(e) => handleDrop(e, column.id)}
          >
            {tasks.filter(t => t.status === column.id).map((task) => (
              <div 
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                className="cursor-grab active:cursor-grabbing"
              >
                <Card className="group border-border/40 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                        {task.title}
                      </h4>
                      <button className="text-muted-foreground hover:bg-muted p-1 rounded transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                        getPriorityColor(task.priority)
                      )}>
                        {task.priority}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/20 pt-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate || "No Date"}
                      </div>
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[8px] font-bold uppercase">
                        {task.assignee ? task.assignee.substring(0, 2) : "??"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
