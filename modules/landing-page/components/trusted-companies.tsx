"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Briefcase, Globe, Hexagon, CircleDashed, Triangle, Anchor, Target } from "lucide-react";

const COMPANIES = [
  { name: "Acme Corp", icon: Building2 },
  { name: "Global HR", icon: Globe },
  { name: "TechNova", icon: Hexagon },
  { name: "CloudSync", icon: CircleDashed },
  { name: "Vortex Inc", icon: Triangle },
  { name: "Nautical", icon: Anchor },
  { name: "Precision", icon: Target },
  { name: "Apex Group", icon: Briefcase },
];

export default function TrustedCompanies() {
  return (
    <section className="py-12 border-t border-border/50 bg-muted/10 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center relative z-20">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Trusted by innovative teams worldwide
        </p>
      </div>

      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex items-center gap-16 pr-16"
        >
          {[...COMPANIES, ...COMPANIES].map((company, i) => {
            const Icon = company.icon;
            return (
              <div 
                key={i} 
                className="flex items-center gap-3 text-muted-foreground opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <Icon className="h-8 w-8" />
                <span className="text-2xl font-bold tracking-tight">{company.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
