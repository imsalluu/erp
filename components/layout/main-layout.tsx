"use client";

import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import ProtectedRoute from "../auth/protected-route";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ToastProvider } from "../shared/toast-system";
import { ModalProvider } from "../shared/modal-provider";

interface MainLayoutProps {
  children: React.ReactNode;
  roleRequired?: string;
}

export default function MainLayout({ children, roleRequired }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <ProtectedRoute roleRequired={roleRequired}>
      <ToastProvider>
        <ModalProvider>
          <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-foreground transition-colors duration-500 overflow-hidden relative">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <div className={cn(
              "flex-1 flex flex-col transition-all duration-500 ease-in-out relative min-w-0 h-screen",
              isSidebarOpen ? "md:pl-72" : "md:pl-20"
            )}>
              <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
              
              <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-12 max-w-[1800px] mx-auto w-full custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </main>

              {/* Advanced Decorative Background Elements */}
              <div className="fixed top-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[160px] pointer-events-none animate-pulse" />
              <div className="fixed bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />
            </div>
          </div>
        </ModalProvider>
      </ToastProvider>
    </ProtectedRoute>
  );
}
