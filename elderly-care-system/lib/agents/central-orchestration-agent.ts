/**
 * Central Orchestration Agent for SevaSahayak
 *
 * This agent coordinates all other agents and manages the flow of information.
 * It prioritizes tasks, routes requests, and ensures all agents work together seamlessly.
 */

import type { Agent, AgentType, AgentStatus } from "./agent-manager"
import { SQLiteAdapter } from "../db/sqlite-adapter"
import { ollamaClient } from "../ollama/llm-client"
import { mlModelTool } from "../tools/ml-model-tool"

export interface AgentRequest {
  type: string
  data: any
  source?: AgentType
  priority?: "low" | "medium" | "high" | "critical"
  timestamp?: string
}

export interface AgentResponse {
  success: boolean
  data?: any
  error?: string
  source: AgentType
  timestamp: string
}

export interface AlertData {
  id: string
  type: "info" | "warning" | "critical"
  message: string
  source: AgentType
  timestamp: string
  acknowledged: boolean
  data?: any
}

export class CentralOrchestrationAgent implements Agent {
  id: string
  type: AgentType = "central-orchestration"
  name: string
  status: AgentStatus = "inactive"
  model: string
  private db: SQLiteAdapter
  private requestQueue: AgentRequest[] = []
  private alerts: AlertData[] = []
  private agentStatuses: Map<string, AgentStatus> = new Map()

  constructor(id: string, name: string, model: string) {
    this.id = id
    this.name = name
    this.model = model
    this.db = new SQLiteAdapter()
  }

  async initialize(): Promise<void> {
    console.log(`Initializing ${this.name} agent...`)

    // Initialize database connection
    // In a real implementation, this would set up necessary tables

    // Initialize LLM
    try {
      await ollamaClient.generateText({
        model: this.model,
        prompt: "Initialize central orchestration agent",
        system: "You are the central orchestration agent for an elderly care system.",
      })
    } catch (error) {
      console.error("Error initializing LLM:", error)
    }

    this.status = "active"
    console.log(`${this.name} agent initialized`)
  }

  async process(request: AgentRequest): Promise<AgentResponse> {
    console.log(`${this.name} processing request:`, request)

    // Add timestamp if not provided
    if (!request.timestamp) {
      request.timestamp = new Date().toISOString()
    }

    // Add to queue with priority handling
    this.addToQueue(request)

    // Process the request based on type
    try {
      switch (request.type) {
        case "health_data":
          return await this.processHealthData(request)

        case "safety_alert":
          return await this.processSafetyAlert(request)

        case "medication_reminder":
          return await this.processMedicationReminder(request)

        case "caregiver_message":
          return await this.processCaregiverMessage(request)

        case "social_activity":
          return await this.processSocialActivity(request)

        case "agent_status_update":
          return await this.processAgentStatusUpdate(request)

        case "get_alerts":
          return await this.getAlerts(request)

        default:
          return {
            success: false,
            error: `Unknown request type: ${request.type}`,
            source: this.type,
            timestamp: new Date().toISOString(),
          }
      }
    } catch (error) {
      console.error(`Error processing request:`, error)
      return {
        success: false,
        error: `Error processing request: ${error.message}`,
        source: this.type,
        timestamp: new Date().toISOString(),
      }
    }
  }

  private addToQueue(request: AgentRequest): void {
    // Set default priority if not provided
    if (!request.priority) {
      request.priority = "medium"
    }

    // Add to queue
    this.requestQueue.push(request)

    // Sort queue by priority
    this.requestQueue.sort((a, b) => {
      const priorityValues = { critical: 3, high: 2, medium: 1, low: 0 }
      return priorityValues[b.priority] - priorityValues[a.priority]
    })
  }

