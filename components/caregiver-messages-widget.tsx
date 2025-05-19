"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data - in a real application, this would come from your caregiver coordination agent
const initialMessages = [
  {
    id: 1,
    sender: "Dr. Priya Sharma",
    content: "Blood pressure readings look good today.",
    time: "10:30 AM",
    isCaregiver: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    sender: "You",
    content: "Thanks for checking. Any changes to medication?",
    time: "10:45 AM",
    isCaregiver: false,
  },
  {
    id: 3,
    sender: "Dr. Priya Sharma",
    content: "No changes needed. Continue as prescribed.",
    time: "11:00 AM",
    isCaregiver: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CaregiverMessagesWidget() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isCaregiver: false,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate caregiver typing
    setIsTyping(true)

    // Simulate caregiver response after a delay
    setTimeout(() => {
      const caregiverResponses = [
        "I'll check on that and get back to you.",
        "That's good to know. I'll update the care plan.",
        "Let me consult with the healthcare team about this.",
        "I've noted this in the patient record.",
        "Would you like me to schedule a follow-up appointment?",
        "The vital signs are within normal range.",
        "I'll arrange for the medication to be delivered tomorrow.",
      ]

      const randomResponse = caregiverResponses[Math.floor(Math.random() * caregiverResponses.length)]

      const caregiverMessage = {
        id: messages.length + 2,
        sender: "Dr. Priya Sharma",
        content: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCaregiver: true,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, caregiverMessage])
    }, 2000)
  }

  return (
    <div className="flex flex-col h-[200px]">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isCaregiver ? "justify-start" : "justify-end"}`}>
            <div
              className={`flex ${message.isCaregiver ? "flex-row" : "flex-row-reverse"} items-start gap-2 max-w-[80%]`}
            >
              {message.isCaregiver && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback className="bg-primary/10 text-xs">{message.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    message.isCaregiver ? "bg-gray-800 text-gray-100" : "bg-purple-900 text-white"
                  }`}
                >
                  {message.content}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.isCaregiver ? `${message.sender}, ` : ""}
                  {message.time}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-row items-start gap-2 max-w-[80%]">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-primary/10 text-xs">P</AvatarFallback>
              </Avatar>
              <div>
                <div className="px-3 py-2 rounded-lg text-sm bg-gray-800 text-gray-100">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-gray-400 hover:text-gray-300">
                    <Paperclip className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="text-gray-400 hover:text-gray-300">
                  <Smile className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2 bg-gray-800 border-gray-700">
                <div className="grid grid-cols-8 gap-1">
                  {["😊", "👍", "❤️", "😂", "🙏", "😍", "🎉", "👋", "🤔", "😢", "🙂", "😎", "🔥", "✅", "⭐", "🚀"].map(
                    (emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className="hover:bg-gray-700 p-1 rounded"
                        onClick={() => setNewMessage((prev) => prev + emoji)}
                      >
                        {emoji}
                      </button>
                    ),
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button
          type="submit"
          size="sm"
          className="bg-purple-700 hover:bg-purple-600 text-white"
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

