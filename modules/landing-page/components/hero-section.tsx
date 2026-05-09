"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import DemoModal from "@/modules/landing-page/components/demo-modal";

export default function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            WorkSync 2.0 is Live
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
            Manage Your Entire Workforce From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              One Platform
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Modern ERP & HR Management SaaS for businesses to manage employees, attendance, projects, KPIs, payroll workflows, and team productivity effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="h-14 px-8 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 w-full sm:w-auto group">
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setDemoOpen(true)}
              className="h-14 px-8 rounded-2xl text-base font-bold w-full sm:w-auto hover:bg-muted group"
            >
              <Play className="mr-2 h-5 w-5 fill-foreground/20 group-hover:fill-foreground/40 transition-colors" />
              Book a Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 14-day free trial
            </div>
          </div>
        </motion.div>

        {/* Dashboard Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 mx-auto max-w-6xl relative"
        >
          <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-2xl p-2 relative overflow-hidden ring-1 ring-white/10">
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            {/* Pure CSS Mockup Instead of Placeholder */}
            <div className="aspect-[16/9] w-full bg-background rounded-b-2xl flex relative overflow-hidden text-left">
               {/* Sidebar */}
               <div className="w-1/4 max-w-[240px] border-r border-border bg-muted/20 p-4 flex flex-col gap-6 hidden sm:flex">
                 <div className="h-8 w-3/4 bg-blue-100 dark:bg-blue-900 rounded-lg animate-pulse" />
                 <div className="space-y-3">
                   <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                   <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                   <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                   <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                 </div>
                 <div className="mt-auto h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
               </div>
               
               {/* Main Content */}
               <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 bg-muted/5">
                 {/* Topbar */}
                 <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
                    <div className="flex gap-3">
                      <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
                      <div className="h-8 w-8 bg-blue-200 dark:bg-blue-800 rounded-full animate-pulse" />
                    </div>
                 </div>

                 {/* KPI Cards */}
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="h-20 sm:h-24 bg-card border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
                       <div className="h-3 sm:h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                       <div className="h-6 sm:h-8 w-3/4 bg-blue-100 dark:bg-blue-900 rounded" />
                    </div>
                    <div className="h-20 sm:h-24 bg-card border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm">
                       <div className="h-3 sm:h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                       <div className="h-6 sm:h-8 w-2/3 bg-emerald-100 dark:bg-emerald-900 rounded" />
                    </div>
                    <div className="h-20 sm:h-24 bg-card border border-border rounded-xl p-4 flex flex-col justify-between shadow-sm hidden sm:flex">
                       <div className="h-3 sm:h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                       <div className="h-6 sm:h-8 w-3/4 bg-orange-100 dark:bg-orange-900 rounded" />
                    </div>
                 </div>

                 {/* Chart/Table Area */}
                 <div className="flex-1 bg-card border border-border rounded-xl p-4 flex gap-4 shadow-sm">
                    <div className="w-full sm:w-2/3 border border-border/50 rounded-lg flex items-end gap-2 p-4">
                       {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                         <div 
                           key={i} 
                           className="flex-1 bg-blue-500 rounded-t-sm animate-pulse" 
                           style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} 
                         />
                       ))}
                    </div>
                    <div className="w-1/3 border border-border/50 rounded-lg p-4 space-y-3 hidden sm:block">
                       <div className="h-4 w-full bg-muted rounded" />
                       <div className="h-4 w-full bg-muted rounded" />
                       <div className="h-4 w-3/4 bg-muted rounded" />
                       <div className="h-4 w-4/5 bg-muted rounded" />
                    </div>
                 </div>
               </div>
            </div>
            
            <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
