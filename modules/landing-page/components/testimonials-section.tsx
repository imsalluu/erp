"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "VP of HR, TechFlow",
    content: "We've replaced 4 different tools with WorkSync. The role-based permissions mean my HR team sees exactly what they need, while our PMs manage sprints in the same platform. Absolutely game-changing.",
    avatar: "bg-blue-500",
    initials: "SJ"
  },
  {
    name: "Michael Chang",
    role: "CEO, Horizon Holding Group",
    content: "Managing 5 subsidiary companies used to be a logistical nightmare. The multi-tenant architecture allowed us to consolidate billing, maintain unified oversight, and still let each brand operate independently.",
    avatar: "bg-emerald-500",
    initials: "MC"
  },
  {
    name: "Olivia Reston",
    role: "Engineering Manager",
    content: "The biometric attendance synced directly with our sprint planning has solved so many arguments. I can see exactly who is clocked in and assign critical PR reviews in seconds.",
    avatar: "bg-rose-500",
    initials: "OR"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Loved by <span className="text-primary">industry leaders.</span>
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            Don&apos;t just take our word for it. Here&apos;s what enterprise operators are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all relative"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star key={star} className="h-5 w-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                &quot;{t.content}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                 <div className={`h-12 w-12 rounded-full ${t.avatar} flex items-center justify-center text-white font-bold`}>
                   {t.initials}
                 </div>
                 <div>
                   <h4 className="font-bold text-foreground">{t.name}</h4>
                   <p className="text-xs text-muted-foreground">{t.role}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
