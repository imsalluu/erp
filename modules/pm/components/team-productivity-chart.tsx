"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Cell 
} from "recharts";

const data = [
  { name: "Mon", tasks: 12, efficiency: 85 },
  { name: "Tue", tasks: 18, efficiency: 92 },
  { name: "Wed", tasks: 15, efficiency: 88 },
  { name: "Thu", tasks: 22, efficiency: 95 },
  { name: "Fri", tasks: 14, efficiency: 90 },
];

export default function TeamProductivityChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#64748B", fontWeight: "bold" }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#64748B", fontWeight: "bold" }} 
          />
          <Tooltip 
            cursor={{ fill: '#F1F5F9' }}
            contentStyle={{ 
              borderRadius: "16px", 
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              padding: "12px"
            }} 
          />
          <Bar 
            dataKey="tasks" 
            name="Tasks Completed" 
            radius={[6, 6, 0, 0]} 
            barSize={32}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6366f1" : "#818cf8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
