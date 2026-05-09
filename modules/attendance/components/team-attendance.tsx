"use client";

import React, { useState } from "react";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { cn } from "@/lib/utils";
import { Search, User } from "lucide-react";

export default function TeamAttendance() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockTeamAttendance = REALISTIC_EMPLOYEES.map((emp, index) => {
    // Determine realistic states
    // In realistic scenarios, most are present, some late, few absent.
    const isAbsent = index === 5; 
    const isLate = index === 2 || index === 4;
    
    let status = "Absent";
    let color = "text-rose-600 bg-rose-500/10 border-rose-200";
    let checkIn = "--:--";
    let checkOut = "--:--";

    if (!isAbsent) {
      if (isLate) {
         status = "Late";
         color = "text-amber-600 bg-amber-500/10 border-amber-200";
         checkIn = `09:${10 + index} AM`;
      } else {
         status = "Present";
         color = "text-emerald-600 bg-emerald-500/10 border-emerald-200";
         checkIn = `08:${40 + (index * 2)} AM`;
      }
      // Some people haven't checked out yet
      if (index % 3 !== 0) {
         checkOut = `05:${30 + index} PM`;
      }
    }

    return {
      ...emp,
      status,
      color,
      checkIn,
      checkOut
    };
  });

  const filtered = mockTeamAttendance.filter(emp => 
    (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h3 className="font-semibold text-lg">Team Attendance Today</h3>
           <p className="text-sm text-muted-foreground mt-1">Daily overview of check-ins and check-outs for all employees.</p>
        </div>
        <div className="relative w-full max-w-xs">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <input
             type="text"
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             placeholder="Search employee or dept..."
             className="w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
           />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                     <div className="h-9 w-9 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary border border-primary/20">
                        <User className="h-4 w-4" />
                     </div>
                     <div>
                        <p className="font-semibold whitespace-nowrap">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-muted-foreground">{emp.designation} • {emp.department}</p>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={cn("inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border", emp.color)}>
                     {emp.status}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{emp.checkIn}</td>
                <td className="px-6 py-4 font-medium">{emp.checkOut}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
               <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground font-medium">
                     No employees found matching the search.
                  </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
