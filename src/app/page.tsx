import { DashboardSidebar } from '@/components/layout/sidebar';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { OccupancyChart } from '@/components/dashboard/occupancy-chart';
import { 
  Users, 
  Bed, 
  Clock, 
  RotateCcw, 
  TrendingUp, 
  IndianRupee,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DEPT_STATS, DOCTOR_UTILIZATION } from './lib/mock-data';
import { getKpiSummary } from './lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function DashboardPage() {
  const kpis = await getKpiSummary();

  const kpiData = [
    { title: "Bed Occupancy", value: `${kpis.bedOccupancy}%`, icon: Bed, trend: { value: 2.4, isUp: true }, description: "vs last week" },
    { title: "Avg. Stay (ALOS)", value: `${kpis.alos} Days`, icon: Clock, trend: { value: 0.5, isUp: false }, description: "vs last month" },
    { title: "Admissions", value: kpis.totalAdmissions, icon: Users, trend: { value: 12, isUp: true }, description: "today" },
    { title: "Readmission", value: `${kpis.readmissionRate}%`, icon: RotateCcw, trend: { value: 1.2, isUp: false }, description: "30-day rate" },
    { title: "Emerge. Ratio", value: `${kpis.emergencyRatio}%`, icon: TrendingUp },
    { title: "Cost / Discharge", value: `₹${kpis.costPerDischarge.toLocaleString()}`, icon: IndianRupee },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden w-full">
      <DashboardSidebar />
      
      <SidebarInset className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between p-8 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-primary hover:bg-primary/10" />
            <div>
              <h1 className="text-3xl font-headline font-bold text-primary">Operations Hub</h1>
              <p className="text-muted-foreground text-sm">Live insights across MediSight Mumbai Network</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search metrics..." className="pl-10 bg-card border-none shadow-sm h-10" />
            </div>
            <Button variant="outline" size="icon" className="relative bg-card border-none shadow-sm">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold shadow-sm">
                JD
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Key Performance Indicators</h2>
              <div className="flex gap-2">
                <div className="h-1 w-8 bg-primary rounded-full" />
                <div className="h-1 w-4 bg-muted rounded-full" />
                <div className="h-1 w-4 bg-muted rounded-full" />
              </div>
            </div>
            
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-4">
                {kpiData.map((kpi, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/6">
                    <KpiCard 
                      title={kpi.title} 
                      value={kpi.value} 
                      icon={kpi.icon} 
                      trend={kpi.trend}
                      description={kpi.description}
                      className="h-full hover:scale-[1.02] transition-transform duration-300"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden xl:block">
                <CarouselPrevious className="-left-4 bg-white border-border hover:bg-primary/10" />
                <CarouselNext className="-right-4 bg-white border-border hover:bg-primary/10" />
              </div>
            </Carousel>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <OccupancyChart />
            
            <Card className="border-none shadow-md overflow-hidden bg-white">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-lg font-bold font-headline flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Doctor Utilization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {DOCTOR_UTILIZATION.map((doc) => (
                  <div key={doc.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-foreground">{doc.name}</span>
                      <span className={cn(
                        "font-bold",
                        doc.utilization > 90 ? "text-red-600" : "text-primary"
                      )}>{doc.utilization}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          doc.utilization > 90 ? "bg-red-500" : "bg-primary"
                        )}
                        style={{ width: `${doc.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <section className="mt-8">
            <Card className="border-none shadow-md overflow-hidden bg-white">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-lg font-bold font-headline">Departmental Performance Index</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30 text-left">
                        <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Department</th>
                        <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Occupancy</th>
                        <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Avg Stay</th>
                        <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Daily Revenue</th>
                        <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {DEPT_STATS.map((dept) => (
                        <tr key={dept.name} className="group hover:bg-primary/5 transition-colors">
                          <td className="p-4 font-medium text-foreground">{dept.name}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${dept.occupancy}%` }} />
                              </div>
                              <span className="text-sm font-bold">{dept.occupancy}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm font-medium">{dept.alos} Days</td>
                          <td className="p-4 font-mono text-sm text-primary font-bold">₹{dept.revenue.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                              dept.occupancy > 85 ? "bg-red-100 text-red-700 border border-red-200" : "bg-green-100 text-green-700 border border-green-200"
                            )}>
                              {dept.occupancy > 85 ? 'Critical' : 'Optimal'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </SidebarInset>
    </div>
  );
}
