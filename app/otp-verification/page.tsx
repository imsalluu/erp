"use client";

import { useState } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useNextRouter();

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/reset-password");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Verify OTP</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ve sent a code to your email. Enter it below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="h-12 w-12 rounded-xl border border-border bg-background text-foreground text-center text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.some(v => v === "")}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify Code"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
