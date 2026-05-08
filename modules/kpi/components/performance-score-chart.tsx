"use client";

import React from "react";
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from "recharts";

interface PerformanceScoreChartProps {
  data: { metric: string; value: number }[];
}

export default function PerformanceScoreChart({ data }: PerformanceScoreChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: "#64748B", fontSize: 12, fontWeight: "bold" }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: "#94A3B8", fontSize: 10 }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.4}
            strokeWidth={3}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
