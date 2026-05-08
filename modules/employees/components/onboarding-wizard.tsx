"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Briefcase, CreditCard, ShieldCheck, 
  ChevronRight, ChevronLeft, Check, Upload 
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Personal info", icon: User },
  { id: 2, title: "Employment", icon: Briefcase },
  { id: 3, title: "Bank Details", icon: CreditCard },
  { id: 4, title: "Review", icon: ShieldCheck },
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">New Hire Onboarding</h1>
        <p className="text-muted-foreground mt-2 font-medium">Complete the 4-step process to onboard a new team member.</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between items-center px-4">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center gap-3 relative flex-1">
            <div className={cn(
              "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all z-10 bg-card",
              currentStep === step.id ? "border-primary text-primary shadow-lg shadow-primary/20 scale-110" : 
              currentStep > step.id ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"
            )}>
              {currentStep > step.id ? <Check className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
            </div>
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest",
              currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
            )}>{step.title}</span>
            
            {i < STEPS.length - 1 && (
              <div className={cn(
                "absolute top-6 left-[50%] right-[-50%] h-[2px] -z-0",
                currentStep > step.id ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {currentStep === 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                 <Input label="First Name" placeholder="e.g. John" />
                 <Input label="Last Name" placeholder="e.g. Doe" />
                 <Input label="Personal Email" placeholder="john.doe@gmail.com" />
                 <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="grid gap-6 md:grid-cols-2">
                 <Input label="Job Title" placeholder="Senior Frontend Developer" />
                 <Input label="Department" placeholder="Engineering" />
                 <Input label="Joining Date" type="date" />
                 <Input label="Reporting Manager" placeholder="Mike Johnson" />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                   <Input label="Account Holder Name" placeholder="John Doe" />
                   <Input label="Bank Name" placeholder="Silicon Valley Bank" />
                   <Input label="Account Number" placeholder="•••• •••• •••• 1234" />
                   <Input label="SWIFT/BIC Code" placeholder="SVB US 33" />
                </div>
                <div className="p-6 rounded-xl border-2 border-dashed border-border flex flex-col items-center gap-2 hover:border-primary/50 cursor-pointer transition-all">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-bold">Upload Identity Document</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-10 space-y-4">
                 <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="h-10 w-10" />
                 </div>
                 <h3 className="text-2xl font-bold">All set!</h3>
                 <p className="text-muted-foreground max-w-sm mx-auto">Please review all information before finalizing the onboarding process.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between pt-8 border-t border-border">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-muted disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-primary font-bold text-sm text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            {currentStep === STEPS.length ? "Finalize Onboarding" : "Continue"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono"
      />
    </div>
  );
}
