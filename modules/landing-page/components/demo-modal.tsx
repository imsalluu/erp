"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      await fetch("/api/demo", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book a Demo</DialogTitle>
          <DialogDescription>
             Fill out the form below and our team will get in touch to schedule a personalized tour of the platform.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center space-y-4">
             <div className="mx-auto h-16 w-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <h3 className="text-xl font-bold text-foreground">Request Received!</h3>
             <p className="text-muted-foreground">We will contact you shortly.</p>
             <Button onClick={onClose} className="mt-4 w-full h-12">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input name="company" required placeholder="Acme Corp" />
            </div>
            <div className="space-y-2">
              <Label>Work Email</Label>
              <Input name="email" type="email" required placeholder="john@acme.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label>How can we help?</Label>
              <textarea 
                name="message" 
                placeholder="We have 500 employees and need..." 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-bold mt-6">
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
