"use client"

import { useState } from "react"
import { Check, AlertTriangle, RefreshCw, Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Mock data - in a real application, this would come from your agent monitoring system
const agentData = [
  {
    id: 1,
    name: "Health Monitoring Agent",
    status: "active",
    lastActive: "2 minutes ago",
    cpuUsage: 12,
    memoryUsage: 28,
    model: "Ollama/mistral-7b",
    responseTime: "230ms",
  },
  {
    id: 2,
    name: "Safety & Activity Agent",
    status: "active",
    lastActive: "1 minute ago",
    cpuUsage: 18,
    memoryUsage: 32,
    model: "Ollama/llama2-7b",
    responseTime: "180ms",
  },
  {
    id: 3,
    name: "Reminder & Schedule Agent",
    status: "active",
    lastActive: "5 minutes ago",
    cpuUsage: 8,
    memoryUsage: 22,
    model: "Ollama/mistral-7b",
    responseTime: "150ms",
  },
  {
    id: 4,
    name: "Caregiver Coordination Agent",
    status: "warning",
    lastActive: "15 minutes ago",
    cpuUsage: 5,
    memoryUsage: 18,
    model: "Ollama/llama2-7b",
    responseTime: "320ms",
  },
  {
    id: 5,
    name: "Social Engagement Agent",
    status: "active",
    lastActive: "8 minutes ago",
    cpuUsage: 10,
    memoryUsage: 25,
    model: "Ollama/mistral-7b",
    responseTime: "210ms",
  },
  {
    id: 6,
    name: "Central Orchestration Agent",
    status: "active",
    lastActive: "1 minute ago",
    cpuUsage: 22,
    memoryUsage: 45,
    model: "Ollama/llama2-13b",
    responseTime: "280ms",
  },
]

export default function AgentStatusWidget() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Check className="h-5 w-5 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-white">Agent Status Overview</h3>
          <p className="text-sm text-gray-400">Monitoring {agentData.length} active agents</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {agentData.map((agent) => (
          <div key={agent.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-purple-500" />
                <h4 className="font-medium text-white">{agent.name}</h4>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(agent.status)}
                <span
                  className={`text-sm ${
                    agent.status === "active"
                      ? "text-emerald-500"
                      : agent.status === "warning"
                        ? "text-amber-500"
                        : "text-red-500"
                  }`}
                >
                  {agent.status === "active" ? "Active" : agent.status === "warning" ? "Warning" : "Error"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500">Last Active</p>
                <p className="text-sm text-white">{agent.lastActive}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Model</p>
                <p className="text-sm text-white">{agent.model}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Response Time</p>
                <p className="text-sm text-white">{agent.responseTime}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-gray-500">CPU Usage</p>
                  <p className="text-xs text-gray-400">{agent.cpuUsage}%</p>
                </div>
                <Progress
                  value={agent.cpuUsage}
                  max={100}
                  className="h-1 bg-gray-700"
                  indicatorClassName="bg-blue-500"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-gray-500">Memory Usage</p>
                  <p className="text-xs text-gray-400">{agent.memoryUsage}%</p>
                </div>
                <Progress
                  value={agent.memoryUsage}
                  max={100}
                  className="h-1 bg-gray-700"
                  indicatorClassName="bg-purple-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

