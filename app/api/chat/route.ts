import { NextResponse } from "next/server"
import { generateChatResponse, ChatMessage } from "@/lib/assistant/provider"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const messages: ChatMessage[] = body.messages

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
        }

        const response = await generateChatResponse(messages)

        return NextResponse.json(response)
    } catch (error) {
        console.error("Chat API Error:", error)
        return NextResponse.json(
            { reply: "Sorry, I'm having trouble connecting right now. Please use the order form." },
            { status: 500 }
        )
    }
}
