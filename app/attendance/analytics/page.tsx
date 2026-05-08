"use client";

import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import AttendanceAnalytics from "@/modules/attendance/components/attendance-analytics";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area 
} from "recharts";
import { TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";

export default function AnalyticsPage() {
  const punctualityData = [
    { time: "08:00", count: 12 },
    { time: "08:30", count: 45 },
    { time: "09:00", count: 120 },
    { time: "09:30", count: 15 },
    { time: "10:00", count: 5 },
  ];

  return (
    <MainLayout>
      <div className="space-y-10 pb-20">
        <SectionHeader 
          title="Attendance & Punctuality Analytics" 
          description="Deep dive into organizational attendance trends, late arrivals, and overtime metrics."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           <AnalyticsStat label="Avg. Attendance" value="96.2%" trend="+0.4%" icon={Users} />
           <AnalyticsStat label="Late Arrivals" value="12" trend="-2" icon={Clock} />
           <AnalyticsStat label="Overtime Total" value="142h" trend="+12h" icon={TrendingUp} />
           <AnalyticsStat label="Absenteeism" value="1.5%" trend="-0.2%" icon={AlertTriangle} />
        </div>

        <AttendanceAnalytics />

        <div className="grid gap-8 lg:grid-cols-2">
           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Arrival Time Distribution</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={punctualityData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Monthly Overtime Trends</h3>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={[
                     { name: "Week 1", ot: 20 },
                     { name: "Week 2", ot: 35 },
                     { name: "Week 3", ot: 25 },
                     { name: "Week 4", ot: 45 },
                   ]}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748B" }} />
                     <Tooltip />
                     <Line type="stepAfter" dataKey="ot" stroke="#f43f5e" strokeWidth={3} dot={{ r: 6, fill: "#f43f5e" }} />
                   </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}

function AnalyticsStat({ label, value, trend, icon: Icon }: { label: string; value: string; trend: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
       <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
             <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-black text-emerald-500">{trend}</span>
       </div>
       <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
       <h4 className="text-2xl font-black mt-1 tracking-tight">{value}</h4>
    </div>
  );
}
