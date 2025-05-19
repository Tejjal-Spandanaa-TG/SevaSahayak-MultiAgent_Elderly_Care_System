"use client"

import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"

// Mock data - in a real application, this would come from your safety agent
const safetyStatus = {
  overall: "safe", // 'safe', 'warning', 'alert'
  lastActivity: "10 minutes ago",
  location: "Living Room",
  motionDetected: true,
  doorStatus: "closed",
  windowStatus: "closed",
}

export default function SafetyStatusWidget() {
  const getStatusIcon = () => {
    switch (safetyStatus.overall) {
      case "safe":
        return <ShieldCheck className="h-12 w-12 text-emerald-500" />
      case "warning":
        return <Shield className="h-12 w-12 text-amber-500" />
      case "alert":
        return <ShieldAlert className="h-12 w-12 text-red-500" />
      default:
        return <Shield className="h-12 w-12 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (safetyStatus.overall) {
      case "safe":
        return "All systems normal"
      case "warning":
        return "Potential concern detected"
      case "alert":
        return "Immediate attention required"
      default:
        return "Status unknown"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {getStatusIcon()}
        <div>
          <h3 className="text-lg font-medium text-white">
            {safetyStatus.overall === "safe" ? "Safe" : safetyStatus.overall === "warning" ? "Warning" : "Alert"}
          </h3>
          <p className="text-sm text-gray-400">{getStatusText()}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Last Activity</span>
          <span className="text-sm text-white">{safetyStatus.lastActivity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Location</span>
          <span className="text-sm text-white">{safetyStatus.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Motion</span>
          <span className="text-sm text-white">{safetyStatus.motionDetected ? "Detected" : "None"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Doors</span>
          <span className="text-sm text-white capitalize">{safetyStatus.doorStatus}</span>
        </div>
      </div>
    </div>
  )
}

