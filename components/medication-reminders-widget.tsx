"use client"

import { Check, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data - in a real application, this would come from your reminder agent
const medications = [
  { id: 1, name: "Blood Pressure Medication", time: "8:00 AM", taken: true },
  { id: 2, name: "Vitamin D Supplement", time: "8:00 AM", taken: true },
  { id: 3, name: "Heart Medication", time: "2:00 PM", taken: false, upcoming: true },
  { id: 4, name: "Pain Reliever", time: "8:00 PM", taken: false },
]

export default function MedicationRemindersWidget() {
  const takenCount = medications.filter((med) => med.taken).length
  const progress = (takenCount / medications.length) * 100

  const upcomingMedication = medications.find((med) => med.upcoming)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Today's Progress</span>
          <span className="text-sm text-white">
            {takenCount}/{medications.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-emerald-500" />
      </div>

      {upcomingMedication && (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <div>
              <h4 className="text-sm font-medium text-white">Upcoming: {upcomingMedication.name}</h4>
              <p className="text-xs text-gray-400">Scheduled for {upcomingMedication.time}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-400">Today's Medications</h4>
        {medications.map((med) => (
          <div key={med.id} className="flex items-center justify-between py-2 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              {med.taken ? (
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-emerald-500" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-700" />
              )}
              <span className={`text-sm ${med.taken ? "text-gray-500" : "text-white"}`}>{med.name}</span>
            </div>
            <span className="text-xs text-gray-500">{med.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

