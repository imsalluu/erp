"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { 
  User, Bell, Shield, 
  CreditCard, Globe, Zap,
  Mail, Phone, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  return (
    <MainLayout allowedRoles={["BUSINESS_OWNER"]}>
      <div className="space-y-8 pb-20">
        <SectionHeader 
          title="System Settings" 
          description="Configure your organization preferences, notification rules, and security policies."
        />

        <div className="grid gap-8">
          <Card className="rounded-3xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Organization Profile</CardTitle>
              <CardDescription>Update your company&apos;s public information and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-border/50">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-black">
                  TS
                </div>
                <div>
                  <Button variant="outline" className="rounded-xl font-bold">Change Logo</Button>
                  <p className="text-[10px] text-muted-foreground mt-2 font-medium">SVG, PNG or JPG. Max 2MB.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input defaultValue="TechStream Solutions" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Public Domain</Label>
                  <Input defaultValue="techstream.erp.com" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input defaultValue="contact@techstream.com" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (555) 000-0000" className="rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive daily summaries and critical alerts via email.</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Get real-time updates on task assignments and approvals.</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Monthly Reports</Label>
                  <p className="text-xs text-muted-foreground">Receive automated monthly performance and financial reports.</p>
                </div>
                <Checkbox />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="rounded-xl font-bold">Reset Changes</Button>
            <Button className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20">Save Settings</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
