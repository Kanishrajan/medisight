import { DashboardSidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Lock, Shield, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-headline font-bold text-primary">System Settings</h1>
          </div>
          <p className="text-muted-foreground">Configure dashboard preferences, alerts, and security</p>
        </header>

        <div className="max-w-4xl space-y-8">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>Manage your administrator profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue="j.doe@medisight.com" />
                </div>
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Configure how you receive critical resource alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Critical Bed Shortage</Label>
                  <p className="text-sm text-muted-foreground">Receive instant alerts when occupancy exceeds 90%</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Staffing Overload</Label>
                  <p className="text-sm text-muted-foreground">Alert when doctor utilization trends above 95%</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Report Digest</Label>
                  <p className="text-sm text-muted-foreground">Email summary of weekly hospital performance</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                <CardTitle>Security & Access</CardTitle>
              </div>
              <CardDescription>Manage password and multi-factor authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="gap-2">
                <Shield className="w-4 h-4" />
                Enable 2FA
              </Button>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">Reset Password</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
