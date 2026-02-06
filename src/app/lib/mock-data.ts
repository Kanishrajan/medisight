import { format, subDays } from 'date-fns';

export const DEPARTMENTS = [
  'Cardiology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Emergency',
  'General Medicine',
];

export const HOSPITALS = [
  { id: 'h1', name: 'MediSight Main', city: 'Mumbai', totalBeds: 500, totalICUBeds: 50 },
  { id: 'h2', name: 'MediSight North', city: 'Delhi', totalBeds: 300, totalICUBeds: 30 },
];

export const KPI_TRENDS = Array.from({ length: 30 }).map((_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'MMM dd'),
  occupancy: 70 + Math.random() * 20,
  alos: 4 + Math.random() * 2,
  admissions: Math.floor(20 + Math.random() * 30),
}));

export const DEPT_STATS = DEPARTMENTS.map((dept) => ({
  name: dept,
  occupancy: Math.floor(50 + Math.random() * 45),
  alos: (3 + Math.random() * 5).toFixed(1),
  revenue: Math.floor(50000 + Math.random() * 100000),
}));

export const DOCTOR_UTILIZATION = [
  { name: 'Dr. Sharma', utilization: 85 },
  { name: 'Dr. Gupta', utilization: 92 },
  { name: 'Dr. Patel', utilization: 78 },
  { name: 'Dr. Singh', utilization: 65 },
  { name: 'Dr. Reddy', utilization: 88 },
];

export const PREDICTIVE_ALERTS = [
  {
    id: 'pa1',
    type: 'ICU Bed Shortage',
    severity: 'High',
    message: 'Predicted shortage in 48 hours based on current admission rates.',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pa2',
    type: 'Doctor Overload',
    severity: 'Medium',
    message: 'General Medicine department schedules exceeding 95% capacity for next week.',
    timestamp: new Date().toISOString(),
  },
];

export const RECENT_REPORTS = [
  { id: 'rep1', name: 'Monthly Operations - Jan 2024', type: 'PDF', date: '2024-02-01', size: '2.4 MB' },
  { id: 'rep2', name: 'Financial Summary - Q4 2023', type: 'CSV', date: '2024-01-15', size: '1.1 MB' },
  { id: 'rep3', name: 'Bed Utilization Audit', type: 'PDF', date: '2024-01-10', size: '0.8 MB' },
];