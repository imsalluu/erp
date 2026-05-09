"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How does the role-based access control actually work?",
    a: "We provide 6 hardcoded enterprise roles: System Admin, Business Owner, HR Manager, Project Manager, Supervisor, and Employee. Each role has strictly defined permissions determining which modules they can see, what actions they can perform, and which data sets they can query."
  },
  {
    q: "Can I manage multiple companies on one account?",
    a: "Yes! Our Multi-Tenant architecture allows System Admins to deploy unlimited isolated workspaces (tenants). Each tenant operates as a completely separate company with its own employees, departments, and billing, while you maintain centralized oversight."
  },
  {
    q: "Do you integrate with external payroll providers?",
    a: "While WorkSync features a highly capable internal payroll calculation engine linked directly to employee attendance and leave, we also provide one-click CSV exports formatted specifically for major providers like Gusto, ADP, and Paychex."
  },
  {
    q: "Is there a limit to how many projects we can run?",
    a: "No. Project Managers can create unlimited projects, sprints, and tasks for their respective tenants. The only limitation is the file storage capacity based on your subscription tier."
  },
  {
    q: "How secure is the platform?",
    a: "We utilize enterprise-grade security including AES-256 encryption at rest, complete logical database segregation between tenants (Row Level Security), and mandatory Audit Logs tracking every administrative action taken on the platform."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-muted/10 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground pt-2">
            Everything you need to know about integrating WorkSync into your organization.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            
            return (
              <div 
                key={i} 
                className={`border rounded-2xl transition-colors duration-300 ${isOpen ? "bg-card border-primary/30" : "bg-card/50 border-border"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                   <span className="font-bold text-lg pr-8">{faq.q}</span>
                   <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                   </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
