"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles } from "lucide-react"

// Extend the Window interface to include our custom method
declare global {
  interface Window {
    resetThread?: () => void
  }
}

// Define message type
interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export const Thread = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your NexusAI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Reset function that can be called from outside
  useEffect(() => {
    // Define the reset method on the window object
    window.resetThread = () => {
      setMessages([
        {
          id: 1,
          type: "assistant",
          content: "Hello! I'm your NexusAI assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ])
      setInput("")
      setIsTyping(false)
    }

    return () => {
      // Clean up when component unmounts
      delete window.resetThread
    }
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Format messages for the API
      const apiMessages = messages.concat(userMessage).map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
          system: "You are NexusAI, a helpful and friendly assistant.",
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error("Response body is null")

      let assistantResponse = ""
      const assistantMessageId = Date.now() + 1

      // Create initial assistant message with empty content
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          type: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ])

      // Process the stream
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Decode and parse the chunk
        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split("\n").filter((line) => line.trim() !== "" && line.startsWith("data: "))

        for (const line of lines) {
          const data = line.substring(6) // Remove "data: " prefix
          if (data === "[DONE]") continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.type === "text-delta" && parsed.text) {
              assistantResponse += parsed.text

              // Update the assistant message with the accumulated response
              setMessages((prev) =>
                prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: assistantResponse } : msg)),
              )
            }
          } catch (e) {
            console.error("Error parsing chunk:", e)
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a conversation with NexusAI</h3>
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
                      {message.type === "user" ? "You" : "NexusAI"}
                    </Badge>
                    <span className={`text-xs ${message.type === "user" ? "text-white/70" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${message.type === "user" ? "text-white" : "text-gray-800"}`}>
                    {message.content || (message.type === "assistant" && isTyping ? "..." : "")}
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

        {isTyping && !messages[messages.length - 1]?.content && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <Card className="max-w-[80%] p-4 shadow-lg border-0 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">NexusAI is typing...</span>
              </div>
            </Card>
          </div>
        )}

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white/80 backdrop-blur-sm p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border-gray-200 focus:border-violet-500 focus:ring-violet-500 shadow-sm"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send • Connected to Google Gemini 2.0 Flash
        </p>
      </div>
    </div>
  )
}
