"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/app-sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Save, User, Bell, Shield, Palette, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  })

  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "AI enthusiast and developer",
    notifications: true,
    darkMode: false,
    language: "en",
    model: "gpt-4",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    console.log("Settings saved:", settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-violet-50/50 via-blue-50/50 to-cyan-50/50">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/70 backdrop-blur-xl px-4 shadow-sm">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/" className="text-violet-600 hover:text-violet-700">
                    AI Assistant
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="flex-1 space-y-8 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-gray-600 mt-1">Manage your account settings and preferences.</p>
              </div>
              {saved && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Saved successfully!
                </Badge>
              )}
            </div>

            <div className="grid gap-6 max-w-4xl">
              {/* Profile Settings */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and profile details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        className="border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="border-gray-200 focus:border-violet-500 focus:ring-violet-500 min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Palette className="h-4 w-4 text-white" />
                    </div>
                    Preferences
                  </CardTitle>
                  <CardDescription>Customize your experience and interface preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Dark Mode</Label>
                      <p className="text-sm text-gray-600">Switch between light and dark themes</p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium">
                      Language
                    </Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-violet-500 focus:ring-violet-500">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                        <SelectItem value="fr">🇫🇷 French</SelectItem>
                        <SelectItem value="de">🇩🇪 German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* AI Model Settings */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    AI Model Configuration
                  </CardTitle>
                  <CardDescription>Configure your AI assistant preferences and model settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium">
                      Preferred AI Model
                    </Label>
                    <Select
                      value={settings.model}
                      onValueChange={(value) => setSettings({ ...settings, model: value })}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-violet-500 focus:ring-violet-500">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">🚀 GPT-4 (Recommended)</SelectItem>
                        <SelectItem value="gpt-3.5">⚡ GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude">🧠 Claude</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage your notification preferences and alerts .</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications about new messages and updates</p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                  size="lg"
                >
                  <Save className="h-4 w-4" />
                  Save Change
                
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  )
}
