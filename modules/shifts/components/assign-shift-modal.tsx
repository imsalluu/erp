"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { REALISTIC_EMPLOYEES } from "@/mock-data/detailed-mock-data";
import { Shift } from "./shift-modal";

interface AssignShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: Shift | null;
  onSave: (shiftId: string, assignedEmployees: string[]) => void;
}

export function AssignShiftModal({ isOpen, onClose, shift, onSave }: AssignShiftModalProps) {
  const [selectedEmps, setSelectedEmps] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (shift && isOpen) {
      setSelectedEmps(new Set(shift.assignedEmployees || []));
    }
  }, [shift, isOpen]);

  const toggleEmployee = (empId: string) => {
    const next = new Set(selectedEmps);
    if (next.has(empId)) {
      next.delete(empId);
    } else {
      next.add(empId);
    }
    setSelectedEmps(next);
  };

  const handleSubmit = () => {
    if (shift) {
      onSave(shift.id, Array.from(selectedEmps));
      onClose();
    }
  };

  if (!shift) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Members to Shift</DialogTitle>
          <DialogDescription>
            Select the employees you want to assign to <strong>{shift.name}</strong> ({shift.start} - {shift.end}).
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
           {/* Replace this manual input checkbox list with proper shadcn checkbox styling */}
          <ScrollArea className="h-[300px] rounded-md border border-border p-4">
            <div className="space-y-4">
              {REALISTIC_EMPLOYEES.map((emp) => (
                <div key={emp.id} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`assign-${emp.id}`} 
                    checked={selectedEmps.has(emp.id)} 
                    onCheckedChange={() => toggleEmployee(emp.id)}
                  />
                  <label 
                    htmlFor={`assign-${emp.id}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {emp.firstName} {emp.lastName}
                    <p className="text-xs text-muted-foreground font-normal mt-1">{emp.designation}</p>
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Assignments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
