import { User, Tenant, Employee, Attendance, LeaveRequest, Project, Task, KPI } from "../types";

export const MOCK_USERS: Record<string, User> = {
  "admin@erp.com": {
    id: "1",
    name: "System Admin",
    email: "admin@erp.com",
    role: "SYSTEM_ADMIN",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
  "owner@erp.com": {
    id: "2",
    name: "John Doe",
    email: "owner@erp.com",
    role: "BUSINESS_OWNER",
    tenantId: "t1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  "hr@erp.com": {
    id: "3",
    name: "Sarah Smith",
    email: "hr@erp.com",
    role: "HR",
    tenantId: "t1",
    department: "Human Resources",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  "pm@erp.com": {
    id: "4",
    name: "Mike Johnson",
    email: "pm@erp.com",
    role: "PROJECT_MANAGER",
    tenantId: "t1",
    department: "Engineering",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  "supervisor@erp.com": {
    id: "5",
    name: "Emily Davis",
    email: "supervisor@erp.com",
    role: "SUPERVISOR",
    tenantId: "t1",
    department: "Operations",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  "employee@erp.com": {
    id: "6",
    name: "Alex Wilson",
    email: "employee@erp.com",
    role: "EMPLOYEE",
    tenantId: "t1",
    department: "Engineering",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
};

export const MOCK_TENANTS: Tenant[] = [
  {
    id: "t1",
    name: "Global Tech Solutions",
    domain: "globaltech.erp.com",
    plan: "ENTERPRISE",
    status: "ACTIVE",
  },
  {
    id: "t2",
    name: "Creative Agency",
    domain: "creative.erp.com",
    plan: "PREMIUM",
    status: "ACTIVE",
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "emp1",
    firstName: "Alex",
    lastName: "Wilson",
    email: "employee@erp.com",
    phone: "+1234567890",
    role: "EMPLOYEE",
    department: "Engineering",
    designation: "Frontend Developer",
    joinDate: "2024-01-15",
    status: "ACTIVE",
    salary: 85000,
  },
  {
    id: "emp2",
    firstName: "Mike",
    lastName: "Johnson",
    email: "pm@erp.com",
    phone: "+1234567891",
    role: "PROJECT_MANAGER",
    department: "Engineering",
    designation: "Senior Project Manager",
    joinDate: "2023-05-10",
    status: "ACTIVE",
    salary: 110000,
  },
  // Add more mock employees for tables...
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `emp${i + 3}`,
    firstName: ["Robert", "Emma", "David", "Lisa", "James", "Anne"][i % 6],
    lastName: ["Brown", "Miller", "Garcia", "Rodriguez", "Lee", "Wang"][i % 6],
    email: `user${i + 3}@example.com`,
    phone: `+12345678${i + 3}`,
    role: "EMPLOYEE" as const,
    department: ["Engineering", "HR", "Sales", "Marketing", "Finance"][i % 5],
    designation: "Specialist",
    joinDate: "2024-03-20",
    status: (i % 3 === 0 ? "ON_LEAVE" : "ACTIVE") as any,
    salary: 60000 + i * 2000,
  })),
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "ERP Frontend Overhaul",
    description: "Modernizing the ERP dashboard with Next.js 15 and Shadcn UI.",
    managerId: "4",
    status: "IN_PROGRESS",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    budget: 50000,
    progress: 65,
  },
  {
    id: "p2",
    name: "Mobile App Development",
    description: "Creating a cross-platform mobile app for employee self-service.",
    managerId: "4",
    status: "PLANNING",
    startDate: "2026-05-15",
    endDate: "2026-10-15",
    budget: 80000,
    progress: 10,
  },
];

export const MOCK_STATS = [
  { label: "Total Employees", value: "148", change: "+12%", trend: "up" },
  { label: "Attendance Today", value: "92%", change: "-2%", trend: "down" },
  { label: "Project Progress", value: "78%", change: "+5%", trend: "up" },
  { label: "Leaves Pending", value: "8", change: "+1", trend: "up" },
];
