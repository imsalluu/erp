"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Server, Database, Lock, Globe } from "lucide-react";
import Link from "next/link";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-16">
           <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">System <span className="text-orange-500">Architecture</span></h1>
              <p className="text-xl text-muted-foreground">A deep dive into how WorkSync enables uncompromised security at scale through isolated multi-tenancy.</p>
           </div>

           {/* Hero Diagram */}
           <div className="w-full h-[400px] bg-card border border-border rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-orange-500/5" />
              <div className="w-full max-w-2xl h-full flex items-center justify-between relative">
                 {/* Central Auth */}
                 <div className="flex flex-col items-center gap-2 z-10 w-1/3">
                    <div className="h-20 w-20 bg-background border-2 border-primary rounded-2xl flex items-center justify-center shadow-lg">
                       <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <span className="font-bold">Global Auth</span>
                 </div>
                 
                 {/* DB Connection */}
                 <div className="flex flex-col items-center gap-2 z-10 w-1/3">
                    <div className="h-24 w-24 bg-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/20 text-white">
                       <Server className="h-10 w-10" />
                    </div>
                    <span className="font-black text-lg">Core API</span>
                 </div>

                 {/* Tenants */}
                 <div className="flex flex-col gap-4 z-10 w-1/3 items-center">
                    <div className="flex items-center gap-4 bg-background border border-border p-3 rounded-xl shadow-sm w-full">
                       <Database className="h-5 w-5 text-emerald-500 shrink-0" />
                       <span className="font-semibold text-sm">Tenant A DB</span>
                    </div>
                    <div className="flex items-center gap-4 bg-background border border-border p-3 rounded-xl shadow-sm w-full opacity-60">
                       <Database className="h-5 w-5 text-blue-500 shrink-0" />
                       <span className="font-semibold text-sm">Tenant B DB</span>
                    </div>
                    <div className="flex items-center gap-4 bg-background border border-border p-3 rounded-xl shadow-sm w-full opacity-30">
                       <Database className="h-5 w-5 text-rose-500 shrink-0" />
                       <span className="font-semibold text-sm">Tenant C DB</span>
                    </div>
                 </div>

                 {/* Lines */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                    <line x1="16%" y1="50%" x2="50%" y2="50%" stroke="currentColor" className="text-border" strokeWidth={2} strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="84%" y2="20%" stroke="currentColor" className="text-border" strokeWidth={2} strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="84%" y2="50%" stroke="currentColor" className="text-border" strokeWidth={2} strokeDasharray="4 4" />
                    <line x1="50%" y1="50%" x2="84%" y2="80%" stroke="currentColor" className="text-border" strokeWidth={2} strokeDasharray="4 4" />
                 </svg>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-muted/30 p-8 rounded-3xl space-y-4">
                 <Globe className="h-8 w-8 text-indigo-500" />
                 <h3 className="text-2xl font-bold">Why Multi-Tenant?</h3>
                 <p className="text-muted-foreground leading-relaxed">
                   In a single-tenant design, every customer shares identical resources. In our advanced logical multi-tenant architecture, each company operates in a mathematically isolated data plane. This ensures absolute privacy and allows individual backups without affecting global traffic.
                 </p>
              </div>
              <div className="bg-muted/30 p-8 rounded-3xl space-y-4">
                 <Lock className="h-8 w-8 text-emerald-500" />
                 <h3 className="text-2xl font-bold">Role-Based Security</h3>
                 <p className="text-muted-foreground leading-relaxed">
                   Access tokens are signed using strict JWTs that contain claim boundaries. A user with &quot;HR&quot; rights in Tenant A cannot even initiate a request to modify an employee in Tenant B. The Core API rigorously validates tenant IDs at the edge.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
