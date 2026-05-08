"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2, UserCircle2, MoreVertical, ExternalLink } from "lucide-react";
import { Employee } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      layout
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden border-2 border-transparent group-hover:border-primary/20 transition-all">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div className={cn(
              "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card",
              employee.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500"
            )} />
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight group-hover:text-primary transition-colors">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{employee.designation}</p>
          </div>
        </div>
        <button className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            {employee.department}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            {employee.email.split('@')[0]}...
          </p>
        </div>
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <UserCircle2 className="h-3 w-3" />
            Role: {employee.role.toLowerCase()}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            {employee.phone}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          ${employee.salary.toLocaleString()}/yr
        </div>
        <button 
          onClick={() => router.push(`/employees/${employee.id}`)}
          className="flex items-center gap-1.5 rounded-lg bg-primary/5 px-3 py-1.5 text-[11px] font-bold text-primary hover:bg-primary hover:text-white transition-all capitalize"
        >
          View Profile
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
