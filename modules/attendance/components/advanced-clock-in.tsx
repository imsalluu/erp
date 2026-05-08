"use client";

import { useState } from "react";
import { 
  Fingerprint, MapPin, QrCode, ScanFace, 
  Clock, LogIn, LogOut, Loader2, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type AuthMethod = "biometric" | "qr" | "face" | "geo";

export default function AdvancedClockIn() {
  const [method, setMethod] = useState<AuthMethod>("biometric");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsCheckedIn(!isCheckedIn);
    }, 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-xl max-w-xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Daily Attendance</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a verification method to {isCheckedIn ? "Clock Out" : "Clock In"}.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-10">
        <MethodButton 
          active={method === "biometric"} 
          onClick={() => setMethod("biometric")} 
          icon={Fingerprint} 
          label="Bio" 
        />
        <MethodButton 
          active={method === "face"} 
          onClick={() => setMethod("face")} 
          icon={ScanFace} 
          label="Face" 
        />
        <MethodButton 
          active={method === "qr"} 
          onClick={() => setMethod("qr")} 
          icon={QrCode} 
          label="QR" 
        />
        <MethodButton 
          active={method === "geo"} 
          onClick={() => setMethod("geo")} 
          icon={MapPin} 
          label="Geo" 
        />
      </div>

      <div className="relative aspect-square max-w-[280px] mx-auto mb-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="h-20 w-20 text-primary animate-spin" />
              <p className="font-bold text-primary animate-pulse uppercase tracking-[0.2em] text-[10px]">Verifying...</p>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              className="text-emerald-500"
            >
              <CheckCircle2 className="h-24 w-24" />
            </motion.div>
          ) : (
            <motion.button
              key="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAction}
              className={cn(
                "h-52 w-52 rounded-full border-8 transition-all flex flex-col items-center justify-center gap-2 shadow-2xl",
                isCheckedIn 
                  ? "border-rose-500/20 bg-rose-500/10 text-rose-500 shadow-rose-500/20" 
                  : "border-primary/20 bg-primary/10 text-primary shadow-primary/20"
              )}
            >
              {method === "biometric" && <Fingerprint className="h-16 w-16" />}
              {method === "face" && <ScanFace className="h-16 w-16" />}
              {method === "qr" && <QrCode className="h-16 w-16" />}
              {method === "geo" && <MapPin className="h-16 w-16" />}
              <span className="text-xs font-black uppercase tracking-widest mt-2">
                {isCheckedIn ? "Clock Out" : "Clock In"}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Pulse effect while idle */}
        {!isProcessing && !isSuccess && (
           <div className={cn(
             "absolute -z-10 h-64 w-64 rounded-full animate-ping opacity-5",
             isCheckedIn ? "bg-rose-500" : "bg-primary"
           )} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 bg-muted/20 p-6 rounded-2xl border border-border">
         <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</p>
            <p className={cn("text-sm font-bold", isCheckedIn ? "text-rose-500" : "text-emerald-500")}>
              {isCheckedIn ? "Actively Working" : "Off Duty"}
            </p>
         </div>
         <div className="text-center border-l border-border">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Shift</p>
            <p className="text-sm font-bold">General (09:00 - 18:00)</p>
         </div>
      </div>
    </div>
  );
}

function MethodButton({ active, icon: Icon, label, onClick }: { active: boolean; icon: any; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
        active 
          ? "border-primary bg-primary/5 text-primary shadow-sm" 
          : "border-border text-muted-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </button>
  );
}
