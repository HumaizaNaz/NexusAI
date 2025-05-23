"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, MessageSquare, Settings, Sparkles, Zap, Shield, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/70 backdrop-blur-xl px-4 shadow-sm">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-violet-600 font-semibold">NexusAI Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="container py-12">
            <div className="mx-auto max-w-6xl space-y-12">
              {/* Hero Section */}
              <div className="text-center space-y-6">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg">
                    <Sparkles className="h-8 w-8 text-white animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                </div>
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-200">
                    ✨ Powered by Advanced AI
                  </Badge>
                  <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Welcome to NexusAI
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Your intelligent companion for productivity, creativity, and problem-solving. Experience the future
                    of AI interaction.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/chat"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "bg-gradient-to-r from-violet-600 to-blue-600 text-white border-0 hover:from-violet-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                    })}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Start Chatting Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Button variant="outline" size="lg" className="border-violet-200 hover:bg-violet-50">
                    <Bot className="mr-2 h-5 w-5" />
                    Explore Features
                  </Button>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg group-hover:shadow-violet-200 transition-all duration-300">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="mt-4 text-xl">Smart Conversations</CardTitle>
                    <CardDescription className="text-gray-600">
                      Engage in natural, intelligent conversations with our advanced AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                        Natural language processing
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                        Context-aware responses
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                        Multi-language support
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="/chat"
                      className={buttonVariants({
                        variant: "outline",
                        className: "w-full group-hover:bg-violet-50 group-hover:border-violet-300",
                      })}
                    >
                      Start chatting
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg group-hover:shadow-amber-200 transition-all duration-300">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="mt-4 text-xl">Lightning Fast</CardTitle>
                    <CardDescription className="text-gray-600">
                      Get instant responses and real-time assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        Real-time responses
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        Optimized performance
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                        Cloud-powered
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="/chat"
                      className={buttonVariants({
                        variant: "outline",
                        className: "w-full group-hover:bg-amber-50 group-hover:border-amber-300",
                      })}
                    >
                      Try Lightning Fast
                      <Zap className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="mt-4 text-xl">Secure & Private</CardTitle>
                    <CardDescription className="text-gray-600">
                      Your data is protected with enterprise-grade security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        End-to-end encryption
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        Privacy-first design
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        GDPR compliant
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="/settings"
                      className={buttonVariants({
                        variant: "outline",
                        className: "w-full group-hover:bg-emerald-50 group-hover:border-emerald-300",
                      })}
                    >
                      Privacy settings
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              {/* CTA Section */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 p-8 shadow-2xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex flex-col items-center space-y-6 text-center text-white">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Heart className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Ready to Transform Your Workflow?</h2>
                    <p className="max-w-2xl text-lg text-white/90">
                      Join thousands of users who are already experiencing the power of NexusAI.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/chat"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "bg-white text-violet-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300",
                      })}
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Start Your Journey
                    </Link>
                    <Link
                      href="/settings"
                      className={buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className: "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
                      })}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Customize Experience
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  )
}
