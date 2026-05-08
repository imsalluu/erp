export type Role =
  | "SYSTEM_ADMIN"
  | "BUSINESS_OWNER"
  | "HR"
  | "PROJECT_MANAGER"
  | "SUPERVISOR"
  | "EMPLOYEE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  tenantId?: string;
  department?: string;
  designation?: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: "BASIC" | "PREMIUM" | "ENTERPRISE";
  status: "ACTIVE" | "INACTIVE";
  logo?: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  department: string;
  designation: string;
  joinDate: string;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
  salary: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE";
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: "ANNUAL" | "SICK" | "MATERNITY" | "PATERNITY" | "UNPAID";
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
  startDate: string;
  endDate: string;
  budget: number;
  progress: number; // 0-100
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assignedTo: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  dueDate: string;
}

export interface KPI {
  id: string;
  employeeId: string;
  period: string; // e.g. "2026-Q1"
  score: number; // 0-100
  feedback: string;
  reviewerId: string;
}
