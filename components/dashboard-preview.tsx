"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">ElderCareAI Dashboard</h3>
          <p className="text-sm text-gray-400">Live monitoring and care coordination</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-emerald-500">All systems active</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800 border border-gray-700 w-full justify-start mb-4">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="health" className="data-[state=active]:bg-gray-700">
            Health
          </TabsTrigger>
          <TabsTrigger value="safety" className="data-[state=active]:bg-gray-700">
            Safety
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-gray-700">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-gray-700">
            Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800 border-gray-700 col-span-2">
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-lg font-medium text-white">Daily Activity</h4>
                </div>
                <div className="p-4 h-[300px] flex items-center justify-center">
                  <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Activity chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-white mb-2">Health Status</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Heart Rate</p>
                      <p className="text-2xl font-semibold text-white">
                        72 <span className="text-sm text-gray-400">bpm</span>
                      </p>
                    </div>
                    <div className="bg-emerald-500/20 text-emerald-500 text-xs px-2 py-1 rounded-full">Normal</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-white mb-2">Medication</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400">Next Dose</p>
                      <p className="text-sm text-white">2:00 PM</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400">Compliance</p>
                      <p className="text-sm text-emerald-500">98%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-white mb-2">Location</h4>
                  <p className="text-sm text-gray-400">Current</p>
                  <p className="text-white">Living Room</p>
                  <p className="text-xs text-gray-500 mt-1">Last updated: 2 mins ago</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-lg font-medium text-white">Recent Alerts</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                      <div>
                        <p className="text-white text-sm">Unusual inactivity detected in the morning</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                      <div>
                        <p className="text-white text-sm">Medication schedule updated by Dr. Smith</p>
                        <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                      <div>
                        <p className="text-white text-sm">Blood pressure reading slightly elevated</p>
                        <p className="text-xs text-gray-500">Yesterday, 9:15 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-lg font-medium text-white">Upcoming Events</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Video Call with Family</p>
                        <p className="text-xs text-gray-500">Today, 4:00 PM</p>
                      </div>
                      <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Social</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Doctor's Appointment</p>
                        <p className="text-xs text-gray-500">Tomorrow, 10:30 AM</p>
                      </div>
                      <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Health</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Virtual Book Club</p>
                        <p className="text-xs text-gray-500">Friday, 2:00 PM</p>
                      </div>
                      <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">Social</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-white mb-4">Health Monitoring</h3>
              <p className="text-gray-400">Detailed health data would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be implemented similarly */}
      </Tabs>
    </div>
  )
}

