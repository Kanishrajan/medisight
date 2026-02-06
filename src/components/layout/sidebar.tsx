'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Hospital, 
  Stethoscope, 
  FileText, 
  TrendingUp, 
  ShieldAlert,
  Settings,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Departments', href: '/departments', icon: Hospital },
  { label: 'Doctor Utilization', href: '/doctors', icon: Stethoscope },
  { label: 'Analytics Trends', href: '/analytics', icon: TrendingUp },
  { label: 'Predictive Alerts', href: '/predictions', icon: ShieldAlert },
  { label: 'Reports', href: '/reports', icon: FileText },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-card border-r border-border">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-border bg-primary/5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
          <Activity className="w-5 h-5" />
        </div>
        <span className="font-headline font-bold text-lg text-primary">MediSight</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">Main Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <div className="mt-4 p-3 rounded-xl bg-accent/20 border border-accent/30">
          <p className="text-xs font-semibold text-primary/80 uppercase mb-1">Active Role</p>
          <p className="text-sm font-bold text-primary">Hospital Manager</p>
        </div>
      </div>
    </div>
  );
}