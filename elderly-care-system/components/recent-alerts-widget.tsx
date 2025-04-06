"use client"

import { AlertCircle, AlertTriangle, Info } from "lucide-react"

// Mock data - in a real application, this would come from your central orchestration layer
const alerts = [
  {
    id: 1,
    type: "info",
    message: "Medication schedule updated by Dr. Priya Sharma",
    time: "2 hours ago",
    source: "Reminder Agent",
  },
  {
    id: 2,
    type: "warning",
    message: "Unusual inactivity detected in the morning",
    time: "5 hours ago",
    source: "Safety Agent",
  },
  {
    id: 3,
    type: "info",
    message: "Blood pressure reading slightly elevated",
    time: "Yesterday",
    source: "Health Agent",
  },
]

export default function RecentAlertsWidget() {
  const getAlertIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-400">Recent Alerts</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3">
            {getAlertIcon(alert.type)}
            <div>
              <p className="text-sm text-white">{alert.message}</p>
              <div className="flex text-xs text-gray-500 mt-1">
                <span>{alert.source}</span>
                <span className="mx-2">•</span>
                <span>{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300 mt-2">View All Alerts</button>
    </div>
  )
}

