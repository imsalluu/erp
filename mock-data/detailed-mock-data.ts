import { Employee, Project, KPI } from "../types";

export const REALISTIC_EMPLOYEES: Employee[] = [
  {
    id: "emp-001",
    firstName: "Alex",
    lastName: "Wilson",
    email: "alex.wilson@globaltech.com",
    phone: "+1 (555) 123-4567",
    role: "EMPLOYEE",
    department: "Engineering",
    designation: "Frontend Architect",
    joinDate: "2024-01-15",
    status: "ACTIVE",
    salary: 95000,
  },
  {
    id: "emp-002",
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarah.smith@globaltech.com",
    phone: "+1 (555) 234-5678",
    role: "HR",
    department: "Human Resources",
    designation: "HR Manager",
    joinDate: "2023-05-10",
    status: "ACTIVE",
    salary: 85000,
  },
  {
    id: "emp-003",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.j@globaltech.com",
    phone: "+1 (555) 345-6789",
    role: "PROJECT_MANAGER",
    department: "Engineering",
    designation: "Senior Project Manager",
    joinDate: "2022-09-20",
    status: "ACTIVE",
    salary: 110000,
  },
  {
    id: "emp-004",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@globaltech.com",
    phone: "+1 (555) 456-7890",
    role: "SUPERVISOR",
    department: "Operations",
    designation: "Operations Lead",
    joinDate: "2023-11-05",
    status: "ACTIVE",
    salary: 75000,
  },
  {
    id: "emp-005",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.b@globaltech.com",
    phone: "+1 (555) 567-8901",
    role: "EMPLOYEE",
    department: "Sales",
    designation: "Account Executive",
    joinDate: "2024-03-01",
    status: "ACTIVE",
    salary: 65000,
  },
  {
    id: "emp-006",
    firstName: "Lisa",
    lastName: "Garcia",
    email: "lisa.g@globaltech.com",
    phone: "+1 (555) 678-9012",
    role: "EMPLOYEE",
    department: "Marketing",
    designation: "Content Strategist",
    joinDate: "2024-02-14",
    status: "ON_LEAVE",
    salary: 70000,
  },
];

export const RECRUITMENT_STAGES = [
  { id: "sourced", name: "Sourced", candidates: 12 },
  { id: "applied", name: "Applied", candidates: 45 },
  { id: "interviewing", name: "In Review", candidates: 8 },
  { id: "interview", name: "Interviews", candidates: 5 },
  { id: "offered", name: "Offered", candidates: 2 },
  { id: "hired", name: "Hired", candidates: 15 },
];

export const CANDIDATES = [
  { id: "can-1", name: "James Wilson", role: "UI Designer", stage: "Interview", rating: 4.5 },
  { id: "can-2", name: "Elena Rodriguez", role: "Backend Dev", stage: "Offered", rating: 4.8 },
  { id: "can-3", name: "Kevin Lee", role: "DevOps Engineer", stage: "In Review", rating: 4.2 },
  { id: "can-4", name: "Anna White", role: "Product Manager", stage: "Interview", rating: 4.6 },
];

export const DEPARTMENTS = [
  { name: "Engineering", count: 42, lead: "Mike Johnson" },
  { name: "Human Resources", count: 8, lead: "Sarah Smith" },
  { name: "Marketing", count: 15, lead: "Jane Doe" },
  { name: "Sales", count: 25, lead: "Robert Brown" },
  { name: "Finance", count: 10, lead: "Sam Lee" },
  { name: "Operations", count: 20, lead: "Emily Davis" },
];

export const ATTENDANCE_STATS = [
  { day: "Mon", present: 95, late: 2, absent: 3 },
  { day: "Tue", present: 92, late: 5, absent: 3 },
  { day: "Wed", present: 98, late: 1, absent: 1 },
  { day: "Thu", present: 90, late: 8, absent: 2 },
  { day: "Fri", present: 94, late: 3, absent: 3 },
];

export const LEAVE_BALANCES = [
  { type: "Annual Leave", total: 20, used: 5, remaining: 15, color: "bg-blue-500" },
  { type: "Sick Leave", total: 10, used: 2, remaining: 8, color: "bg-rose-500" },
  { type: "Casual Leave", total: 12, used: 4, remaining: 8, color: "bg-emerald-500" },
];

export const SHIFTS = [
  { id: "S1", name: "General Shift", start: "09:00 AM", end: "06:00 PM", break: "1 Hour", days: "Mon - Fri" },
  { id: "S2", name: "Morning Shift", start: "06:00 AM", end: "02:00 PM", break: "30 Mins", days: "Mon - Sat" },
  { id: "S3", name: "Night Shift", start: "10:00 PM", end: "06:00 AM", break: "1 Hour", days: "Sun - Thu" },
];

export const PROJECT_STATUSES = ["Planning", "In Progress", "Review", "Completed", "On Hold"] as const;

