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
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DEPT_STATS, DOCTOR_UTILIZATION } from './lib/mock-data';
import { getKpiSummary } from './lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function DashboardPage() {
  const kpis = await getKpiSummary();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary">Operations Hub</h1>
            <p className="text-muted-foreground">Live insights across MediSight Mumbai Network</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search metrics..." className="pl-10 bg-card border-none shadow-sm" />
            </div>
            <Button variant="outline" size="icon" className="relative bg-card border-none shadow-sm">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold">
                JD
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <KpiCard 
            title="Bed Occupancy" 
            value={`${kpis.bedOccupancy}%`} 
            icon={Bed} 
            trend={{ value: 2.4, isUp: true }}
            description="vs last week"
          />
          <KpiCard 
            title="Avg. Stay (ALOS)" 
            value={`${kpis.alos} Days`} 
            icon={Clock} 
            trend={{ value: 0.5, isUp: false }}
            description="vs last month"
          />
          <KpiCard 
            title="Admissions" 
            value={kpis.totalAdmissions} 
            icon={Users} 
            trend={{ value: 12, isUp: true }}
            description="today"
          />
          <KpiCard 
            title="Readmission" 
            value={`${kpis.readmissionRate}%`} 
            icon={RotateCcw} 
            trend={{ value: 1.2, isUp: false }}
            description="30-day rate"
          />
          <KpiCard 
            title="Emerge. Ratio" 
            value={`${kpis.emergencyRatio}%`} 
            icon={TrendingUp} 
          />
          <KpiCard 
            title="Cost / Discharge" 
            value={`₹${kpis.costPerDischarge.toLocaleString()}`} 
            icon={IndianRupee} 
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <OccupancyChart />
          
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-headline">Doctor Utilization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {DOCTOR_UTILIZATION.map((doc) => (
                <div key={doc.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{doc.name}</span>
                    <span className="text-muted-foreground">{doc.utilization}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${doc.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <section className="mt-8">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-headline">Departmental Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-4 font-semibold text-muted-foreground text-sm uppercase">Department</th>
                      <th className="pb-4 font-semibold text-muted-foreground text-sm uppercase">Occupancy</th>
                      <th className="pb-4 font-semibold text-muted-foreground text-sm uppercase">Avg Length of Stay</th>
                      <th className="pb-4 font-semibold text-muted-foreground text-sm uppercase">Daily Revenue</th>
                      <th className="pb-4 font-semibold text-muted-foreground text-sm uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {DEPT_STATS.map((dept) => (
                      <tr key={dept.name} className="group hover:bg-primary/5 transition-colors">
                        <td className="py-4 font-medium">{dept.name}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className="h-full bg-accent" style={{ width: `${dept.occupancy}%` }} />
                            </div>
                            <span className="text-sm">{dept.occupancy}%</span>
                          </div>
                        </td>
                        <td className="py-4">{dept.alos} Days</td>
                        <td className="py-4 font-mono">₹{dept.revenue.toLocaleString()}</td>
                        <td className="py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                            dept.occupancy > 85 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                          )}>
                            {dept.occupancy > 85 ? 'Critical' : 'Stable'}
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
      </main>
    </div>
  );
}
