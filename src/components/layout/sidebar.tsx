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
  Activity,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from '@/components/ui/sidebar';

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
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="h-16 border-b border-border bg-primary/5 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-lg text-primary truncate group-data-[collapsible=icon]:hidden">
            MediSight
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest group-data-[collapsible=icon]:hidden">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "transition-all duration-200",
                        isActive 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link
                href="/settings"
                className="text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 p-3 rounded-xl bg-accent/20 border border-accent/30 group-data-[collapsible=icon]:hidden">
          <p className="text-xs font-semibold text-primary/80 uppercase mb-1">Role</p>
          <p className="text-sm font-bold text-primary truncate">Hospital Manager</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
