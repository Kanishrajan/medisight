import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DEPT_STATS } from '@/app/lib/mock-data';
import { cn } from '@/lib/utils';
import { Hospital } from 'lucide-react';

export default function DepartmentsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Hospital className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-headline font-bold text-primary">Departmental Operations</h1>
          </div>
          <p className="text-muted-foreground">Real-time status and performance metrics for all hospital units</p>
        </header>

        <section className="grid grid-cols-1 gap-8">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-headline">Departmental Performance Index</CardTitle>
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
