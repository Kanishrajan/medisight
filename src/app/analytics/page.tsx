import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OccupancyChart } from '@/components/dashboard/occupancy-chart';
import { TrendingUp, Activity, BarChart3, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 text-left">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-headline font-bold text-primary">Advanced Analytics</h1>
          </div>
          <p className="text-muted-foreground">Historical data visualization and trend analysis for operational excellence</p>
        </header>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnalyticsMetric icon={Activity} label="Throughput" value="+12.5%" sub="last 30 days" color="text-green-600" />
            <AnalyticsMetric icon={BarChart3} label="Revenue Growth" value="+4.2%" sub="vs projection" color="text-primary" />
            <AnalyticsMetric icon={PieChart} label="Resource Waste" value="-8.1%" sub="optimized" color="text-blue-600" />
          </div>

          <OccupancyChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Patient Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground italic border-2 border-dashed border-border rounded-xl m-4">
                Chart Visualization: Age & Gender Distribution
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Operational Bottlenecks</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground italic border-2 border-dashed border-border rounded-xl m-4">
                Chart Visualization: Wait Times by Department
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function AnalyticsMetric({ icon: Icon, label, value, sub, color }: any) {
  return (
    <Card className="border-none shadow-sm bg-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/5 text-primary">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
            <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
