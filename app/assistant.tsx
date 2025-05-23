/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Thread } from "@/components/assistant-ui/thread"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, MessageSquare, Settings, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/app/theme-toggle"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const Assistant = () => {
  const router = useRouter()
  const [activePage, setActivePage] = useState("chat")
  const [isLoading, setIsLoading] = useState(false)

  const runtime = useChatRuntime({
    api: "/api/chat",
  })

  // Navigation handler (unchanged)
  const handleNavigation = (page: string) => {
    setActivePage(page)

    switch (page) {
      case "home":
        router.push("/")
        break
      case "chat":
        router.push("/chat")
        break
      case "settings":
        router.push("/settings")
        break
      case "profile":
        router.push("/profile")
        break
      default:
        router.push("/")
    }
  }

  // Logout handler (unchanged)
  const handleLogout = () => {
    console.log("Logging out...")
    router.push("/login")
  }

  // Updated handleNewChat with loading state and window/runtime methods
  const handleNewChat = () => {
    setIsLoading(true)
    try {
      // Use the global window method if defined
      if (typeof window !== "undefined" && (window as any).resetThread) {
        (window as any).resetThread()
      }

      // Use runtime method if available (casting to any to avoid TS errors)
      if ((runtime as any).createThread) {
        (runtime as any).createThread()
      }

      console.log("Starting new chat...")
    } catch (error) {
      console.error("Error starting new chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <Sidebar variant="floating" className="border-r-0">
          <SidebarHeader className="pb-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
            <div className="flex items-center gap-3 px-3 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-xs text-muted-foreground">Powered by AI</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-purple-600 font-semibold">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Home"
                      isActive={activePage === "home"}
                      onClick={() => handleNavigation("home")}
                      className="hover:bg-purple-50 hover:text-purple-700 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
                    >
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Chat"
                      isActive={activePage === "chat"}
                      onClick={() => handleNavigation("chat")}
                      className="hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip="Settings"
                      isActive={activePage === "settings"}
                      onClick={() => handleNavigation("settings")}
                      className="hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-100 data-[active=true]:text-green-700"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Profile"
                  isActive={activePage === "profile"}
                  onClick={() => handleNavigation("profile")}
                  className="hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-gradient-to-br from-slate-50 to-blue-50/30">
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white/80 backdrop-blur-sm px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-purple-600">
                      Build Your Own ChatGPT UX
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Starter Template</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewChat}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isLoading ? "Starting..." : "New Chat"}
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
