// TypeScript interfaces
export interface NavItem {
  label: string;
  href: string;
}

export interface Value {
  icon: string;
  title: string;
  desc: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
  features: string[];
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  icon: string;
  desc: string;
  gradient: string;
  features: string[];
  technologies: string[];
  highlights: string;
  demoUrl?: string;
}

export interface ProductModule {
  icon: string;
  title: string;
  description: string;
}

export interface ProductPortal {
  title: string;
  description?: string;
  features: string[];
}

export interface ProductDetail {
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  modules: ProductModule[];
  portals?: ProductPortal[];
  completeFeatures: string[];
  stats?: { label: string; value: string }[];
}

export interface Project {
  category: string;
  title: string;
  desc: string;
  tech: string[];
  gradient: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  points: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  hours: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "linkedin" | "twitter";
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

// Navigation items (relative paths for React Router)
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Team", href: "/team" },
];

// Footer links
export const footerLinks = {
  main: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
  ] as NavItem[],
  secondary: [
    { label: "Products", href: "/products" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};

// Contact info
export const contactInfo: ContactInfo = {
  email: "hello@infinititechpartners.com",
  location: "Available Worldwide",
  hours: "Mon - Fri: 9AM - 6PM IST",
};

// Social links
export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Twitter", href: "#", icon: "twitter" },
];

// Why Choose Us features
export const whyChooseUs: Feature[] = [
  {
    icon: "rocket",
    title: "Fast Delivery",
    desc: "We deliver projects on time without compromising quality.",
  },
  {
    icon: "shield",
    title: "Secure Solutions",
    desc: "Security-first approach in all our implementations.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    desc: "Cutting-edge technologies and modern approaches.",
  },
  {
    icon: "handshake",
    title: "Partnership",
    desc: "We work as an extension of your team.",
  },
];

// Core values
export const values: Value[] = [
  {
    icon: "zap",
    title: "Our Mission",
    desc: "Empower businesses with cutting-edge technology solutions that drive growth and digital transformation.",
  },
  {
    icon: "telescope",
    title: "Our Vision",
    desc: "Be the most trusted technology partner globally, known for excellence and innovation.",
  },
  {
    icon: "gem",
    title: "Our Values",
    desc: "Integrity, Innovation, Excellence, and Customer-Centricity guide everything we do.",
  },
];

// Company stats
export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 4, suffix: "", label: "Team Members" },
  { value: 10, suffix: "", label: "Services Offered" },
];

// Services
export const services: Service[] = [
  {
    icon: "server",
    title: "Modern Data Center (MDC) Engineering",
    desc: "Resilient, scalable MDC architectures that support mission-critical workloads with zero tolerance for failure.",
    features: ["Infrastructure Design", "Power Management", "Cooling Systems", "High Availability"],
  },
  {
    icon: "git-branch",
    title: "DevOps Engineering",
    desc: "Automated, fast, stable delivery pipelines that ensure teams can develop, deploy, and iterate without friction.",
    features: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration", "Monitoring"],
  },
  {
    icon: "shield",
    title: "DevSecOps & Security Automation",
    desc: "Security embedded into every stage of development, testing, and deployment.",
    features: ["Security Scanning", "Compliance Automation", "Vulnerability Management", "Policy as Code"],
  },
  {
    icon: "lock",
    title: "Cybersecurity & Threat Management",
    desc: "Defend against modern threats using a layered, intelligence-driven approach.",
    features: ["Threat Detection", "Incident Response", "Penetration Testing", "Security Audits"],
  },
  {
    icon: "network",
    title: "Network Architecture & Infrastructure",
    desc: "Fast, reliable, and secure networks capable of supporting heavy loads and distributed operations.",
    features: ["Network Design", "Load Balancing", "SD-WAN", "Network Security"],
  },
  {
    icon: "building-2",
    title: "Smart City & IoT Solutions",
    desc: "Connected systems that improve efficiency, operations, and citizen experience.",
    features: ["Traffic Management", "Smart Lighting", "Environmental Monitoring", "Urban Analytics"],
  },
  {
    icon: "brain",
    title: "AI / Machine Learning Engineering",
    desc: "Intelligent systems that automate decisions, optimize operations, and open new capabilities.",
    features: ["ML Model Development", "Data Pipelines", "Predictive Analytics", "NLP Solutions"],
  },
  {
    icon: "blocks",
    title: "Blockchain & Distributed Systems",
    desc: "Secure, high-performance blockchain applications tailored to business use-cases.",
    features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms", "Enterprise Blockchain"],
  },
  {
    icon: "globe",
    title: "Website Development",
    desc: "Fast, secure, and responsive websites designed for performance, branding, and conversion.",
    features: ["React/Next.js", "Performance Optimization", "SEO", "CMS Integration"],
  },
  {
    icon: "smartphone",
    title: "Mobile App Development",
    desc: "High-performance mobile applications engineered for usability, security, and scale.",
    features: ["React Native", "iOS & Android", "App Store Optimization", "Push Notifications"],
  },
];

