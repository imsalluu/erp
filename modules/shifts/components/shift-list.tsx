"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Plus, Settings2, Trash2, Edit2, Users } from "lucide-react";
import { SHIFTS } from "@/mock-data/detailed-mock-data";
import { ShiftModal, Shift } from "./shift-modal";
import { AssignShiftModal } from "./assign-shift-modal";

export default function ShiftList() {
  const [shifts, setShifts] = useState<Shift[]>(SHIFTS.map(s => ({...s, assignedEmployees: []})));
  
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningShift, setAssigningShift] = useState<Shift | null>(null);

  const handleCreateOrEditShift = (savedShift: Shift) => {
    if (editingShift) {
      setShifts(shifts.map(s => s.id === savedShift.id ? savedShift : s));
    } else {
      setShifts([...shifts, savedShift]);
    }
    setIsShiftModalOpen(false);
    setEditingShift(null);
  };

  const handleDeleteShift = (id: string) => {
    if (confirm("Are you sure you want to delete this shift?")) {
      setShifts(shifts.filter(s => s.id !== id));
    }
  };

  const handleAssignShift = (shiftId: string, assignedEmployees: string[]) => {
    setShifts(shifts.map(s => s.id === shiftId ? { ...s, assignedEmployees } : s));
  };

  const openEdit = (shift: Shift) => {
    setEditingShift(shift);
    setIsShiftModalOpen(true);
  };

  const openCreate = () => {
    setEditingShift(null);
    setIsShiftModalOpen(true);
  };

  const openAssign = (shift: Shift) => {
    setAssigningShift(shift);
    setIsAssignModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="font-bold text-lg tracking-tight">Active Shifts</h3>
         <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all">
            <Plus className="h-4 w-4" />
            Create New Shift
         </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
        {shifts.map((shift, i) => (
          <motion.div
            key={shift.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Clock className="h-5 w-5" />
                 </div>
                 <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(shift)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-all"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => handleDeleteShift(shift.id)} className="p-1.5 rounded-lg hover:bg-muted text-rose-500 transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                 </div>
              </div>

              <div className="mt-4">
                 <h4 className="font-bold text-base tracking-tight">{shift.name}</h4>
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{shift.days}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                 <div className="space-y-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Timing</p>
                    <p className="text-xs font-bold">{shift.start} - {shift.end}</p>
                 </div>
                 <div className="text-right space-y-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase">Break</p>
                    <p className="text-xs font-bold">{shift.break}</p>
                 </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between flex-shrink-0">
               <div className="flex -space-x-2">
                 {shift.assignedEmployees && shift.assignedEmployees.length > 0 ? (
                    <>
                      {Array.from({ length: Math.min(3, shift.assignedEmployees.length) }).map((_, j) => (
                          <div key={j} className="h-7 w-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                             <Users className="h-3 w-3 text-muted-foreground" />
                          </div>
                      ))}
                      {shift.assignedEmployees.length > 3 && (
                        <div className="h-7 w-7 rounded-full border-2 border-card bg-primary text-white flex items-center justify-center text-[10px] font-bold relative z-10">
                           +{shift.assignedEmployees.length - 3}
                        </div>
                      )}
                    </>
                 ) : (
                    <div className="text-[10px] font-medium text-muted-foreground mt-1 tracking-tight">Unassigned</div>
                 )}
               </div>
               <button onClick={() => openAssign(shift)} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-2 transition-all">
                  Assign Shift
                  <Settings2 className="h-3.5 w-3.5" />
               </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      <ShiftModal
        isOpen={isShiftModalOpen}
        onClose={() => { setIsShiftModalOpen(false); setEditingShift(null); }}
        onSave={handleCreateOrEditShift}
        shift={editingShift}
      />

      <AssignShiftModal
        isOpen={isAssignModalOpen}
        onClose={() => { setIsAssignModalOpen(false); setAssigningShift(null); }}
        shift={assigningShift}
        onSave={handleAssignShift}
      />
    </div>
  );
}
