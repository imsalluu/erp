"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tenantSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters"),
  sector: z.string().min(2, "Sector/Industry is required"),
  plan: z.enum(["Starter", "Professional", "Enterprise"]),
  adminEmail: z.string().email("Invalid admin email"),
  domain: z.string().min(3, "Subdomain is required"),
});

type TenantFormValues = z.infer<typeof tenantSchema>;

interface ProvisionTenantFormProps {
  onSuccess: () => void;
}

export default function ProvisionTenantForm({ onSuccess }: ProvisionTenantFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TenantFormValues>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      plan: "Professional",
    },
  });

  const onSubmit = async (data: TenantFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Provisioning tenant:", data);
    setIsLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Organization Name</Label>
        <Input id="name" {...register("name")} placeholder="e.g. Acme Corp" />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sector">Industry Sector</Label>
          <Input id="sector" {...register("sector")} placeholder="e.g. Technology" />
          {errors.sector && (
            <p className="text-xs text-red-500">{errors.sector.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="domain">Subdomain</Label>
          <div className="flex items-center">
            <Input id="domain" {...register("domain")} placeholder="acme" className="rounded-r-none" />
            <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-xs font-bold text-muted-foreground">
              .erp.com
            </div>
          </div>
          {errors.domain && (
            <p className="text-xs text-red-500">{errors.domain.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="adminEmail">Primary Admin Email</Label>
        <Input id="adminEmail" type="email" {...register("adminEmail")} placeholder="admin@acme.com" />
        {errors.adminEmail && (
          <p className="text-xs text-red-500">{errors.adminEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="plan">Initial License Plan</Label>
        <Select onValueChange={(value) => setValue("plan", value as any)} defaultValue="Professional">
          <SelectTrigger>
            <SelectValue placeholder="Select plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Starter">Starter</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter className="pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Provisioning..." : "Provision Tenant"}
        </Button>
      </DialogFooter>
    </form>
  );
}
