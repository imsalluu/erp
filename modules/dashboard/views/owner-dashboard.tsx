"use client";

import { StatCard, SectionHeader } from "../components/dashboard-ui";
import { Users, Briefcase, TrendingUp, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const performanceData = [
  { name: "Jan", revenue: 45000, projects: 12 },
  { name: "Feb", revenue: 52000, projects: 15 },
  { name: "Mar", revenue: 48000, projects: 14 },
  { name: "Apr", revenue: 61000, projects: 18 },
  { name: "May", revenue: 59000, projects: 16 },
  { name: "Jun", revenue: 75000, projects: 22 },
  { name: "Jul", revenue: 86000, projects: 26 },
  { name: "Aug", revenue: 102000, projects: 31 },
  { name: "Sep", revenue: 98000, projects: 28 },
  { name: "Oct", revenue: 115000, projects: 34 },
  { name: "Nov", revenue: 128450, projects: 38 },
];

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Business Overview" 
        description="Monitor your company's performance, human resources, and project status."
        badge="Business Owner"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue (MTD)" value="$128,450" change="+8.2%" trend="up" icon={DollarSign} />
        <StatCard label="Total Employees" value="148" change="+4" trend="up" icon={Users} />
        <StatCard label="Active Projects" value="14" change="+2" trend="up" icon={Briefcase} />
        <StatCard label="Overall Progress" value="82%" change="+5%" trend="up" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Project Progress Distribution</h3>
            <span className="text-sm text-muted-foreground">Current Quarter</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted-foreground/20" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  className="text-xs text-muted-foreground" 
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  className="text-xs text-muted-foreground" 
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  className="text-xs text-muted-foreground" 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                  formatter={(value: any, name: any) => [
                    name === "revenue" ? `$${Number(value).toLocaleString()}` : value, 
                    String(name).charAt(0).toUpperCase() + String(name).slice(1)
                  ]}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="projects" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorProjects)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-lg mb-6">Key Business Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Employee Utilization</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[94%]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Budget vs Actual</span>
                <span className="font-semibold">88%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[88%]" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Client Satisfaction</span>
                <span className="font-semibold">4.8/5.0</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[96%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
