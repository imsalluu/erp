"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Users, Rocket, Clock, 
  ArrowUpRight, MoreVertical 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProjectCardProps {
  project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    "Planning": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "In Progress": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    "Review": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Completed": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "On Hold": "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="group rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
          statusColors[project.status as keyof typeof statusColors]
        )}>
          {project.status}
        </div>
        <button className="text-muted-foreground hover:bg-muted p-1 rounded-lg transition-all">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{project.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-primary">{project.progress}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member: any, i: number) => (
            <div 
              key={i} 
              className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold"
              title={`${member.firstName} ${member.lastName}`}
            >
              {member.firstName[0]}
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="h-8 w-8 rounded-full border-2 border-card bg-primary text-white flex items-center justify-center text-[10px] font-bold">
              +{project.team.length - 3}
            </div>
          )}
        </div>
        <Link 
          href={`/projects/${project.id}`}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
        >
          View Center
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