  private async processHealthData(request: AgentRequest): Promise<AgentResponse> {
    const healthData = request.data

    // Use ML model to detect anomalies
    const anomalyResult = await mlModelTool.detectHealthAnomalies(healthData)

    // If anomaly detected, create an alert
    if (anomalyResult.isAnomaly) {
      this.createAlert({
        id: `health_${Date.now()}`,
        type: "warning",
        message: `Health anomaly detected: ${anomalyResult.details}`,
        source: "health-monitoring",
        timestamp: new Date().toISOString(),
        acknowledged: false,
        data: { healthData, anomalyResult },
      })
    }

    // Store health data in database
    // In a real implementation, this would store the data in SQLite

    return {
      success: true,
      data: {
        processed: true,
        anomalyDetected: anomalyResult.isAnomaly,
        anomalyDetails: anomalyResult.details,
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private async processSafetyAlert(request: AgentRequest): Promise<AgentResponse> {
    const alertData = request.data

    // Create an alert with appropriate severity
    const alertType = alertData.severity === "high" ? "critical" : "warning"

    this.createAlert({
      id: `safety_${Date.now()}`,
      type: alertType,
      message: alertData.message,
      source: "safety-activity",
      timestamp: new Date().toISOString(),
      acknowledged: false,
      data: alertData,
    })

    // For critical alerts, we might want to immediately notify caregivers
    if (alertType === "critical") {
      // In a real implementation, this would trigger notifications
      console.log("CRITICAL SAFETY ALERT: Notifying caregivers immediately")
    }

    return {
      success: true,
      data: {
        alertCreated: true,
        alertId: `safety_${Date.now()}`,
        notificationSent: alertType === "critical",
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private async processMedicationReminder(request: AgentRequest): Promise<AgentResponse> {
    const reminderData = request.data

    // Store reminder in database
    // In a real implementation, this would store the reminder in SQLite

    // Create an info alert for the reminder
    this.createAlert({
      id: `medication_${Date.now()}`,
      type: "info",
      message: `Medication reminder: ${reminderData.medicationName} at ${reminderData.time}`,
      source: "reminder-schedule",
      timestamp: new Date().toISOString(),
      acknowledged: false,
      data: reminderData,
    })

    return {
      success: true,
      data: {
        reminderScheduled: true,
        reminderTime: reminderData.time,
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private async processCaregiverMessage(request: AgentRequest): Promise<AgentResponse> {
    const messageData = request.data

    // Store message in database
    // In a real implementation, this would store the message in SQLite

    // Create an info alert for the message if it's marked as important
    if (messageData.important) {
      this.createAlert({
        id: `message_${Date.now()}`,
        type: "info",
        message: `Important message from ${messageData.sender}: ${messageData.content.substring(0, 50)}...`,
        source: "caregiver-coordination",
        timestamp: new Date().toISOString(),
        acknowledged: false,
        data: messageData,
      })
    }

    return {
      success: true,
      data: {
        messageDelivered: true,
        messageId: `message_${Date.now()}`,
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private async processSocialActivity(request: AgentRequest): Promise<AgentResponse> {
    const activityData = request.data

    // Store activity in database
    // In a real implementation, this would store the activity in SQLite

    // Create an info alert for the activity
    this.createAlert({
      id: `social_${Date.now()}`,
      type: "info",
      message: `Social activity scheduled: ${activityData.name} at ${activityData.time}`,
      source: "social-engagement",
      timestamp: new Date().toISOString(),
      acknowledged: false,
      data: activityData,
    })

    return {
      success: true,
      data: {
        activityScheduled: true,
        activityTime: activityData.time,
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private async processAgentStatusUpdate(request: AgentRequest): Promise<AgentResponse> {
    const statusData = request.data

    // Update agent status
    this.agentStatuses.set(statusData.agentId, statusData.status)

    // If an agent is reporting an error status, create an alert
    if (statusData.status === "error") {
      this.createAlert({
        id: `agent_status_${Date.now()}`,
        type: "warning",
        message: `Agent ${statusData.agentName} is reporting an error: ${statusData.errorMessage}`,
        source: this.type,
        timestamp: new Date().toISOString(),
        acknowledged: false,
        data: statusData,
      })
    }

    return {
      success: true,
      data: {
        statusUpdated: true,
        currentStatus: statusData.status,
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private async getAlerts(request: AgentRequest): Promise<AgentResponse> {
    // Filter alerts based on request parameters
    let filteredAlerts = [...this.alerts]

    if (request.data.type) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.type === request.data.type)
    }

    if (request.data.source) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.source === request.data.source)
    }

    if (request.data.acknowledged !== undefined) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.acknowledged === request.data.acknowledged)
    }

    // Sort by timestamp (newest first)
    filteredAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Limit results if specified
    if (request.data.limit) {
      filteredAlerts = filteredAlerts.slice(0, request.data.limit)
    }

    return {
      success: true,
      data: {
        alerts: filteredAlerts,
      },
      source: this.type,
      timestamp: new Date().toISOString(),
    }
  }

  private createAlert(alert: AlertData): void {
    this.alerts.push(alert)

    // In a real implementation, this would also store the alert in the database
    console.log(`Alert created: ${alert.type} - ${alert.message}`)

    // Limit the number of alerts stored in memory
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100)
    }
  }

  async shutdown(): Promise<void> {
    console.log(`Shutting down ${this.name} agent...`)
    this.status = "inactive"
    await this.db.close()
    console.log(`${this.name} agent shut down`)
  }
}

