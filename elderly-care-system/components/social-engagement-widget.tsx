"use client"

import { Calendar, Video } from "lucide-react"

// Mock data - in a real application, this would come from your social engagement agent
const socialEvents = [
  { id: 1, type: "call", name: "Video Call with Family", time: "Today, 4:00 PM" },
  { id: 2, type: "activity", name: "Virtual Bhajan Session", time: "Tomorrow, 2:00 PM" },
  { id: 3, type: "activity", name: "Online Chess with Vikram", time: "Friday, 10:00 AM" },
]

export default function SocialEngagementWidget() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-400">Upcoming Social Activities</h3>
      </div>

      <div className="space-y-3">
        {socialEvents.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-3">
              {event.type === "call" ? (
                <Video className="h-5 w-5 text-purple-500" />
              ) : (
                <Calendar className="h-5 w-5 text-emerald-500" />
              )}
              <div>
                <h4 className="text-sm font-medium text-white">{event.name}</h4>
                <p className="text-xs text-gray-400">{event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full text-center text-sm text-purple-400 hover:text-purple-300 mt-2">
        View All Activities
      </button>
    </div>
  )
}

