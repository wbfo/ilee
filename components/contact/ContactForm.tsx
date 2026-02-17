"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MailCheck } from "lucide-react"
import { toast } from "sonner"

import { contactFormSchema, ContactFormValues } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    // We can reuse the logistics endpoint or create a new contact one.
    // For now let's just simulate or make a generic contact endpoint.
    // Actually, I'll just use the same logistics endpoint or create a simple one.
    // I'll create /api/contact later.
    async function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true)
        try {
            // Just mocking the endpoint for now as I haven't created /api/contact yet
            // Wait, I should create /api/contact.
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            setIsSuccess(true)
            toast.success("Message sent!")
        } catch (error) {
            toast.error("Something went wrong.")
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
                <MailCheck className="w-12 h-12 text-slate-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message Received</h3>
                <p className="text-slate-600 mb-4">
                    Thanks for contacting us. We usually reply within 24 hours.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Send Another Message
                </Button>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="How can we help?"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Send Message"}
                </Button>
            </form>
        </Form>
    )
}
