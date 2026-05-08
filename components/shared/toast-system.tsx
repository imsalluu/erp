"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[110] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={cn(
                "pointer-events-auto flex items-center gap-4 min-w-[320px] max-w-md p-5 rounded-2xl border shadow-2xl backdrop-blur-xl",
                t.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                t.type === "error" ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
                "bg-primary/10 border-primary/20 text-primary"
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-card border border-current/10 flex items-center justify-center shrink-0">
                 {t.type === "success" && <CheckCircle2 className="h-5 w-5" />}
                 {t.type === "error" && <AlertCircle className="h-5 w-5" />}
                 {t.type === "info" && <Info className="h-5 w-5" />}
              </div>
              <p className="flex-1 text-sm font-black italic tracking-tighter leading-tight uppercase tabular-nums">
                {t.message}
              </p>
              <button 
                onClick={() => removeToast(t.id)}
                className="p-1 hover:bg-current/10 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
