"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md space-y-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-2xl bg-rose-500/10 p-6 text-rose-500 shadow-lg shadow-rose-500/10">
            <ShieldAlert size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Access Denied</h1>
          <p className="text-lg text-muted-foreground">
            You don&apos;t have the required permissions to access this module. If you believe this is an error, please contact your system administrator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="w-full sm:w-auto h-12 rounded-xl border-border px-8 font-bold"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button asChild className="w-full sm:w-auto h-12 rounded-xl bg-primary px-8 font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>

        <div className="pt-8 text-xs font-black uppercase tracking-widest text-muted-foreground/30">
          Error Code: 403 Forbidden
        </div>
      </motion.div>
    </div>
  );
}
