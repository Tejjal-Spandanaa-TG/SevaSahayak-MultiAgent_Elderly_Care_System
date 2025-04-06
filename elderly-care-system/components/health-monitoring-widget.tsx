"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data - in a real application, this would come from your health monitoring agent
const healthData = [
  { time: "00:00", heartRate: 68, bloodPressure: 120, temperature: 36.6 },
  { time: "04:00", heartRate: 65, bloodPressure: 118, temperature: 36.5 },
  { time: "08:00", heartRate: 72, bloodPressure: 122, temperature: 36.7 },
  { time: "12:00", heartRate: 75, bloodPressure: 125, temperature: 36.8 },
  { time: "16:00", heartRate: 73, bloodPressure: 123, temperature: 36.7 },
  { time: "20:00", heartRate: 70, bloodPressure: 121, temperature: 36.6 },
]

export default function HealthMonitoringWidget() {
  const [metric, setMetric] = useState("heartRate")

  const metrics = {
    heartRate: { name: "Heart Rate", color: "#ef4444", unit: "bpm" },
    bloodPressure: { name: "Blood Pressure", color: "#3b82f6", unit: "mmHg" },
    temperature: { name: "Temperature", color: "#10b981", unit: "°C" },
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {Object.entries(metrics).map(([key, { name }]) => (
          <button
            key={key}
            onClick={() => setMetric(key)}
            className={`px-3 py-1 text-xs rounded-full ${
              metric === key ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#f9fafb" }}
              itemStyle={{ color: "#f9fafb" }}
            />
            <Line
              type="monotone"
              dataKey={metric}
              stroke={metrics[metric].color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Current {metrics[metric].name}</p>
          <p className="text-2xl font-semibold text-white">
            {healthData[healthData.length - 1][metric]} {metrics[metric].unit}
          </p>
        </div>
        <div className="bg-gray-800 px-3 py-1 rounded-full text-xs text-emerald-400">Normal</div>
      </div>
    </div>
  )
}

