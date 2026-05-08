"use client";

import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function AttendanceLog() {
  const logs = [
    { date: "May 08, 2026", checkIn: "09:05 AM", checkOut: "--:--", status: "Present", color: "text-emerald-500" },
    { date: "May 07, 2026", checkIn: "08:55 AM", checkOut: "06:10 PM", status: "Present", color: "text-emerald-500" },
    { date: "May 06, 2026", checkIn: "09:15 AM", checkOut: "06:05 PM", status: "Late", color: "text-amber-500" },
    { date: "May 05, 2026", checkIn: "--:--", checkOut: "--:--", status: "Absent", color: "text-rose-500" },
    { date: "May 04, 2026", checkIn: "08:50 AM", checkOut: "05:55 PM", status: "Present", color: "text-emerald-500" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/20">
        <h3 className="font-semibold text-lg">My Attendance Logs</h3>
        <p className="text-sm text-muted-foreground mt-1">Review your recent check-in and check-out history.</p>
      </div>
      <div className="divide-y divide-border">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted/50 p-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{log.date}</p>
                <p className={cn("text-xs font-medium", log.color)}>{log.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-semibold">IN</p>
                <p className="text-sm font-medium">{log.checkIn}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-semibold">OUT</p>
                <p className="text-sm font-medium">{log.checkOut}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 text-sm font-medium text-primary hover:bg-muted/50 transition-colors border-t border-border">
        View Full History
      </button>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
