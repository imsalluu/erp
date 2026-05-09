import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6 relative">
       <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-5xl font-black tracking-tight">The <span className="text-primary">WorkSync</span> Blog</h1>
        
        <div className="grid gap-6 mt-12">
           <div className="p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <span className="text-sm font-bold text-primary tracking-widest uppercase mb-2 block">Product Updates</span>
              <h2 className="text-3xl font-bold mb-4">Introducing True Multi-Tenant Architecture</h2>
              <p className="text-muted-foreground mb-6">How we engineered our entire database overlay to support thousands of logically isolated companies running on the same core.</p>
              <span className="text-sm font-medium">Read Article &rarr;</span>
           </div>
           
           <div className="p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition">
              <span className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-2 block">Strategy</span>
              <h2 className="text-3xl font-bold mb-4">Why separating HR and PM tools is killing your efficiency</h2>
              <p className="text-muted-foreground mb-6">If your project managers cannot immediately see if an assignee is clocked in, you are losing money.</p>
              <span className="text-sm font-medium">Read Article &rarr;</span>
           </div>
        </div>
      </div>
    </div>
  );
}