// Products
export const products: Product[] = [
  {
    slug: "hrms",
    name: "HRMS",
    tagline: "Human Resource Management System",
    category: "HR / Workforce / Enterprise",
    icon: "users",
    desc: "Comprehensive HRMS with advanced attendance tracking, idle detection, suspicious activity monitoring, payroll processing, and project management.",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    features: ["Attendance Tracking", "Payroll", "Project Management", "Role-based Access"],
    technologies: ["Next.js 15", "Prisma", "PostgreSQL", "JWT Auth", "Tailwind CSS", "Radix UI"],
    highlights: "Dual-heartbeat attendance, bot detection, printable payslips, role-based access",
    demoUrl: "https://hrmsdemo-beta.vercel.app",
  },
  {
    slug: "marketplace",
    name: "Marketplace",
    tagline: "B2B Commodity Trading Platform",
    category: "E-Commerce / Trading / Blockchain",
    icon: "store",
    desc: "Enterprise-grade B2B marketplace for commodity trading with producer management, tokenization, escrow payments, and blockchain integration.",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    features: ["Tokenization", "Escrow Payments", "Blockchain", "Multi-currency"],
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Blockchain", "AWS", "Stripe"],
    highlights: "Multi-role access, tokenization, insurance & hedging modules",
  },
  {
    slug: "accubooks",
    name: "Accubooks",
    tagline: "Enterprise Accounting Platform",
    category: "Finance / ERP / Accounting",
    icon: "calculator",
    desc: "Comprehensive multi-tenant accounting solution with double-entry bookkeeping, inventory management, HR & payroll, GST compliance, and financial reporting.",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    features: ["Double-entry", "Multi-tenant", "Payroll", "Inventory"],
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Zustand", "Recharts", "Zod"],
    highlights: "57 database models, 70+ permissions, full audit trail",
    demoUrl: "https://accubook.infinititechpartners.com",
  },
  {
    slug: "school-erp",
    name: "School ERP",
    tagline: "Complete School Management System",
    category: "Education / ERP / Management",
    icon: "graduation-cap",
    desc: "End-to-end school management platform covering admissions, academics, attendance, fee management, transport, library, and parent communication.",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    features: ["Admissions", "Academics", "Fees", "Transport"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Socket.io", "AWS"],
    highlights: "Multi-branch support, real-time notifications, mobile apps",
    demoUrl: "https://school.infinititechpartners.com",
  },
  {
    slug: "fleet-management",
    name: "Fleet Management",
    tagline: "Enterprise Telematics Platform",
    category: "IoT / Logistics / Telematics",
    icon: "truck",
    desc: "Comprehensive fleet tracking solution with real-time GPS, ELD compliance, driver management, incident tracking, geofencing, and advanced analytics.",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    features: ["GPS Tracking", "ELD Compliance", "Driver Mgmt", "Analytics"],
    technologies: ["Next.js", "Prisma", "Leaflet.js", "Recharts", "NextAuth", "PostgreSQL"],
    highlights: "DOT compliance, 8 user roles, live GPS tracking",
    demoUrl: "https://telematics.infinititechpartners.com",
  },
  {
    slug: "realestate",
    name: "Real Estate",
    tagline: "Property Listing & Management Platform",
    category: "Real Estate / Property / Marketplace",
    icon: "building-2",
    desc: "Advanced real estate platform with property listings, agent management, membership subscriptions, and comprehensive search similar to leading property portals.",
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    features: ["Property Listings", "Agent Management", "Memberships", "Advanced Search"],
    technologies: ["Next.js 16", "Prisma", "PostgreSQL", "NextAuth", "Stripe", "Cloudinary"],
    highlights: "Multi-role access, membership plans, SMS & email integration",
  },
  {
    slug: "drop",
    name: "Drop",
    tagline: "Multi-Sided Delivery & Commerce Platform",
    category: "Food Delivery / Marketplace / Logistics",
    icon: "utensils-crossed",
    desc: "Comprehensive hyperlocal delivery platform for food, groceries, and services with vendor management, rider logistics, party mode, and restaurant management system.",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    features: ["Vendor Management", "Rider Logistics", "Real-time Tracking", "RMS"],
    technologies: ["Next.js 16", "Prisma", "PostgreSQL", "Socket.io", "Razorpay", "Leaflet.js"],
    highlights: "100+ database models, 4 user portals, real-time tracking, RMS built-in",
    demoUrl: "https://drop-three-dun.vercel.app",
  },
  {
    slug: "rideon",
    name: "RideOn",
    tagline: "Complete Ride-Hailing Platform",
    category: "Transportation / Logistics / Mobility",
    icon: "car",
    desc: "Full-featured Uber-like ride-hailing solution with rider/driver mobile apps, admin dashboard, real-time GPS tracking, payments, and driver management.",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    features: ["Mobile Apps", "GPS Tracking", "Payments", "Driver Management"],
    technologies: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Socket.io", "Stripe"],
    highlights: "Mobile apps for iOS/Android, real-time tracking, 22 database models",
    demoUrl: "https://rideon-admin.vercel.app",
  },
];

// Product Details
export const productDetails: ProductDetail[] = [
  {
    slug: "hrms",
    heroTitle: "HRMS Platform",
    heroSubtitle: "Complete Human Resource Management System for modern businesses",
    heroDescription: "Streamline employee management, attendance, payroll, projects, and more—all in one powerful platform",
    modules: [
      { icon: "users", title: "Employee Management", description: "Complete employee profiles with KYC documents, department tracking, reporting hierarchy, and onboarding/offboarding workflows." },
      { icon: "clock", title: "Advanced Attendance", description: "Dual-heartbeat system with idle time detection, real-time activity monitoring, break tracking, and IP address logging." },
      { icon: "shield", title: "Suspicious Activity Detection", description: "Identifies bot/automation tools including mouse jigglers, auto-typers, and macros. Keystroke and mouse pattern analysis." },
      { icon: "trending-up", title: "Payroll Management", description: "Automated salary calculations with component-based structure (Basic, HRA, Medical), tax calculations, and printable payslips." },
      { icon: "briefcase", title: "Project & Task Management", description: "Project creation with milestones, task assignment, Azure DevOps & Asana integrations, and work item synchronization." },
      { icon: "check", title: "Sales CRM", description: "Lead management with pipeline stages, conversion tracking, sales target monitoring, and commission calculations." },
    ],
    portals: [
      { title: "Admin Portal", description: "Complete control over the entire organization", features: ["Manage all employees and departments", "Process payroll and generate payslips", "Track attendance and approve leaves", "Manage projects and tasks", "Financial reporting and analytics"] },
      { title: "Manager Portal", description: "Oversee your team and projects effectively", features: ["View team attendance and performance", "Approve/reject leave requests", "Assign and track project tasks", "Monitor team productivity", "Access team reports"] },
      { title: "Employee Portal", description: "Self-service portal for day-to-day tasks", features: ["Mark daily attendance", "Apply for leaves", "View payslips and salary details", "Track assigned tasks", "Update personal information"] },
    ],
    completeFeatures: ["Employee Onboarding", "Attendance Tracking", "Leave Management", "Payroll Processing", "Project Management", "Task Assignment", "Sales CRM", "Expense Tracking", "Document Management", "Role-based Access", "Audit Logging", "Report Generation"],
  },
  {
    slug: "accubooks",
    heroTitle: "Accubooks",
    heroSubtitle: "Enterprise Accounting Platform",
    heroDescription: "A comprehensive multi-tenant accounting solution built for modern businesses with double-entry bookkeeping, inventory, HR & payroll, and GST compliance",
    modules: [
      { icon: "briefcase", title: "Chart of Accounts", description: "Complete ledger management with hierarchical groups, opening balances, and multi-level account structure." },
      { icon: "check", title: "Voucher Management", description: "Double-entry journal system with payment, receipt, contra, and journal vouchers with auto-numbering." },
      { icon: "trending-up", title: "Financial Reports", description: "Profit & Loss, Balance Sheet, Cash Flow, Trial Balance, and Aging reports with drill-down." },
      { icon: "building-2", title: "Inventory Control", description: "Multi-warehouse stock management with batch tracking, FIFO/LIFO/Weighted Average valuation." },
      { icon: "users", title: "HR & Payroll", description: "Employee management, attendance tracking, leave management, salary structures, and payslip generation." },
      { icon: "shield", title: "GST & Taxation", description: "Indian GST compliance with GSTR-1, GSTR-3B filing, TDS/TCS management, and tax reports." },
    ],
    completeFeatures: ["Double-entry Bookkeeping", "Multi-tenant Architecture", "Chart of Accounts", "Voucher Management", "Sales & Purchase Invoices", "Inventory Management", "HR & Payroll", "GST Compliance", "Financial Reports", "Bank Reconciliation", "Audit Trail", "Role-based Access"],
    stats: [{ label: "Database Models", value: "57" }, { label: "API Endpoints", value: "50+" }, { label: "Permissions", value: "70+" }, { label: "Report Types", value: "15+" }],
  },
  {
    slug: "school-erp",
    heroTitle: "School ERP",
    heroSubtitle: "Complete School Management System",
    heroDescription: "End-to-end school management platform that streamlines every aspect of educational institution operations",
    modules: [
      { icon: "users", title: "Student Management", description: "Complete student lifecycle from admission to alumni. Profiles, documents, academic history, and family information." },
      { icon: "briefcase", title: "Academic Management", description: "Class scheduling, subject allocation, exam management, grading system, and report card generation." },
      { icon: "clock", title: "Attendance System", description: "Daily attendance tracking with biometric/RFID integration, leave management, and automated parent alerts." },
      { icon: "check", title: "Fee Management", description: "Fee structure setup, invoice generation, payment gateway integration, and receipt management." },
      { icon: "truck", title: "Transport Management", description: "Route planning, vehicle tracking, driver management, and pickup/drop notifications." },
      { icon: "zap", title: "Communication Hub", description: "SMS, email, and push notifications for parents. Announcements, circulars, and event updates." },
    ],
    portals: [
      { title: "Admin Portal", features: ["Complete system configuration", "User management", "Reports & analytics", "Fee structure management", "Staff management"] },
      { title: "Teacher Portal", features: ["Class management", "Attendance marking", "Grade entry", "Assignment creation", "Student progress tracking"] },
      { title: "Parent Portal", features: ["Child's attendance & grades", "Fee payment", "Communication with teachers", "Event calendar", "Transport tracking"] },
      { title: "Student Portal", features: ["Timetable view", "Assignment submission", "Exam results", "Library access", "Notifications"] },
    ],
    completeFeatures: ["Multi-branch Support", "Online Admission Portal", "Document Management", "Timetable Scheduler", "Exam & Grade Management", "Report Card Generator", "Library Management", "Hostel Management", "Inventory & Assets", "HR & Payroll for Staff", "Online Fee Payment", "Mobile Apps (iOS & Android)"],
    stats: [{ label: "User Roles", value: "10+" }, { label: "Modules", value: "25+" }, { label: "Reports", value: "50+" }, { label: "API Endpoints", value: "100+" }],
  },
  {
    slug: "fleet-management",
    heroTitle: "Fleet Management",
    heroSubtitle: "Enterprise Telematics Platform",
    heroDescription: "Comprehensive, enterprise-grade telematics platform designed for fleet management companies with DOT-compliant ELD",
    modules: [
      { icon: "map-pin", title: "Live GPS Tracking", description: "Real-time vehicle positions on interactive maps with speed, heading, and driver assignment visibility." },
      { icon: "clock", title: "ELD Compliance", description: "DOT-compliant Hours of Service tracking with 11-hour driving limit, break requirements, and violation alerts." },
      { icon: "users", title: "Driver Management", description: "Complete driver profiles with CDL tracking, medical certification, safety scores, and trip statistics." },
      { icon: "zap", title: "Incident Management", description: "Accident/breakdown reporting with severity classification, status workflow, and video evidence linking." },
      { icon: "shield", title: "Geofencing", description: "Circle and polygon zone creation with entry/exit alerts, color-coded visualization, and alert history." },
      { icon: "trending-up", title: "Analytics Dashboard", description: "Trip statistics, fuel efficiency metrics, driver performance rankings, and fleet utilization reports." },
    ],
    completeFeatures: ["Vehicle Management", "IoT Device Assignment", "Odometer Tracking", "Service Scheduling", "Real-time GPS", "Interactive Map Dashboard", "Geofence Management", "Entry/Exit Alerts", "Driver Profiles", "CDL Expiry Alerts", "Safety Score Calculation", "Trip Statistics", "Incident Reporting", "Fuel Efficiency Metrics", "Fleet Utilization Reports"],
    stats: [{ label: "Database Models", value: "20+" }, { label: "User Roles", value: "8" }, { label: "API Endpoints", value: "30+" }, { label: "ELD Rules", value: "4" }],
  },
  {
    slug: "drop",
    heroTitle: "Drop Platform",
    heroSubtitle: "Multi-Sided Delivery & Commerce Platform",
    heroDescription: "Complete hyperlocal marketplace for food, groceries, alcohol, and services—with dedicated portals for customers, vendors, riders, and admins",
    modules: [
      { icon: "store", title: "Multi-Vendor Marketplace", description: "Support restaurants, grocery stores, pharmacies, wine shops, and more. Complete vendor onboarding and management." },
      { icon: "map-pin", title: "Real-Time Tracking", description: "Live GPS tracking for deliveries with Socket.io, rider location updates, and accurate ETA calculations." },
      { icon: "users", title: "Party Mode", description: "Collaborative group ordering with split billing (equal, by item, by seat, custom), shared carts, and party scheduling." },
      { icon: "check", title: "Advanced Payments", description: "Razorpay integration with cards, UPI, wallets, COD, and gift cards. Subscription plans and loyalty points." },
      { icon: "truck", title: "Rider Management", description: "Complete rider portal with earnings tracking, document verification, zone assignments, and performance analytics." },
      { icon: "zap", title: "Smart Notifications", description: "Push, email, and SMS notifications via Twilio and SendGrid. Real-time order updates and promotional campaigns." },
    ],
    portals: [
      { title: "Customer Portal", description: "Complete shopping experience for end users", features: ["Browse restaurants, grocery, pharmacy", "Real-time order tracking with GPS", "Multiple payment methods and wallet", "Party mode for group orders", "Loyalty points and subscriptions"] },
      { title: "Vendor Portal", description: "Powerful tools for merchants", features: ["Order management", "Menu and product management", "Multi-outlet support", "Inventory tracking", "Kitchen Display System (KDS)"] },
      { title: "Rider Portal", description: "Efficient delivery management", features: ["Accept/reject deliveries", "GPS navigation", "Earnings tracking", "Document verification", "Performance metrics"] },
      { title: "Admin Dashboard", description: "Complete platform control", features: ["Real-time metrics", "Vendor/rider approval", "Zone and pricing config", "Marketing campaigns", "Financial reports"] },
    ],
    completeFeatures: ["Multi-Vendor Support", "Real-time Tracking", "Party Mode", "Split Billing", "Razorpay Integration", "Wallet System", "Loyalty Points", "Genie Service", "Zone Pricing", "Surge Pricing", "Kitchen Display", "Inventory Control", "Staff Management", "Push Notifications", "SMS & Email Alerts"],
    stats: [{ label: "Database Models", value: "100+" }, { label: "User Portals", value: "4" }, { label: "Payment Methods", value: "5+" }, { label: "Notification Types", value: "3" }],
  },
  {
    slug: "rideon",
    heroTitle: "RideOn Platform",
    heroSubtitle: "Complete Ride-Hailing Solution",
    heroDescription: "Launch your own Uber-like service with mobile apps for riders and drivers, real-time tracking, payments, and a powerful admin dashboard",
    modules: [
      { icon: "map-pin", title: "Real-Time GPS Tracking", description: "Live driver location streaming with accurate ETAs, route visualization, and geospatial queries powered by PostGIS." },
      { icon: "smartphone", title: "Native Mobile Apps", description: "React Native apps for both riders and drivers with Expo, supporting iOS and Android with push notifications." },
      { icon: "check", title: "Stripe Payments", description: "Secure payment processing with card tokenization, 3D Secure, multiple payment methods, and automatic refunds." },
      { icon: "users", title: "Driver Management", description: "Complete driver lifecycle from onboarding to payouts. Document verification, performance tracking, and earnings management." },
      { icon: "zap", title: "Smart Notifications", description: "Push notifications for mobile apps, email via SendGrid, and SMS via Twilio. Real-time ride status updates." },
      { icon: "trending-up", title: "Surge Pricing", description: "Dynamic pricing based on demand with manual and automatic surge controls. Zone-based pricing configuration." },
    ],
    portals: [
      { title: "Rider Mobile App", description: "React Native / Expo", features: ["One-tap ride booking", "Real-time driver tracking", "Fare estimation", "Multiple payment methods", "Trip history and receipts"] },
      { title: "Driver Mobile App", description: "React Native / Expo", features: ["Accept/decline requests", "Turn-by-turn navigation", "Earnings tracking", "Online/offline toggle", "Document management"] },
      { title: "Admin Dashboard", description: "Next.js", features: ["Real-time metrics", "Driver verification", "Trip monitoring", "Pricing config", "Support tickets"] },
      { title: "Backend API", description: "Node.js / Express", features: ["22 database models", "Socket.io real-time", "Stripe integration", "PostGIS geospatial", "Redis caching"] },
    ],
    completeFeatures: ["Rider Mobile App", "Driver Mobile App", "Web Booking", "Admin Dashboard", "Real-time Tracking", "Stripe Payments", "Driver Verification", "Surge Pricing", "Promo Codes", "Support System", "Push Notifications", "Email & SMS Alerts"],
    stats: [{ label: "Database Models", value: "22" }, { label: "Mobile Apps", value: "2" }, { label: "Web Apps", value: "3" }, { label: "Real-time Events", value: "10+" }],
  },
];

// Portfolio projects
export const projects: Project[] = [
  {
    category: "Smart City",
    title: "Smart City Dashboard",
    desc: "Real-time urban monitoring system for efficient city management",
    tech: ["React", "Node.js", "IoT"],
    gradient: "linear-gradient(135deg, #00ffcc 0%, #00ccff 100%)",
  },
  {
    category: "Enterprise Software",
    title: "Enterprise CRM Platform",
    desc: "Custom CRM solution for manufacturing industry",
    tech: ["Next.js", "PostgreSQL", "Redis"],
    gradient: "linear-gradient(135deg, #ff6b35 0%, #ff9f1c 100%)",
  },
  {
    category: "Data Center",
    title: "Data Center Monitor",
    desc: "Comprehensive MDC management dashboard",
    tech: ["Vue.js", "Python", "Docker"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
];

// Development process
export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    desc: "We get on a Teams call to understand your business module, end users, user personas, and your unique value proposition.",
    points: ["Business Analysis", "User Research", "Problem Definition", "USP Identification"],
  },
  {
    num: "02",
    title: "Scope of Work",
    desc: "Comprehensive project planning with clear timelines, milestones, and success criteria.",
    points: ["Timeline Planning", "Milestone Definition", "Acceptance Criteria", "Tech Stack"],
  },
  {
    num: "03",
    title: "Design",
    desc: "Iterative design process ensuring your vision comes to life perfectly.",
    points: ["UI/UX Design", "Prototype Creation", "Design Reviews", "Final Approval"],
  },
  {
    num: "04",
    title: "Development",
    desc: "Agile development with regular updates and quality assurance at every step.",
    points: ["Sprint Planning", "CI/CD", "Code Reviews", "Testing"],
  },
  {
    num: "05",
    title: "Deployment",
    desc: "Smooth launch and ongoing support to ensure your success.",
    points: ["Production Deploy", "Monitoring", "Training", "Maintenance"],
  },
];

// Team members
export const team: TeamMember[] = [
  { name: "Sudipto Mitra", role: "Founder & Lead Developer", avatar: "SM" },
  { name: "Pallabi Datta", role: "HR Manager", avatar: "PD" },
  { name: "Snehendu Roy", role: "Full-stack MERN Developer", avatar: "SR" },
  { name: "Soumyadip Chanda", role: "AI/ML Developer", avatar: "SC" },
];

// About page content
export interface AboutClientReason {
  text: string;
}

export const aboutFounderStory = [
  `Infiniti Tech Partners was founded by <span class="text-primary font-semibold">Sudipto</span>, a technologist who has spent his career inside the engine rooms of enterprise systems — building architectures, securing environments, scaling platforms, and leading high-impact technology transformations. Over the years, he worked across modernization, cloud engineering, cybersecurity, networking, and automation, eventually developing a reputation for solving problems that other teams labeled <span class="text-primary font-semibold">"too complex."</span>`,
  `Infiniti Tech Partners grew from that mindset: <span class="font-semibold text-white">engineering-first, execution-driven</span>, and built for organizations that expect reliability, speed, and long-term scalability.`,
];

export const aboutServicesExpanded: string[] = [
  "DevOps & DevSecOps engineering",
  "Cybersecurity operations and security automation",
  "Advanced networking & infrastructure architecture",
  "Smart city systems and IoT-driven deployments",
  "AI/ML-powered automation and intelligent decisioning",
  "Blockchain development & secure distributed systems",
  "High-performance websites and mobile applications",
];

export const aboutOperatingPrinciples: string[] = [
  "An engineering-heavy delivery model",
  "Strong security discipline",
  "Rapid deployment frameworks",
  "Vendor-agnostic solutions",
  "Rigorous testing and optimization cycles",
];

export const aboutClientReasons: AboutClientReason[] = [
  { text: "Deep technical capability across modern, emerging, and enterprise tech" },
  { text: "Architecture frameworks built for security, automation, and uptime" },
  { text: "Ability to take end-to-end ownership — from design to deployment to maintenance" },
  { text: "Experience across cloud providers, complex networks, and multi-vendor infrastructure" },
  { text: "A team that responds fast, executes cleanly, and understands real operational constraints" },
];

export const aboutMotto = "Build systems that last, secure them by design, automate everything possible, and keep scaling forward.";

export const aboutVision = "To engineer the systems that power the next generation of digital infrastructure—secure, automated, intelligent, and built for scale.";

export const aboutCommitment = "We don't sell shortcuts. We deliver systems engineered with precision, built to perform, and designed to evolve as your business grows.";

export const aboutClosingStatement = "Infiniti Tech Partners exists for companies that want their technology to be an advantage, not a liability.";
