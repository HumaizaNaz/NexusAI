

import { google } from "@ai-sdk/google";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, system, tools } = await req.json()

    // Validate input
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Create tool configuration
    const toolConfig = tools ? { ...frontendTools(tools) } : undefined

    // Stream the response
    const result = streamText({
     model:google("gemini-2.0-flash"),
      messages,
      system,
      toolCallStreaming: true,
      tools: toolConfig,
      onError: (error) => {
        console.error("AI Stream Error:", error)
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("API Route Error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
