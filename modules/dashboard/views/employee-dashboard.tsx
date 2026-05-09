"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { CheckSquare, Clock, Calendar, Star, Bell, Sparkles, FileText, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const performanceData = [
  { name: 'W1', score: 85 },
  { name: 'W2', score: 88 },
  { name: 'W3', score: 92 },
  { name: 'W4', score: 95 },
  { name: 'W5', score: 91 },
  { name: 'W6', score: 98 },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader 
        title="My Dashboard" 
        description="View your personal tasks, attendance, and performative metrics."
        badge="Employee"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tasks Done" value="24" change="+3" trend="up" icon={CheckSquare} />
        <StatCard label="Attendance" value="98%" trend="neutral" icon={Clock} />
        <StatCard label="Performance" value="4.9" trend="up" icon={Star} />
        <StatCard label="Paid Time Off" value="14 Days" icon={Calendar} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-6">
          {/* Performance Chart */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
             <h3 className="font-semibold text-lg mb-6">Weekly Performance Trend</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={performanceData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" vertical={false} />
                     <XAxis dataKey="name" stroke="currentColor" fontSize={12} className="opacity-50 text-muted-foreground" axisLine={false} tickLine={false} />
                     <YAxis stroke="currentColor" fontSize={12} className="opacity-50 text-muted-foreground" axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', fontWeight: 'bold' }}
                        itemStyle={{ color: 'hsl(var(--primary))' }}
                     />
                     <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, fill: 'hsl(var(--primary))' }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Personal Reports</h3>
            <div className="space-y-4">
              {[
                { title: "Q1 Performance Review", date: "April 2026", size: "1.2 MB" },
                { title: "Monthly Attendance Report", date: "May 2026", size: "840 KB" },
              ].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group bg-card">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{report.title}</h4>
                      <span className="text-xs font-semibold text-muted-foreground mt-0.5 block">{report.date} • {report.size}</span>
                    </div>
                  </div>
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="rounded-xl border border-border bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <Sparkles className="h-16 w-16 text-indigo-500" />
            </div>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
               <Sparkles className="h-5 w-5" />
               AI Insights
            </h3>
            <p className="text-sm font-medium leading-relaxed dark:text-indigo-100 text-indigo-950/80 mb-4 pr-4">
               You've been highly productive this week, completing 20% more tasks than average! However, your active screen time is very high. Consider taking a short break or scheduling a casual leave day soon to prevent burnout.
            </p>
            <button className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-600/20 transition-all shadow-sm">
               Review Leave Balance
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-6">Upcoming Tasks</h3>
            <div className="space-y-4">
              {[
                { title: "Fix Dashboard Sidebar bug", project: "ERP Frontend", due: "Today", priority: "High" },
                { title: "Implement Auth Flow", project: "ERP Frontend", due: "Tomorrow", priority: "Medium" },
                { title: "Code Review: API Integration", project: "Mobile App", due: "Friday", priority: "Low" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border group hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      task.priority === "High" ? "bg-rose-500" : task.priority === "Medium" ? "bg-amber-500" : "bg-slate-400"
                    )} />
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{task.title}</p>
                      <p className="text-xs font-medium text-muted-foreground truncate">{task.project} • Due {task.due}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
