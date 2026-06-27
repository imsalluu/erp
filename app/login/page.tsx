"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Loader2, Copy } from "lucide-react";
import React from "react";

const DEMO_CREDENTIALS = [
  { role: "System Admin", email: "admin@erp.com", pass: "123456" },
  { role: "Business Owner", email: "owner@erp.com", pass: "123456" },
  { role: "HR", email: "hr@erp.com", pass: "123456" },
  { role: "Project Manager", email: "pm@erp.com", pass: "123456" },
  { role: "Supervisor", email: "supervisor@erp.com", pass: "123456" },
  { role: "Employee", email: "employee@erp.com", pass: "123456" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Try admin@erp.com / 123456");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-background px-4 gap-8 py-12 lg:py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to your ERP + HR Management account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                placeholder="admin@erp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <a href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-red-500"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account? <span className="text-primary cursor-pointer hover:underline">Contact your administrator</span>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-2xl"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Demo Credentials</h2>
          <p className="mt-1 text-sm text-muted-foreground">Click any role to autofill login details</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEMO_CREDENTIALS.map((cred) => (
            <div
              key={cred.role}
              onClick={() => {
                setEmail(cred.email);
                setPassword(cred.pass);
              }}
              className="group p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cred.role}
                </span>
                <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Email: {cred.email}</div>
                <div>Pass: {cred.pass}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
