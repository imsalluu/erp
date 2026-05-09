"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader, StatCard } from "@/modules/dashboard/components/dashboard-ui";
import { TENANTS, PLATFORM_STATS } from "@/mock-data/detailed-mock-data";
import {
   Building2, Users, CreditCard,
   Search, Filter, Plus,
   MoreVertical, ArrowUpRight, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProvisionTenantForm from "@/modules/admin/components/provision-tenant-form";
import { useState } from "react";

export default function TenantManagementPage() {
   const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
   return (
      <MainLayout allowedRoles={["SYSTEM_ADMIN"]}>
         <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <SectionHeader
                  title="Multi-Tenant Administration"
                  description="Manage all organizational workspaces, monitor usage limits, and control global license distribution."
                  badge="Root Access"
               />
               <Dialog open={isProvisionModalOpen} onOpenChange={setIsProvisionModalOpen}>
                   <DialogTrigger asChild>
                      <Button className="rounded-xl font-bold px-6 py-3 h-auto shadow-lg shadow-primary/20">
                         <Plus className="h-4 w-4 mr-2" />
                         Provision New Tenant
                      </Button>
                   </DialogTrigger>
                   <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                         <DialogTitle>Provision New Tenant</DialogTitle>
                      </DialogHeader>
                      <ProvisionTenantForm onSuccess={() => setIsProvisionModalOpen(false)} />
                   </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
               <StatCard label="Total Revenue" value={`$${PLATFORM_STATS.totalRevenue.toLocaleString()}`} trend="up" change={PLATFORM_STATS.revenueGrowth} icon={CreditCard} />
               <StatCard label="Active Tenants" value={PLATFORM_STATS.activeTenants} icon={Building2} />
               <StatCard label="Platform Users" value={PLATFORM_STATS.totalUsers} icon={Users} />
               <StatCard label="Health Score" value="99.9%" icon={Shield} />
            </div>

            <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
               <div className="p-6 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="font-bold text-lg">Active Enterprise Workspaces</h3>
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input placeholder="Search tenants..." className="rounded-xl border border-border bg-card py-2 pl-10 pr-4 text-xs outline-none focus:border-primary transition-all w-64" />
                     </div>
                     <button className="p-2 rounded-xl border border-border hover:bg-muted transition-all">
                        <Filter className="h-4 w-4" />
                     </button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-black text-muted-foreground border-b border-border">
                        <tr>
                           <th className="px-6 py-4">Tenant Name</th>
                           <th className="px-6 py-4">Industry Sector</th>
                           <th className="px-6 py-4 text-center">Active Users</th>
                           <th className="px-6 py-4">License Plan</th>
                           <th className="px-6 py-4">Status</th>
                           <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        {TENANTS.map((tenant) => (
                           <tr key={tenant.id} className="hover:bg-muted/30 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
                                       {tenant.name[0]}
                                    </div>
                                    <div>
                                       <p className="font-bold">{tenant.name}</p>
                                       <p className="text-[10px] text-muted-foreground">Joined {tenant.joined}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 font-medium text-muted-foreground">{tenant.sector}</td>
                              <td className="px-6 py-4 text-center font-black">{tenant.users}</td>
                              <td className="px-6 py-4">
                                 <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                    tenant.plan === "Enterprise" ? "bg-indigo-100 text-indigo-700 border-indigo-200" :
                                       tenant.plan === "Professional" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-slate-100 text-slate-700 border-slate-200"
                                 )}>
                                    {tenant.plan}
                                 </span>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <div className={cn("h-1.5 w-1.5 rounded-full", tenant.status === "Active" ? "bg-emerald-500" : "bg-amber-500")} />
                                    <span className="font-bold text-xs">{tenant.status}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                                       <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-slate-800 hover:text-white transition-all shadow-sm">
                                       <MoreVertical className="h-4 w-4" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </MainLayout>
   );
}
