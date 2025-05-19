import { Suspense } from "react"
import { Activity, Heart, Users, MessageSquare, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HealthMonitoringWidget from "@/components/health-monitoring-widget"
import SafetyStatusWidget from "@/components/safety-status-widget"
import MedicationRemindersWidget from "@/components/medication-reminders-widget"
import CaregiverMessagesWidget from "@/components/caregiver-messages-widget"
import SocialEngagementWidget from "@/components/social-engagement-widget"
import RecentAlertsWidget from "@/components/recent-alerts-widget"
import AgentStatusWidget from "@/components/agent-status-widget"

export default function Dashboard() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-gray-400">Welcome back, Arjun. Here's the latest update for Ramesh Sharma.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-500/20 text-emerald-500 text-xs px-3 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
            All systems active
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
            Overview
          </TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-gray-800">
            Agents
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-800">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gray-800">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium text-white">Health Status</CardTitle>
                <Heart className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
                  <HealthMonitoringWidget />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium text-white">Safety Status</CardTitle>
                <Activity className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
                  <SafetyStatusWidget />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium text-white">Medication Reminders</CardTitle>
                <Clock className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
                  <MedicationRemindersWidget />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium text-white">Caregiver Messages</CardTitle>
                <MessageSquare className="h-5 w-5 text-violet-500" />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
                  <CaregiverMessagesWidget />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium text-white">Social Engagement</CardTitle>
                <Users className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
                  <SocialEngagementWidget />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium text-white">Recent Alerts</CardTitle>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
                  <RecentAlertsWidget />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Agent Status</CardTitle>
              <CardDescription className="text-gray-400">
                Monitor the status and performance of all AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading...</div>}>
                <AgentStatusWidget />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be implemented similarly */}
      </Tabs>
    </main>
  )
}

