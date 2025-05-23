"use client"

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  
} from "@assistant-ui/react"
import type { FC } from "react"
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
  Sparkles,
  Bot,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { MarkdownText } from "@/components/assistant-ui/markdown-text"
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button"
import { ToolFallback } from "@/components/assistant-ui/tool-fallback"

export const Thread: FC = () => {
  // Expose reset function to window for external access
  useEffect(() => {
    const resetThread = () => {
      console.log("Resetting thread") // Debug log

      try {
        // Force a reload of the page to reset the chat
        // This is a simple but effective approach that works in all cases
        window.location.reload()
      } catch (error) {
        console.error("Error resetting thread:", error)
      }
    }

    // Expose to window for external access
    if (typeof window !== "undefined") {
      window.resetThread = resetThread
    }

    return () => {
      // Cleanup
      if (typeof window !== "undefined") {
        delete window.resetThread
      }
    }
  }, [])

  return (
    <ThreadPrimitive.Root
      className="bg-gradient-to-b from-white to-gray-50/50 box-border flex h-full flex-col overflow-hidden"
      style={{
        ["--thread-max-width" as string]: "42rem",
      }}
    >
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-8 flex-grow" />
        </ThreadPrimitive.If>

        <div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  )
}

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="absolute -top-8 rounded-full disabled:invisible bg-white shadow-lg hover:shadow-xl"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  )
}

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mb-4 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a conversation with NexusAI</h3>
          <p className="text-gray-600 max-w-md mx-auto text-center mb-6">
            Ask me anything! I can help with questions, creative writing, coding, analysis, and much more.
          </p>
        </div>
        <ThreadWelcomeSuggestions />
      </div>
    </ThreadPrimitive.Empty>
  )
}

const ThreadWelcomeSuggestions: FC = () => {
  return (
    <div className="mt-3 flex w-full items-stretch justify-center gap-4">
      <ThreadPrimitive.Suggestion
        className="hover:bg-violet-50 hover:border-violet-300 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border border-gray-200 p-4 transition-all ease-in shadow-sm hover:shadow-md bg-white"
        prompt="What is the weather in Tokyo?"
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis text-sm font-semibold text-gray-800">
          What is the weather in Tokyo?
        </span>
      </ThreadPrimitive.Suggestion>
      <ThreadPrimitive.Suggestion
        className="hover:bg-violet-50 hover:border-violet-300 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border border-gray-200 p-4 transition-all ease-in shadow-sm hover:shadow-md bg-white"
        prompt="What is assistant-ui?"
        method="replace"
        autoSend
      >
        <span className="line-clamp-2 text-ellipsis text-sm font-semibold text-gray-800">What is assistant-ui?</span>
      </ThreadPrimitive.Suggestion>
    </div>
  )
}

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 flex w-full flex-wrap items-end rounded-lg border border-gray-200 bg-white px-2.5 shadow-lg transition-all ease-in">
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder="Type your message here..."
        className="placeholder:text-gray-400 max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  )
}

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="my-2.5 size-8 p-2 transition-all ease-in bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="my-2.5 size-8 p-2 transition-all ease-in bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  )
}

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full max-w-[var(--thread-max-width)] py-4">
      <UserActionBar />

      <div className="flex gap-3 justify-end col-start-2 row-start-2">
        <div className="bg-gradient-to-r from-violet-500 to-blue-500 text-white max-w-[calc(var(--thread-max-width)*0.8)] break-words rounded-3xl px-5 py-3 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full font-medium">You</span>
            <span className="text-xs text-white/70">{new Date().toLocaleTimeString()}</span>
          </div>
          <MessagePrimitive.Content />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>

      <BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
    </MessagePrimitive.Root>
  )
}

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex flex-col items-end col-start-1 row-start-2 mr-3 mt-2.5"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit" variant="ghost" size="sm" className="hover:bg-gray-100">
          <PencilIcon className="h-4 w-4" />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  )
}

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className="bg-white border border-gray-200 my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl shadow-lg">
      <ComposerPrimitive.Input className="text-gray-800 flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none focus:ring-0" />

      <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
        <ComposerPrimitive.Cancel asChild>
          <Button variant="ghost">Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600">
            Send
          </Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  )
}

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] relative w-full max-w-[var(--thread-max-width)] py-4">
      <div className="flex gap-3 justify-start col-span-2 col-start-2 row-start-1 my-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="bg-white border border-gray-200 text-gray-800 max-w-[calc(var(--thread-max-width)*0.8)] break-words leading-7 rounded-2xl px-5 py-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full font-medium">NexusAI</span>
            <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
          </div>
          <MessagePrimitive.Content
            components={{ Text: MarkdownText, tools: { Fallback: ToolFallback } }}
          />
        </div>
      </div>

      <AssistantActionBar />

      <BranchPicker className="col-start-2 row-start-2 -ml-2 mr-2" />
    </MessagePrimitive.Root>
  )
}

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="text-muted-foreground flex gap-1 col-start-3 row-start-2 -ml-1 data-[floating]:bg-white data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-lg"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy" variant="ghost" size="sm" className="hover:bg-gray-100">
          <MessagePrimitive.If copied>
            <CheckIcon className="h-4 w-4" />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon className="h-4 w-4" />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh" variant="ghost" size="sm" className="hover:bg-gray-100">
          <RefreshCwIcon className="h-4 w-4" />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  )
}

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({ className, ...rest }) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn("text-muted-foreground inline-flex items-center text-xs", className)}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous" variant="ghost" size="sm">
          <ChevronLeftIcon className="h-4 w-4" />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium px-2">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next" variant="ghost" size="sm">
          <ChevronRightIcon className="h-4 w-4" />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  )
}

const CircleStopIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  )
}

// Extend the Window interface to include our custom method
declare global {
  interface Window {
    resetThread?: () => void
  }
}
