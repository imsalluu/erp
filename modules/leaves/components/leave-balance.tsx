"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const leaveTypes = [
  { name: "Annual Leave", used: 12, total: 20, color: "bg-blue-500" },
  { name: "Sick Leave", used: 3, total: 10, color: "bg-red-500" },
  { name: "Casual Leave", used: 5, total: 10, color: "bg-amber-500" },
  { name: "Maternity/Paternity", used: 0, total: 90, color: "bg-purple-500" },
];

export default function LeaveBalance() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {leaveTypes.map((type) => (
        <Card key={type.name} className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {type.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold">{type.total - type.used}</span>
              <span className="text-xs text-muted-foreground">Days Available</span>
            </div>
            <Progress 
              value={(type.used / type.total) * 100} 
              className="h-1.5" 
            />
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-medium">
              <span>{type.used} USED</span>
              <span>{type.total} TOTAL</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
