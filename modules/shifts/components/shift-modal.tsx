"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Shift = {
  id: string;
  name: string;
  start: string;
  end: string;
  break: string;
  days: string;
  assignedEmployees?: string[];
};

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (shift: Shift) => void;
  shift?: Shift | null;
}

// Convert "09:00 AM" to "09:00" for input[type="time"]
function to24Hour(time12h: string): string {
  if (!time12h) return "";
  const match = time12h.match(/(\d+):(\d+)\s*(AM|PM|am|pm)/);
  if (!match) return time12h; // fallback
  let [_, hours, minutes, modifier] = match;
  modifier = modifier.toUpperCase();
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
  return `${hours.padStart(2, '0')}:${minutes}`;
}

// Convert "14:00" to "02:00 PM"
function to12Hour(time24h: string): string {
  if (!time24h) return "";
  const match = time24h.match(/(\d+):(\d+)/);
  if (!match) return time24h; // fallback
  let [_, hours, minutes] = match;
  let h = parseInt(hours, 10);
  const modifier = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return `${String(h).padStart(2, '0')}:${minutes} ${modifier}`;
}

export function ShiftModal({ isOpen, onClose, onSave, shift }: ShiftModalProps) {
  const [formData, setFormData] = useState<Partial<Shift>>({
    name: "",
    start: "",
    end: "",
    break: "1 Hour",
    days: "Mon - Fri",
  });

  useEffect(() => {
    if (shift) {
      setFormData({
        ...shift,
        start: to24Hour(shift.start),
        end: to24Hour(shift.end),
      });
    } else {
      setFormData({
        name: "",
        start: "",
        end: "",
        break: "1 Hour",
        days: "Mon - Fri",
      });
    }
  }, [shift, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: shift?.id || `S${Date.now()}`,
      name: formData.name || "New Shift",
      start: to12Hour(formData.start || "09:00"),
      end: to12Hour(formData.end || "17:00"),
      break: formData.break || "1 Hour",
      days: formData.days || "Mon - Fri",
      assignedEmployees: shift?.assignedEmployees || [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{shift ? "Edit Shift" : "Create New Shift"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Shift Name</Label>
            <Input
              id="name"
              placeholder="e.g. Early Morning Shift"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Time</Label>
              <Input
                id="start"
                type="time"
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Time</Label>
              <Input
                id="end"
                type="time"
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="break">Break Duration</Label>
              <Input
                id="break"
                placeholder="e.g. 1 Hour"
                value={formData.break}
                onChange={(e) => setFormData({ ...formData, break: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="days">Working Days</Label>
              <Input
                id="days"
                placeholder="e.g. Mon - Fri"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {shift ? "Save Changes" : "Create Shift"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
