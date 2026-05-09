"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MultiTenantSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold tracking-widest uppercase">
              Multi-Tenant Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              One central account. Unlimited workspaces.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Perfect for conglomerates, holding companies, or agencies. Manage completely isolated tenant environments seamlessly.
            </p>
            
            <div className="pt-4">
               <ul className="space-y-4 text-muted-foreground font-medium">
                 <li className="flex gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                    <Building2 className="h-6 w-6 text-orange-500 shrink-0" />
                    <span className="text-sm">Isolated databases ensure zero data leakage between different companies.</span>
                 </li>
                 <li className="flex gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                    <Building2 className="h-6 w-6 text-orange-500 shrink-0" />
                    <span className="text-sm">Unique vanity URLs and branding packages per tenant workspace.</span>
                 </li>
               </ul>
            </div>

            <Button size="lg" asChild className="rounded-xl px-8 h-14 font-bold shadow-lg shadow-orange-500/20 bg-orange-500 hover:bg-orange-600 mt-4 group">
              <Link href="/login">
                View Architecture
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Right Visual */}
          <div className="w-full lg:w-1/2 relative h-[400px]">
             {/* Simulated Node graph of tenants */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative h-64 w-64"
                >
                  {/* Central Node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-2xl bg-orange-500 shadow-xl shadow-orange-500/20 flex items-center justify-center z-20 shrink-0">
                     <span className="font-black text-white text-xl">ERP</span>
                  </div>

                  {/* Lines to nodes */}
                  <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox="0 0 256 256">
                    <line x1="128" y1="128" x2="30" y2="40" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="128" y1="128" x2="226" y2="40" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="128" y1="128" x2="128" y2="226" stroke="currentColor" className="text-border" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>

                  {/* Child nodes */}
                  <div className="absolute top-[10%] left-[10%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center z-10 flex-col">
                     <Building2 className="h-5 w-5 text-primary mb-1" />
                     <span className="text-[10px] font-bold">Acme</span>
                  </div>
                  <div className="absolute top-[10%] right-[10%] translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center z-10 flex-col">
                     <Building2 className="h-5 w-5 text-indigo-500 mb-1" />
                     <span className="text-[10px] font-bold">Global</span>
                  </div>
                  <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 translate-y-1/2 h-16 w-16 rounded-2xl bg-muted border border-border border-dashed shadow-sm flex items-center justify-center z-10 cursor-pointer hover:bg-card transition-colors">
                     <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
