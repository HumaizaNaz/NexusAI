"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles } from "lucide-react"

export const Thread = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "assistant",
        content:
          "I understand your message. This is a demo response from the AI assistant. In a real implementation, this would be connected to an actual AI model.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50/50">
      {/* Messages Area */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.length === 1 && (
          <div className="text-center py-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a conversation</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Ask me anything! I can help with questions, creative writing, coding, analysis, and much more.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            {message.type === "assistant" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}

            <Card
              className={`max-w-[80%] p-4 shadow-lg border-0 ${
                message.type === "user" ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        message.type === "user" ? "bg-white/20 text-white" : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {message.type === "user" ? "You" : "AI Assistant"}
                    </Badge>
                    <span className={`text-xs ${message.type === "user" ? "text-white/70" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${message.type === "user" ? "text-white" : "text-gray-800"}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            </Card>

            {message.type === "user" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white/80 backdrop-blur-sm p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border-gray-200 focus:border-violet-500 focus:ring-violet-500 shadow-sm"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send • AI responses are simulated in this demo
        </p>
      </div>
    </div>
  )
}
