'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Cpu, CheckCircle2, AlertTriangle, PlayCircle, Loader2 } from 'lucide-react';
import { runPredictiveAnalysis } from '@/app/lib/actions';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function PredictionsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePredict = async () => {
    setLoading(true);
    const data = await runPredictiveAnalysis('h1');
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-headline font-bold text-primary">Predictive Resource Analytics</h1>
          <p className="text-muted-foreground">AI-driven forecasting for beds, equipment, and staffing</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <Card className="col-span-1 xl:col-span-2 border-none shadow-md">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-primary" />
                <CardTitle>AI Analysis Engine</CardTitle>
              </div>
              <CardDescription>Run real-time predictive models on current hospital state</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!result && !loading && (
                <div className="text-center py-12">
                  <PlayCircle className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-6">Start a new predictive simulation to identify potential bottlenecks in the next 72 hours.</p>
                  <Button onClick={handlePredict} className="px-8 shadow-lg shadow-primary/20">
                    Execute Analysis Flow
                  </Button>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-medium">Aggregating real-time telemetry...</p>
                  <p className="text-sm text-muted-foreground">Running Genkit Predictive Flow</p>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PredictionResultCard 
                      title="ICU Capacity" 
                      active={result.icuBedShortageAlert} 
                      type="ICU_BED"
                    />
                    <PredictionResultCard 
                      title="Ventilator Supply" 
                      active={result.ventilatorShortageAlert} 
                      type="VENTILATOR"
                    />
                    <PredictionResultCard 
                      title="Staffing Load" 
                      active={result.doctorOverloadAlert} 
                      type="DOCTOR"
                    />
                  </div>
                  
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                    <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" />
                      AI Reasoning
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      "{result.reasoning}"
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={() => setResult(null)}>Clear Analysis</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Active System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertItem 
                severity="High" 
                title="ICU Bed Shortage Predicted" 
                time="2h ago"
                msg="Admission velocity trending +24% above normal capacity."
              />
              <AlertItem 
                severity="Medium" 
                title="Doctor Shift Conflict" 
                time="5h ago"
                msg="Dr. Gupta overlapping surgery in Orthopedics."
              />
              <AlertItem 
                severity="Low" 
                title="Supply Chain Alert" 
                time="1d ago"
                msg="Ventilator filter stocks reaching 15% threshold."
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function PredictionResultCard({ title, active, type }: { title: string, active: boolean, type: string }) {
  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all shadow-sm",
      active ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">{title}</span>
        {active ? (
          <AlertTriangle className="w-4 h-4 text-red-600" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        )}
      </div>
      <div className="text-xl font-bold font-headline">
        {active ? 'Shortage Risk' : 'Capacity Optimal'}
      </div>
      <Badge variant={active ? "destructive" : "secondary"} className="mt-2 text-[10px]">
        {active ? 'CRITICAL' : 'HEALTHY'}
      </Badge>
    </div>
  );
}

function AlertItem({ severity, title, time, msg }: any) {
  const colors = {
    High: 'text-red-600 bg-red-100',
    Medium: 'text-amber-600 bg-amber-100',
    Low: 'text-blue-600 bg-blue-100'
  };

  return (
    <div className="p-3 rounded-lg border border-border bg-card/50 hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", colors[severity as keyof typeof colors])}>
          {severity}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase">{time}</span>
      </div>
      <h4 className="text-sm font-bold mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2">{msg}</p>
    </div>
  );
}