export const PROJECTS = [
  {
    id: "P1",
    name: "ERP Cloud Migration",
    status: "In Progress",
    progress: 65,
    dueDate: "2026-08-15",
    manager: "Mike Johnson",
    team: REALISTIC_EMPLOYEES.slice(0, 5),
    client: "Global Corp",
    priority: "High",
    description: "Migrating legacy on-premise ERP systems to a modern cloud-native architecture.",
  },
  {
    id: "P2",
    name: "AI Recruitment Bot",
    status: "Planning",
    progress: 15,
    dueDate: "2026-11-01",
    manager: "Sarah Smith",
    team: REALISTIC_EMPLOYEES.slice(5, 10),
    client: "Internal",
    priority: "Medium",
    description: "Developing an AI-driven chatbot to automate candidate screening and interview scheduling.",
  },
  {
    id: "P3",
    name: "Mobile App Redesign",
    status: "Review",
    progress: 90,
    dueDate: "2026-06-01",
    manager: "Emma Wilson",
    team: REALISTIC_EMPLOYEES.slice(10, 15),
    client: "TechStream",
    priority: "High",
    description: "Revamping the user interface and experience of our flagship mobile application.",
  },
];

export const PROJECT_TASKS = [
  { id: "T1", projectId: "P1", title: "Infrastructure Setup", status: "Completed", priority: "High", assignee: REALISTIC_EMPLOYEES[0], dueDate: "2026-04-15" },
  { id: "T2", projectId: "P1", title: "Data Migration Script", status: "In Progress", priority: "High", assignee: REALISTIC_EMPLOYEES[1], dueDate: "2026-05-20" },
  { id: "T3", projectId: "P1", title: "Security Audit", status: "Todo", priority: "Medium", assignee: REALISTIC_EMPLOYEES[2], dueDate: "2026-06-10" },
  { id: "T4", projectId: "P2", title: "Requirement Analysis", status: "Completed", priority: "High", assignee: REALISTIC_EMPLOYEES[5], dueDate: "2026-04-01" },
  { id: "T5", projectId: "P2", title: "NLP Model Training", status: "In Progress", priority: "High", assignee: REALISTIC_EMPLOYEES[6], dueDate: "2026-07-15" },
];

export const ACTIVITY_LOGS = [
  { id: "L1", user: "Mike Johnson", action: "updated status of", target: "ERP Cloud Migration", time: "2 hours ago", type: "project" },
  { id: "L2", user: "Sarah Smith", action: "assigned new task to", target: "AI Recruitment Bot", time: "5 hours ago", type: "task" },
  { id: "L3", user: "Kevin Lee", action: "uploaded a new file to", target: "Mobile App Redesign", time: "Yesterday", type: "file" },
];

export const KPI_METRICS = [
  { id: "K1", name: "Attendance", weight: 20, description: "Punctuality and presence consistency." },
  { id: "K2", name: "Task Completion", weight: 30, description: "Ratio of completed vs assigned tasks." },
  { id: "K3", name: "Productivity", weight: 20, description: "Output quality and volume per sprint." },
  { id: "K4", name: "Collaboration", weight: 15, description: "Peer reviews and team participation." },
  { id: "K5", name: "Communication", weight: 15, description: "Response time and clarity in reporting." },
];

export const EMPLOYEE_KPI_RECORDS = [
  {
    employeeId: "E1",
    scores: [
      { metric: "Attendance", value: 95 },
      { metric: "Task Completion", value: 88 },
      { metric: "Productivity", value: 92 },
      { metric: "Collaboration", value: 90 },
      { metric: "Communication", value: 85 },
    ],
    overall: 90.5,
    lastUpdate: "2026-05-01",
  },
];

export const SUBSCRIPTION_PLANS = [
  { id: "P1", name: "Starter", price: 49, interval: "month", features: ["10 Employees", "Basic Attendance", "Email Support"], recommended: false },
  { id: "P2", name: "Professional", price: 149, interval: "month", features: ["50 Employees", "Advanced Projects", "KPI Tracking", "Priority Support"], recommended: true },
  { id: "P3", name: "Enterprise", price: 499, interval: "month", features: ["Unlimited Employees", "Custom Branding", "Single Sign-On (SSO)", "24/7 Dedicated Support"], recommended: false },
];

export const TENANTS = [
  { id: "T1", name: "TechStream Solutions", sector: "Information Technology", users: 124, status: "Active", plan: "Professional", joined: "2025-01-12" },
  { id: "T2", name: "Global Logistics Co.", sector: "Supply Chain", users: 50, status: "Active", plan: "Starter", joined: "2025-03-05" },
  { id: "T3", name: "Innovative Health", sector: "Healthcare", users: 300, status: "Trialing", plan: "Enterprise", joined: "2026-04-20" },
];

export const PLATFORM_STATS = {
  totalRevenue: 45200,
  activeTenants: 42,
  totalUsers: 1850,
  revenueGrowth: "+12.5%",
  monthlyTraffic: "1.2M",
};
