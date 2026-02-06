import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DEPT_STATS } from '@/app/lib/mock-data';
import { cn } from '@/lib/utils';
import { Hospital } from 'lucide-react';
import { SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

export default function DepartmentsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden w-full">
      <DashboardSidebar />
      
      <SidebarInset className="flex-1 overflow-y-auto">
        <header className="p-8 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex items-center gap-4">
          <SidebarTrigger className="text-primary hover:bg-primary/10" />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Hospital className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-headline font-bold text-primary">Departmental Operations</h1>
            </div>
            <p className="text-muted-foreground text-sm">Real-time status and performance metrics for all hospital units</p>
          </div>
        </header>

        <main className="p-8">
          <section className="grid grid-cols-1 gap-8">
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
                        <th className="p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Avg Length of Stay</th>
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
                              <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
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
      </SidebarInset>
    </div>
  );
}
