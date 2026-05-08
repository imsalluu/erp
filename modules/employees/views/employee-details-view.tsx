"use client";

import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, 
  DollarSign, FileText, Activity, LineChart, 
  FolderKanban, Heart, ShieldAlert, Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Employee } from "@/types";

interface TabProps {
  id: string;
  label: string;
  icon: any;
}

const TABS: TabProps[] = [
  { id: "info", label: "Personal Info", icon: User },
  { id: "salary", label: "Salary & Docs", icon: DollarSign },
  { id: "performance", label: "Performance", icon: LineChart },
  { id: "attendance", label: "Attendance", icon: Activity },
];

export default function EmployeeDetailsView({ employee }: { employee: Employee }) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="space-y-8 pb-12">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-indigo-500/20 to-purple-500/20" />
        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex flex-col md:flex-row md:items-end gap-6">
            <div className="h-32 w-32 rounded-3xl bg-primary border-4 border-card flex items-center justify-center text-white text-4xl font-black shadow-xl">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{employee.firstName} {employee.lastName}</h1>
                  <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4" />
                    {employee.designation} • {employee.department}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm font-semibold hover:bg-muted transition-all">
                    Edit Profile
                  </button>
                  <button className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    Generate Letter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-t border-border px-8 overflow-x-auto whitespace-nowrap bg-muted/10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 relative",
                activeTab === tab.id 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {activeTab === "info" && (
            <>
              <div className="lg:col-span-2 space-y-6">
                <InfoCard title="Basic Information" icon={User}>
                  <DetailItem label="Full Name" value={`${employee.firstName} ${employee.lastName}`} />
                  <DetailItem label="Employee ID" value={employee.id} />
                  <DetailItem label="Gender" value="Male" />
                  <DetailItem label="Date of Birth" value="May 12, 1995" />
                  <DetailItem label="Nationality" value="American" />
                  <DetailItem label="Blood Group" value="O+" />
                </InfoCard>

                <InfoCard title="Contact Information" icon={Mail}>
                  <DetailItem label="Email" value={employee.email} />
                  <DetailItem label="Phone" value={employee.phone} />
                  <DetailItem label="Emergency Contact" value="+1 (555) 000-1111 (Wife)" />
                  <DetailItem label="Current Address" value="123 Tech Lane, Silicon Valley, CA" />
                </InfoCard>
              </div>
              <div className="space-y-6">
                <InfoCard title="Work Status" icon={Briefcase}>
                  <DetailItem label="Department" value={employee.department} />
                  <DetailItem label="Designation" value={employee.designation} />
                  <DetailItem label="Reporting Manager" value="Mike Johnson" />
                  <DetailItem label="Join Date" value={employee.joinDate} />
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase transition-all">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                </InfoCard>
              </div>
            </>
          )}

          {activeTab === "salary" && (
            <>
              <div className="lg:col-span-2 space-y-6">
                <InfoCard title="Compensation Details" icon={DollarSign}>
                  <DetailItem label="Annual Base Salary" value={`$${employee.salary.toLocaleString()}`} />
                  <DetailItem label="Pay Cycle" value="Monthly" />
                  <DetailItem label="Bank Name" value="Silicon Valley Bank" />
                  <DetailItem label="Account Number" value="•••• 4567" />
                </InfoCard>
                <InfoCard title="Documents" icon={FileText}>
                  <div className="space-y-3">
                    {["Employment_Contract.pdf", "Identity_Verification.jpg", "Tax_ID_Form.pdf"].map((doc) => (
                      <div key={doc} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-medium">{doc}</span>
                        </div>
                        <button className="text-xs font-bold text-primary">Download</button>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </div>
            </>
          )}

          {activeTab === "performance" && (
            <>
              <div className="lg:col-span-3 space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <StatMiniCard label="Average KPI Score" value="94.2%" trend="+4%" icon={LineChart} />
                  <StatMiniCard label="Projects Completed" value="12" trend="+2" icon={FolderKanban} />
                  <StatMiniCard label="Awards Won" value="2" icon={Award} />
                </div>
                <InfoCard title="Detailed Performance Analysis" icon={Activity}>
                  <div className="h-64 w-full flex items-center justify-center bg-muted/10 border border-dashed border-border rounded-xl">
                    Performance Over Time Chart (Recharts)
                  </div>
                </InfoCard>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function InfoCard({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <Icon className="h-5 w-5" />
        <h3 className="font-bold text-lg tracking-tight text-foreground">{title}</h3>
      </div>
      <div className="grid gap-y-4 gap-x-8 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function StatMiniCard({ label, value, trend, icon: Icon }: { label: string; value: string; trend?: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{trend}</span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs font-bold text-muted-foreground uppercase">{label}</p>
        <p className="text-2xl font-black tracking-tighter mt-1">{value}</p>
      </div>
    </div>
  );
}
