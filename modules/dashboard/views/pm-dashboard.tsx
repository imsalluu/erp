"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { FolderKanban, CheckSquare, Clock, Users, BarChart3, AlertCircle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";

const resourceData = [
  { name: 'Dev Team A', scheduled: 160, capacity: 200 },
  { name: 'Dev Team B', scheduled: 180, capacity: 160 },
  { name: 'Design', scheduled: 80, capacity: 120 },
  { name: 'QA Team', scheduled: 120, capacity: 120 },
  { name: 'DevOps', scheduled: 40, capacity: 80 },
];

const performanceData = [
  { month: 'Jan', completed: 12, planned: 15 },
  { month: 'Feb', completed: 18, planned: 18 },
  { month: 'Mar', completed: 25, planned: 22 },
  { month: 'Apr', completed: 32, planned: 30 },
  { month: 'May', completed: 45, planned: 40 },
  { month: 'Jun', completed: 52, planned: 50 },
];

export default function PMDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Project Management" 
        description="Oversee project timelines, budgets, and team performance."
        badge="Project Manager"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Projects" value="4" change="+1" trend="up" icon={FolderKanban} />
        <StatCard label="Team Members" value="12" icon={Users} />
        <StatCard label="Overdue Tasks" value="3" change="+2" trend="down" icon={AlertCircle} />
        <StatCard label="Budget Util." value="72%" trend="up" icon={BarChart3} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 flex flex-col rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Active Project Timelines</h3>
          <div className="space-y-6 flex-1">
            {[
              { name: "ERP Frontend", progress: 85, status: "On Track" },
              { name: "Mobile App", progress: 42, status: "Delayed" },
              { name: "API Revamp", progress: 60, status: "On Track" },
            ].map((proj, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{proj.name}</span>
                  <span className={proj.status === "Delayed" ? "text-rose-500 font-medium" : "text-emerald-500 font-medium"}>{proj.status}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-500", proj.status === "Delayed" ? "bg-rose-500/80" : "bg-primary")} style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-3 flex flex-col rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-6">Resource Allocation</h3>
            <div className="flex-1 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-muted-foreground" />
                  <Tooltip 
                    cursor={{ fill: 'currentColor', opacity: 0.05 }}
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="capacity" name="Capacity (hrs)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="scheduled" name="Scheduled (hrs)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
         <h3 className="font-semibold text-lg mb-6">Task Completion Performance</h3>
         <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                 <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted" opacity={0.5} />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-muted-foreground" />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-muted-foreground" />
                 <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                 />
                 <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                 <Area type="monotone" dataKey="planned" name="Planned Tasks" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" />
                 <Area type="monotone" dataKey="completed" name="Completed Tasks" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}
