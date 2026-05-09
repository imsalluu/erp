"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fingerprint, Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AttendanceSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold tracking-widest uppercase">
              Time & Attendance
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Say goodbye to manual timesheets.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Automate your workforce tracking with real-time biometric check-ins, automated leave calculations, and intelligent shift scheduling.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                "Geo-fenced mobile clock-ins",
                "Automated overtime processing",
                "Multi-tier leave approval workflows",
                "Dynamic visual shift rosters"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" asChild className="rounded-xl px-8 h-14 font-bold shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 mt-4">
              <Link href="/login">Explore Attendance Features</Link>
            </Button>
          </div>

          {/* Right Visual Mockup */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              {/* Main Card */}
              <div className="bg-card border border-border shadow-2xl rounded-3xl p-6 relative">
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow-sm">
                      <span className="text-sm font-black text-muted-foreground">JD</span>
                    </div>
                    <div>
                      <h4 className="font-bold">John Doe</h4>
                      <p className="text-xs text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-500 animate-pulse">08:45 AM</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Checked In</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border flex items-center gap-4">
                     <Clock className="h-8 w-8 text-primary" />
                     <div>
                       <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Time</p>
                       <p className="text-xl font-black">42:15<span className="text-sm font-medium text-muted-foreground">hrs</span></p>
                     </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/50 border border-border flex items-center gap-4">
                     <CalendarDays className="h-8 w-8 text-amber-500" />
                     <div>
                       <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Leave Bal</p>
                       <p className="text-xl font-black">12<span className="text-sm font-medium text-muted-foreground">days</span></p>
                     </div>
                  </div>
                </div>

                {/* Simulated Fingerprint button floating */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-8 -left-8 h-24 w-24 bg-card rounded-2xl border border-border shadow-xl flex items-center justify-center p-2"
                >
                  <div className="h-full w-full rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Fingerprint className="h-10 w-10" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-emerald-500/5 blur-[100px] rounded-full z-0 pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
