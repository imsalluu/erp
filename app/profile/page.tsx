"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { 
  User, Mail, Phone, 
  MapPin, Calendar, Briefcase,
  Edit2, Camera, Shield,
  Github, Linkedin, Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="space-y-8 pb-20 max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="relative rounded-3xl overflow-hidden border border-border shadow-sm bg-card mt-6">
          <div className="h-40 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/50" />
          <div className="px-8 pb-8">
            <div className="relative -mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-3xl border-4 border-card bg-muted flex items-center justify-center text-4xl font-black text-primary overflow-hidden shadow-xl">
                    JW
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 rounded-xl bg-primary text-white shadow-lg hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center md:text-left mb-2">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-3xl font-black tracking-tight">John Wilson</h2>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 font-black text-[10px] uppercase tracking-widest bg-emerald-50 text-emerald-600 border-emerald-100">
                      Active
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-bold text-sm mt-1">Frontend Architect @ TechStream Solutions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button className="rounded-xl font-bold px-6 shadow-lg shadow-primary/20">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Info & Socials */}
          <div className="space-y-8">
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value="john.wilson@techstream.com" />
                <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value="+1 (555) 123-4567" />
                <InfoItem icon={<MapPin className="h-4 w-4" />} label="Location" value="San Francisco, CA" />
                <InfoItem icon={<Calendar className="h-4 w-4" />} label="Joined" value="Jan 12, 2024" />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Connect</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3">
                <SocialButton icon={<Github className="h-4 w-4" />} />
                <SocialButton icon={<Linkedin className="h-4 w-4" />} />
                <SocialButton icon={<Twitter className="h-4 w-4" />} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: bio, Work etc */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Passionate frontend architect with over 8 years of experience in building enterprise-grade SaaS applications. 
                  Focused on creating high-performance, accessible, and user-centric web experiences using modern technologies 
                  like React, Next.js, and TypeScript.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Work Information</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <InfoItem icon={<Briefcase className="h-4 w-4" />} label="Department" value="Engineering" />
                <InfoItem icon={<Shield className="h-4 w-4" />} label="Role" value="System Admin" />
                <InfoItem icon={<Calendar className="h-4 w-4" />} label="Contract Type" value="Full-Time" />
                <InfoItem icon={<TrendingUp className="h-4 w-4" />} label="Performance" value="Exceeds Expectations" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
      {icon}
    </button>
  );
}

const TrendingUp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
