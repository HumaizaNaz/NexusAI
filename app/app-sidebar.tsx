"use client"

import { Home, MessageSquare, Settings, User, Sparkles, LogOut, Zap, Star, Lightbulb } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/app/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ThreadList } from "@/components/assistant-ui/thread-list"

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    console.log("Logging out...")
    router.push("/login")
  }

  const isActive = (path: string) => pathname === path

  const menuItems = [
    {
      title: "Home",
      icon: Home,
      path: "/",
      color: "violet",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      path: "/chat",
      color: "blue",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
      color: "emerald",
    },
  ]

  return (
    <Sidebar variant="floating" className="border-0 shadow-xl">
      <SidebarHeader className="pb-4 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-cyan-500/10 border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl blur-sm opacity-50"></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              NexusAI
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                Online
              </Badge>
              <span className="text-xs text-gray-500">v2.0</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-violet-600 font-semibold mb-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="https://asom" target="_blank">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm">
                      <Sparkles className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">NexusA</span>
                      <span className="text-xs text-muted-foreground">AI Assistant</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105
                      ${
                        isActive(item.path)
                          ? `bg-gradient-to-r from-${item.color}-100 to-${item.color}-50 text-${item.color}-700 shadow-lg`
                          : `hover:bg-${item.color}-50 hover:text-${item.color}-700`
                      }
                    `}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                    {isActive(item.path) && (
                      <div className="absolute right-2 h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 font-semibold mb-2">Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <ThreadList />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 font-semibold mb-2">Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/chat")}
                  className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-amber-700"
                >
                  <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Lightning Fast</span>
                  <Badge className="ml-auto bg-amber-200 text-amber-700 text-xs">New</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/chat")}
                  className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <Star className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium">Smart Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigation("/chat")}
                  className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:bg-teal-50 hover:text-teal-700"
                >
                  <Lightbulb className="h-4 w-4 text-teal-500" />
                  <span className="font-medium">Creative Mode</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-gray-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/profile")}
              onClick={() => handleNavigation("/profile")}
              className="hover:bg-indigo-50 hover:text-indigo-700 data-[active=true]:bg-indigo-100 data-[active=true]:text-indigo-700 rounded-lg transition-all duration-300"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mt-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Logout
          </Button>
        </div>
      </SidebarFooter>

      <SidebarTrigger className="absolute top-4 left-4 z-50 md:hidden bg-white shadow-lg rounded-lg" />
    </Sidebar>
  )
}
