"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { SectionHeader } from "@/modules/dashboard/components/dashboard-ui";
import { 
  Shield, Globe, Database, 
  Key, Bell, Activity,
  Save, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function PlatformSettingsPage() {
  return (
    <MainLayout allowedRoles={["SYSTEM_ADMIN"]}>
      <div className="space-y-8 pb-20">
        <SectionHeader 
          title="Global Platform Settings" 
          description="Configure enterprise-wide policies, security defaults, and system infrastructure."
          badge="Root Admin"
        />

        <div className="grid gap-8">
          <Card className="rounded-3xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Global Security Policy
              </CardTitle>
              <CardDescription>Enforce security standards across all tenants.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Minimum Password Length</Label>
                  <Input type="number" defaultValue={12} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (Minutes)</Label>
                  <Input type="number" defaultValue={60} className="rounded-xl" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border/50 pt-4">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Enforce Multi-Factor Authentication (MFA)</Label>
                  <p className="text-xs text-muted-foreground">Require MFA for all administrative accounts across the platform.</p>
                </div>
                <Checkbox defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Infrastructure & Database
              </CardTitle>
              <CardDescription>Monitor and configure global resource allocation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Automatic Backups</Label>
                  <p className="text-xs text-muted-foreground">Daily snapshot of all tenant databases.</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Query Optimization</Label>
                  <p className="text-xs text-muted-foreground">Enable AI-powered database index optimization.</p>
                </div>
                <Checkbox defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="rounded-xl font-bold">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Defaults
            </Button>
            <Button className="rounded-xl font-bold px-8 shadow-lg shadow-primary/20">
              <Save className="h-4 w-4 mr-2" />
              Update Global Settings
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
