import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter, Calendar as CalendarIcon, FileSpreadsheet, Plus } from 'lucide-react';
import { RECENT_REPORTS } from '@/app/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary">Automated Reporting</h1>
            <p className="text-muted-foreground">Compliance and performance summaries synced from Firebase Storage</p>
          </div>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Generate New Report
          </Button>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-1 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Filter Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Report Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">Operations</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">Financial</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">Audit</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">AI Forecasts</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="w-3 h-3" /> PDF
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileSpreadsheet className="w-3 h-3" /> CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
              <h3 className="font-bold text-lg mb-2">Next Scheduled</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">The Q1 Comprehensive Operational Audit will auto-generate in 12 days.</p>
              <div className="flex items-center gap-2 text-xs font-medium">
                <CalendarIcon className="w-4 h-4" />
                March 31, 2024
              </div>
            </div>
          </div>

          <Card className="xl:col-span-3 border-none shadow-md overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-card border-b border-border">
              <div>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Archive of generated operations reports</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="w-4 h-4" /> Filter All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {RECENT_REPORTS.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-6 hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                        report.type === 'PDF' ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      )}>
                        {report.type === 'PDF' ? <FileText className="w-6 h-6" /> : <FileSpreadsheet className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{report.name}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1 font-medium">
                            <CalendarIcon className="w-3 h-3" /> {report.date}
                          </span>
                          <span className="font-medium">{report.size}</span>
                          <Badge variant="secondary" className="text-[10px] py-0">{report.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}