import type { FC } from "react"
import { ThreadListItemPrimitive, ThreadListPrimitive } from "@assistant-ui/react"
import { ArchiveIcon, PlusIcon, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button"

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className="flex flex-col items-stretch gap-2 p-2">
      <ThreadListNew />
      <ThreadListItems />
    </ThreadListPrimitive.Root>
  )
}

const ThreadListNew: FC = () => {
  return (
    <ThreadListPrimitive.New asChild>
      <Button
        className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 data-[active]:from-violet-800 data-[active]:to-blue-800 flex items-center justify-start gap-2 rounded-lg px-3 py-2.5 text-start shadow-md hover:shadow-lg transition-all duration-300"
        variant="ghost"
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
          <PlusIcon className="h-3.5 w-3.5" />
        </div>
        <span className="font-medium">New Chat</span>
      </Button>
    </ThreadListPrimitive.New>
  )
}

const ThreadListItems: FC = () => {
  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />
}

const ThreadListItem: FC = () => {
  return (
    <ThreadListItemPrimitive.Root className="group data-[active]:bg-violet-100 data-[active]:text-violet-700 hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:ring-violet-500 flex items-center gap-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 overflow-hidden">
      <ThreadListItemPrimitive.Trigger className="flex-grow px-3 py-2.5 text-start">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-sm">
            <Sparkles className="h-3 w-3" />
          </div>
          <ThreadListItemTitle />
        </div>
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  )
}

const ThreadListItemTitle: FC = () => {
  return (
    <p className="text-sm font-medium truncate">
      <ThreadListItemPrimitive.Title fallback="New Conversation" />
    </p>
  )
}

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton
        className="text-gray-500 hover:text-violet-600 ml-auto mr-2 size-6 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        variant="ghost"
        tooltip="Archive thread"
      >
        <ArchiveIcon className="h-4 w-4" />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  )
}
