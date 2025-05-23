"use client"

import type { FC } from "react"
import { ArchiveIcon, PlusIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button"
import { useState, useCallback } from "react"

// Define thread type
interface Thread {
  id: string
  title: string
  createdAt: Date
  isActive?: boolean
}

export const ThreadList: FC = () => {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "1",
      title: "AI Capabilities Discussion",
      createdAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      title: "Project Planning Help",
      createdAt: new Date(Date.now() - 86400000), // Yesterday
    },
    {
      id: "3",
      title: "Code Review Session",
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
    },
  ])

  const handleNewChat = useCallback(() => {
    console.log("New chat button clicked from ThreadList") // Debug log

    // Reset the current thread using the window method
    if (typeof window !== "undefined" && window.resetThread) {
      console.log("Calling window.resetThread from ThreadList") // Debug log
      window.resetThread()
    } else {
      console.warn("window.resetThread not available from ThreadList") // Debug log
    }

    // Create a new thread
    const newThread: Thread = {
      id: Date.now().toString(),
      title: "New Conversation",
      createdAt: new Date(),
      isActive: true,
    }

    // Update threads state
    setThreads((prev) => [newThread, ...prev.map((t) => ({ ...t, isActive: false }))])
  }, [])

  const handleThreadClick = useCallback((threadId: string) => {
    setThreads((prev) => prev.map((t) => ({ ...t, isActive: t.id === threadId })))
    console.log(`Switching to thread: ${threadId}`)
  }, [])

  const handleArchiveThread = useCallback((threadId: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== threadId))
  }, [])

  return (
    <div className="flex flex-col items-stretch gap-2 p-2">
      <ThreadListNew onNewChat={handleNewChat} />
      <ThreadListItems threads={threads} onThreadClick={handleThreadClick} onArchiveThread={handleArchiveThread} />
    </div>
  )
}

interface ThreadListNewProps {
  onNewChat: () => void
}

const ThreadListNew: FC<ThreadListNewProps> = ({ onNewChat }) => {
  return (
    <Button
      onClick={onNewChat}
      className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 data-[active]:from-violet-800 data-[active]:to-blue-800 flex items-center justify-start gap-2 rounded-lg px-3 py-2.5 text-start shadow-md hover:shadow-lg transition-all duration-300"
      variant="ghost"
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
        <PlusIcon className="h-3.5 w-3.5" />
      </div>
      <span className="font-medium">New Chat</span>
    </Button>
  )
}

interface ThreadListItemsProps {
  threads: Thread[]
  onThreadClick: (threadId: string) => void
  onArchiveThread: (threadId: string) => void
}

const ThreadListItems: FC<ThreadListItemsProps> = ({ threads, onThreadClick, onArchiveThread }) => {
  return (
    <div className="space-y-1">
      {threads.map((thread) => (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          onThreadClick={onThreadClick}
          onArchiveThread={onArchiveThread}
        />
      ))}
    </div>
  )
}

interface ThreadListItemProps {
  thread: Thread
  onThreadClick: (threadId: string) => void
  onArchiveThread: (threadId: string) => void
}

const ThreadListItem: FC<ThreadListItemProps> = ({ thread, onThreadClick, onArchiveThread }) => {
  return (
    <div
      className={`group ${thread.isActive ? "data-[active]:bg-violet-100 data-[active]:text-violet-700" : ""} hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:ring-violet-500 flex items-center gap-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 overflow-hidden ${thread.isActive ? "bg-violet-100 text-violet-700" : ""}`}
    >
      <button onClick={() => onThreadClick(thread.id)} className="flex-grow px-3 py-2.5 text-start">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-sm">
            <Sparkles className="h-3 w-3" />
          </div>
          <ThreadListItemTitle title={thread.title} />
        </div>
      </button>
      <ThreadListItemArchive onArchive={() => onArchiveThread(thread.id)} />
    </div>
  )
}

interface ThreadListItemTitleProps {
  title: string
}

const ThreadListItemTitle: FC<ThreadListItemTitleProps> = ({ title }) => {
  return <p className="text-sm font-medium truncate">{title || "New Conversation"}</p>
}

interface ThreadListItemArchiveProps {
  onArchive: () => void
}

const ThreadListItemArchive: FC<ThreadListItemArchiveProps> = ({ onArchive }) => {
  return (
    <TooltipIconButton
      onClick={onArchive}
      className="text-gray-500 hover:text-violet-600 ml-auto mr-2 size-6 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      variant="ghost"
      tooltip="Archive thread"
    >
      <ArchiveIcon className="h-4 w-4" />
    </TooltipIconButton>
  )
}
