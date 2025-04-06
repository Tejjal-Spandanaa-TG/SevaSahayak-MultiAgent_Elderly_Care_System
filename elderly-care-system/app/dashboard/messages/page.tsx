"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Smile, Image, Mic, Phone, Video, Info, Search, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for contacts
const contacts = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Primary Physician",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Blood pressure readings look good today.",
    time: "10:30 AM",
    unread: 0,
    online: true,
  },
  {
    id: 2,
    name: "Vikram Mehta",
    role: "Family Member",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll visit tomorrow afternoon.",
    time: "Yesterday",
    unread: 2,
    online: false,
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Nurse",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Medication has been administered.",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    role: "Physical Therapist",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's schedule the next session for Thursday.",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Sunita Verma",
    role: "Nutritionist",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've updated the diet plan as discussed.",
    time: "Monday",
    unread: 1,
    online: true,
  },
]

// Mock conversation data
const conversations = {
  1: [
    {
      id: 1,
      sender: "Dr. Priya Sharma",
      content: "Good morning! How is Mr. Sharma doing today?",
      time: "10:15 AM",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "He's doing well. His sleep was better last night.",
      time: "10:20 AM",
      isUser: true,
    },
    {
      id: 3,
      sender: "Dr. Priya Sharma",
      content: "That's great to hear. I've reviewed his latest vitals.",
      time: "10:25 AM",
      isUser: false,
    },
    {
      id: 4,
      sender: "Dr. Priya Sharma",
      content: "Blood pressure readings look good today.",
      time: "10:30 AM",
      isUser: false,
    },
    {
      id: 5,
      sender: "You",
      content: "Thanks for checking. Any changes to medication?",
      time: "10:45 AM",
      isUser: true,
    },
    {
      id: 6,
      sender: "Dr. Priya Sharma",
      content: "No changes needed. Continue as prescribed. I'll check in again tomorrow.",
      time: "11:00 AM",
      isUser: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "Vikram Mehta",
      content: "How is dad doing today?",
      time: "Yesterday, 2:15 PM",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "He's in good spirits. We went for a short walk in the garden.",
      time: "Yesterday, 2:30 PM",
      isUser: true,
    },
    {
      id: 3,
      sender: "Vikram Mehta",
      content: "That's wonderful! Did he take his medication?",
      time: "Yesterday, 2:35 PM",
      isUser: false,
    },
    {
      id: 4,
      sender: "Vikram Mehta",
      content: "I'll visit tomorrow afternoon.",
      time: "Yesterday, 3:00 PM",
      isUser: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "Ananya Patel",
      content: "Good afternoon. I've checked Mr. Sharma's vitals.",
      time: "Yesterday, 1:00 PM",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "How are they looking?",
      time: "Yesterday, 1:05 PM",
      isUser: true,
    },
    {
      id: 3,
      sender: "Ananya Patel",
      content: "All within normal range. Temperature is 36.8°C, pulse is 72 bpm.",
      time: "Yesterday, 1:10 PM",
      isUser: false,
    },
    {
      id: 4,
      sender: "Ananya Patel",
      content: "Medication has been administered.",
      time: "Yesterday, 1:15 PM",
      isUser: false,
    },
  ],
}

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messages, setMessages] = useState(conversations[1])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    if (activeContact) {
      setMessages(conversations[activeContact.id] || [])
    }
  }, [activeContact])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate contact typing
    setIsTyping(true)

    // Simulate contact response after a delay
    setTimeout(() => {
      const contactResponses = [
        "I'll check on that and get back to you.",
        "That's good to know. I'll update the care plan.",
        "Let me consult with the healthcare team about this.",
        "I've noted this in the patient record.",
        "Would you like me to schedule a follow-up appointment?",
        "The vital signs are within normal range.",
        "I'll arrange for the medication to be delivered tomorrow.",
      ]

      const randomResponse = contactResponses[Math.floor(Math.random() * contactResponses.length)]

      const contactMessage = {
        id: messages.length + 2,
        sender: activeContact.name,
        content: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: false,
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, contactMessage])
    }, 2000)
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Messages</h2>
          <p className="text-gray-400">Communicate with caregivers and family members</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex h-[calc(100vh-200px)]">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-9 bg-gray-800 border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="w-full bg-gray-800 border border-gray-700">
                    <TabsTrigger value="all" className="flex-1">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="healthcare" className="flex-1">
                      Healthcare
                    </TabsTrigger>
                    <TabsTrigger value="family" className="flex-1">
                      Family
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center p-4 cursor-pointer hover:bg-gray-800 ${activeContact.id === contact.id ? "bg-gray-800" : ""}`}
                      onClick={() => setActiveContact(contact)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                          <p className="text-xs text-gray-500">{contact.time}</p>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{contact.role}</p>
                        <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="ml-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="healthcare" className="mt-0">
                  {filteredContacts
                    .filter((contact) =>
                      ["Primary Physician", "Nurse", "Physical Therapist", "Nutritionist"].includes(contact.role),
                    )
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center p-4 cursor-pointer hover:bg-gray-800 ${activeContact.id === contact.id ? "bg-gray-800" : ""}`}
                        onClick={() => setActiveContact(contact)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
                          )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.time}</p>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{contact.role}</p>
                          <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                        </div>
                        {contact.unread > 0 && (
                          <div className="ml-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {contact.unread}
                          </div>
                        )}
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="family" className="mt-0">
                  {filteredContacts
                    .filter((contact) => contact.role === "Family Member")
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center p-4 cursor-pointer hover:bg-gray-800 ${activeContact.id === contact.id ? "bg-gray-800" : ""}`}
                        onClick={() => setActiveContact(contact)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
                          )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.time}</p>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{contact.role}</p>
                          <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                        </div>
                        {contact.unread > 0 && (
                          <div className="ml-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {contact.unread}
                          </div>
                        )}
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activeContact.avatar} />
                    <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {activeContact.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{activeContact.name}</p>
                  <p className="text-xs text-gray-400">
                    {activeContact.online ? "Online" : "Offline"} • {activeContact.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <Phone className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Voice Call</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <Video className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Video Call</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <Info className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contact Info</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 bg-gray-800 border-gray-700">
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        Search in Conversation
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        Mute Notifications
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-700"
                      >
                        Block Contact
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex ${message.isUser ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
                  >
                    {!message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activeContact.avatar} />
                        <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.isUser ? "bg-purple-900 text-white" : "bg-gray-800 text-gray-100"
                        }`}
                      >
                        {message.content}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.isUser ? "" : `${message.sender}, `}
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex flex-row items-start gap-2 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activeContact.avatar} />
                      <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
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

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-24"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-300 p-1">
                            <Paperclip className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Attach file</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-300 p-1">
                            <Image className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className="text-gray-400 hover:text-gray-300 p-1">
                          <Smile className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2 bg-gray-800 border-gray-700">
                        <div className="grid grid-cols-8 gap-1">
                          {[
                            "😊",
                            "👍",
                            "❤️",
                            "😂",
                            "🙏",
                            "😍",
                            "🎉",
                            "👋",
                            "🤔",
                            "😢",
                            "🙂",
                            "😎",
                            "🔥",
                            "✅",
                            "⭐",
                            "🚀",
                          ].map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              className="hover:bg-gray-700 p-1 rounded"
                              onClick={() => setNewMessage((prev) => prev + emoji)}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-300 p-1">
                            <Mic className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Voice message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 text-white"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

