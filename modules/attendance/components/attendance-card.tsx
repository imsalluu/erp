"use client";

import { useState, useEffect } from "react";
import { Clock, Fingerprint, LogIn, LogOut, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AttendanceCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(!checkedIn);
    setCheckInTime(checkedIn ? null : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Clock className="h-24 w-24" />
      </div>
      
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tighter tabular-nums">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-[240px]">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckIn}
            className={cn(
              "group relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-all border-4",
              checkedIn 
                ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-rose-500/20" 
                : "bg-primary/10 border-primary text-primary shadow-primary/20 hover:bg-primary hover:text-white"
            )}
          >
            {checkedIn ? <LogOut className="h-8 w-8" /> : <Fingerprint className="h-8 w-8" />}
          </motion.button>
          
          <div className="text-center">
            <p className="text-sm font-semibold">
              {checkedIn ? "Check Out" : "Check In"}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
              <MapPin className="h-3 w-3" />
              Office Hub • Floor 2
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 w-full border-t border-border pt-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Check In</p>
            <p className="text-sm font-bold mt-1">{checkInTime || "--:--"}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Duration</p>
            <p className="text-sm font-bold mt-1">{checkedIn ? "Actively Working" : "00:00"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
