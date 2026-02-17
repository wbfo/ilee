

export interface ChatMessage {
    role: "user" | "assistant" | "system"
    content: string
}

export interface ChatResponse {
    reply: string
    action?: {
        type: "navigate"
        url: string
    }
}

// Simple heuristic-based "AI" for now since we don't have an API key.
// In the future, this would call OpenAI/Anthropic.
export async function generateChatResponse(messages: ChatMessage[]): Promise<ChatResponse> {
    const lastMessage = messages[messages.length - 1].content.toLowerCase()

    // 1. Check for specific keywords to trigger navigation
    if (lastMessage.includes("order") || lastMessage.includes("buy") || lastMessage.includes("get water")) {
        if (lastMessage.includes("recurring") || lastMessage.includes("subscription") || lastMessage.includes("weekly")) {
            return {
                reply: "I can help you set up a recurring delivery plan. It's the best way to keep your home or office stocked.",
                action: { type: "navigate", url: "/order?deliveryType=Recurring" }
            }
        }
        if (lastMessage.includes("poland spring")) {
            return {
                reply: "Poland Spring is a favorite! I'll take you to the order form with that selected.",
                action: { type: "navigate", url: "/order?brand=Poland Spring" }
            }
        }
        return {
            reply: "I'd be happy to help you place an order. We offer 24/7 delivery across the Tri-State area.",
            action: { type: "navigate", url: "/order" }
        }
    }

    if (lastMessage.includes("product") || lastMessage.includes("brand") || lastMessage.includes("sell")) {
        return {
            reply: "We source all major brands including Poland Spring, Nestlé Pure Life, and Member's Mark. Would you like to see our full list?",
            action: { type: "navigate", url: "/products" }
        }
    }

    if (lastMessage.includes("coverage") || lastMessage.includes("area") || lastMessage.includes("location") || lastMessage.includes("where")) {
        return {
            reply: "We serve the entire Tri-State Area (NY, NJ, CT). You can check your specific ZIP code on our availability page.",
            action: { type: "navigate", url: "/availability" }
        }
    }

    if (lastMessage.includes("logistics") || lastMessage.includes("moving") || lastMessage.includes("move")) {
        return {
            reply: "Beyond water, we help with light logistics, event setups, and moving assistance. Tell us more about what you need!",
            action: { type: "navigate", url: "/logistics" }
        }
    }

    if (lastMessage.includes("contact") || lastMessage.includes("email") || lastMessage.includes("phone") || lastMessage.includes("support")) {
        return {
            reply: "The best way to reach us is via the contact form or by placing an order request. We respond very quickly.",
            action: { type: "navigate", url: "/contact" }
        }
    }

    // 2. Default responses based on simple topics
    if (lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey")) {
        return {
            reply: "Hello! Welcome to iLee Moves. Need water delivered or logistics help?",
        }
    }

    if (lastMessage.includes("price") || lastMessage.includes("cost") || lastMessage.includes("how much")) {
        return {
            reply: "Pricing depends on your location, order volume, and frequency. Please submit a quick order request to get an exact quote!"
            // action: { type: "navigate", url: "/order" } // Optional, staying conversational
        }
    }

    // 3. Fallback
    return {
        reply: "I'm here to help with water delivery and logistics in the Tri-State area. Would you like to place an order or see our products?",
        action: { type: "navigate", url: "/order" }
    }
}
