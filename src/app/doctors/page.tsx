import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DOCTOR_UTILIZATION } from '@/app/lib/mock-data';
import { Stethoscope, UserCheck, Clock, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DoctorsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Stethoscope className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-headline font-bold text-primary">Doctor Utilization</h1>
          </div>
          <p className="text-muted-foreground">Staff availability, workload monitoring, and shift efficiency</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-headline">Workload Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {DOCTOR_UTILIZATION.map((doc) => (
                <div key={doc.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {doc.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-base">{doc.name}</span>
                    </div>
                    <span className="font-mono font-bold text-primary">{doc.utilization}%</span>
                  </div>
                  <Progress value={doc.utilization} className="h-3" />
                  <div className="flex gap-4 text-[10px] text-muted-foreground uppercase font-bold">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8h Shift</span>
                    <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> 12 Patients Today</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-primary text-primary-foreground h-fit">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Shift Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs font-bold opacity-70 uppercase mb-1">Active Staff</p>
                <p className="text-2xl font-bold">42 Doctors</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs font-bold opacity-70 uppercase mb-1">On Call</p>
                <p className="text-2xl font-bold">12 Specialist</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs font-bold opacity-70 uppercase mb-1">Avg Utilization</p>
                <p className="text-2xl font-bold">78.4%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
