"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, X, Send, Bot, ArrowRight, Mic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    action?: {
        type: "navigate"
        url: string
    }
}

const QUICK_ACTIONS = [
    { label: "Order Water", message: "I'd like to order water." },
    { label: "Set Up Recurring", message: "How does recurring delivery work?" },
    { label: "Check Availability", message: "Where do you deliver?" },
    { label: "Products", message: "What brands do you have?" },
    { label: "Bulk / Business", message: "I need a bulk order for my business." },
]

export function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm the iLee assistant. I can help you place an order, check regular delivery slots, or answer questions about our service area."
        }
    ])
    const [input, setInput] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [isListening, setIsListening] = React.useState(false) // Voice input state
    const [isSpeaking, setIsSpeaking] = React.useState(false)   // Voice output state
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Smooth scroll to bottom
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isOpen])

    // Speech Recognition (Browser API)
    const startListening = () => {
        if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            const recognition = new SpeechRecognition()
            recognition.lang = "en-US"
            recognition.interimResults = false
            recognition.maxAlternatives = 1

            recognition.onstart = () => setIsListening(true)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript
                setInput(transcript)
                // Auto-send after a brief pause for a natural feel
                setTimeout(() => handleSend(transcript, true), 500)
            }

            recognition.onend = () => setIsListening(false)
            recognition.onerror = () => setIsListening(false)

            recognition.start()
        } else {
            alert("Voice input is not supported in this browser. Please use Chrome or Safari.")
        }
    }

    // Text to Speech
    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            setIsSpeaking(true)
            const utterance = new SpeechSynthesisUtterance(text)
            // Select a nice voice if available
            const voices = window.speechSynthesis.getVoices()
            const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"))
            if (preferredVoice) utterance.voice = preferredVoice

            utterance.rate = 1
            utterance.pitch = 1

            utterance.onend = () => setIsSpeaking(false)
            window.speechSynthesis.speak(utterance)
        }
    }

    const handleSend = async (content: string, isVoice: boolean = false) => {
        if (!content.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content
        }

        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        // Simulate API call
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Simple mock response logic
            let replyText = "I can help with that! Could you provide more details?"
            let action = undefined

            const lowerContent = content.toLowerCase()
            if (lowerContent.includes("order") || lowerContent.includes("buy")) {
                replyText = "I can take you to our order form to get started."
                action = { type: "navigate" as const, url: "/order" }
            } else if (lowerContent.includes("recurring") || lowerContent.includes("subscription")) {
                replyText = "Recurring delivery ensures you never run out. You can set this up on the order page."
                action = { type: "navigate" as const, url: "/order?deliveryType=Recurring" }
            } else if (lowerContent.includes("brand") || lowerContent.includes("products")) {
                replyText = "We carry Poland Spring, Nestlé Pure Life, and Member's Mark."
            } else if (lowerContent.includes("hello") || lowerContent.includes("hi")) {
                replyText = "Hello! How can I hydrate you today?"
            }

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: replyText,
                action: action
            }

            setMessages(prev => [...prev, assistantMsg])

            // Speak the response ONLY if input was voice
            if (isVoice) {
                speak(replyText)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleActionClick = (url: string) => {
        setIsOpen(false)
        router.push(url)
    }

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-white/20"
                onClick={() => setIsOpen(true)}
            >
                <div className="relative">
                    <Bot className="w-8 h-8" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-indigo-600"></span>
                    </span>
                </div>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] md:h-[calc(100vh-2rem)] md:m-4 md:rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden border border-white/20"
                        >
                            {/* Header */}
                            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shadow-lg z-10">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-inner">
                                            <Bot className="w-6 h-6 text-white" />
                                        </div>
                                        {isSpeaking && (
                                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-slate-900"></span>
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg tracking-tight">iLee Assistant</h3>
                                        <p className="text-xs text-blue-200/80 font-medium">Always Online</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            {/* Voice Mode Overlay (Active when listening) */}
                            <AnimatePresence>
                                {isListening && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-white"
                                    >
                                        <div className="mb-8 relative">
                                            <div className="w-24 h-24 rounded-full bg-blue-500/20 animate-ping absolute inset-0"></div>
                                            <div className="w-24 h-24 rounded-full bg-blue-500/40 animate-pulse absolute inset-0"></div>
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                                <Mic className="text-white w-10 h-10" />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Listening...</h3>
                                        <p className="text-slate-400">Speak now, I&apos;m listening.</p>
                                        <Button
                                            variant="outline"
                                            className="mt-8 border-white/20 text-white hover:bg-white/10 rounded-full"
                                            onClick={() => setIsListening(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Messages Area */}
                            <ScrollArea className="flex-1 bg-slate-50/50">
                                <div className="p-4 space-y-6 pb-4 min-h-full flex flex-col justify-end">
                                    {messages.map((msg) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            key={msg.id}
                                            className={cn(
                                                "flex w-full",
                                                msg.role === "user" ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed relative",
                                                    msg.role === "user"
                                                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none ml-12"
                                                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-none mr-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                                                )}
                                            >
                                                {msg.content}
                                                {msg.action && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="mt-3 w-full justify-between bg-blue-50/50 text-blue-700 hover:bg-blue-100/50 border border-blue-100 transition-colors"
                                                        onClick={() => handleActionClick(msg.action!.url)}
                                                    >
                                                        Proceed <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-4 shadow-sm flex gap-1.5 items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={scrollRef} />
                                </div>
                            </ScrollArea>

                            {/* Quick Actions */}
                            <div className="px-4 py-3 border-t border-slate-100/50 bg-white/80 backdrop-blur-md">
                                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-gradient">
                                    {QUICK_ACTIONS.map((action, idx) => (
                                        <motion.button
                                            whileHover={{ scale: 1.05, backgroundColor: "#eff6ff" }}
                                            whileTap={{ scale: 0.95 }}
                                            key={idx}
                                            onClick={() => handleSend(action.message)}
                                            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold hover:text-blue-600 transition-colors border border-transparent hover:border-blue-200 flex-shrink-0 shadow-sm"
                                        >
                                            {action.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-slate-100 z-10">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSend(input)
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="relative flex-1">
                                        <Input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask anything..."
                                            className="pr-10 rounded-full bg-slate-50 border-slate-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 transition-all h-11 pl-5"
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            onClick={startListening}
                                            className="absolute right-1 top-1 bottom-1 h-9 w-9 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                                        </Button>
                                    </div>
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !input.trim()}
                                        className="rounded-full h-11 w-11 bg-slate-900 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 shrink-0"
                                    >
                                        <Send className="w-5 h-5 ml-0.5" />
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
