"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-primary pointer-events-none">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
         <div className="absolute top-[10%] left-[20%] w-[60%] h-[80%] rounded-full bg-blue-500 blur-[150px] opacity-40 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8 p-12 md:p-20 rounded-[3rem] bg-card/10 backdrop-blur-3xl border border-white/10 shadow-2xl"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-white shadow-xl backdrop-blur-md mb-8">
            <Zap className="h-10 w-10" />
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Ready to unify <br className="hidden md:block" /> your workflow?
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join thousands of forward-thinking companies running their HR, payroll, and operations on WorkSync.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" asChild className="h-14 px-8 rounded-2xl text-base font-bold shadow-xl bg-white text-primary hover:bg-white/90 w-full sm:w-auto group">
               <Link href="/login">
                 Start Free Trial
                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
               </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-base font-bold w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
               Contact Sales
            </Button>
          </div>
          
          <p className="text-sm text-white/50 pt-4">Free 14-day trial. No credit card required.</p>
        </motion.div>
      </div>
    </section>
  );
}
