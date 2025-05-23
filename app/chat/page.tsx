"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Thread } from "@/components/assistant-ui/thread"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, RotateCcw, Zap } from "lucide-react"
import { useState } from "react"

export default function ChatPage() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  })

  // Add state to track if we're in a loading state
  const [isLoading, setIsLoading] = useState(false)

  const handleNewChat = () => {
    setIsLoading(true)
    try {
      runtime.reset?.()
      console.log("Starting new chat...")
    } catch (error) {
      console.error("Error starting new chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setIsLoading(true)
    try {
      runtime.reset?.()
      console.log("Clearing chat...")
    } catch (error) {
      console.error("Error clearing chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-violet-50/50 via-blue-50/50 to-cyan-50/50">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white/70 backdrop-blur-xl px-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/" className="text-violet-600 hover:text-violet-700">
                      NexusAI
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold">Chat</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-700 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Lightning Fast
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                disabled={isLoading}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <RotateCcw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewChat}
                disabled={isLoading}
                className="bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </header>
          <div className="flex h-[calc(100vh-4rem)] flex-col">
            <Thread />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  )
}
