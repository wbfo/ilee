"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { logisticsFormSchema, LogisticsFormValues } from "@/lib/schemas"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function LogisticsForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const form = useForm<LogisticsFormValues>({
        resolver: zodResolver(logisticsFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            serviceType: "Transportation",
            pickupAddress: "",
            dropoffAddress: "",
            notes: "",
        },
    })

    async function onSubmit(data: LogisticsFormValues) {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/logistics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to submit inquiry")
            }

            setIsSuccess(true)
            toast.success("Inquiry sent!")
        } catch (error) {
            toast.error("Something went wrong.")
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!mounted) {
        return <div className="h-[600px] bg-slate-50/50 rounded-xl animate-pulse" />
    }

    if (isSuccess) {
        return (
            <Card className="border-green-200 bg-green-50 max-w-md mx-auto text-center">
                <CardContent className="pt-6">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-900 mb-2">Inquiry Sent</h2>
                    <p className="text-green-700 mb-6">
                        Thanks for reaching out. We&apos;ll get back to you with a quote or to discuss details.
                    </p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>
                        Send Another
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="max-w-xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name / Company</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} className="bg-white/50 border-white/40 focus:bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="(555) 123-4567" {...field} className="bg-white/50 border-white/40 focus:bg-white" />
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
                                            <Input placeholder="email@example.com" {...field} className="bg-white/50 border-white/40 focus:bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Needed</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white/50 border-white/40 focus:bg-white">
                                                <SelectValue placeholder="Select service" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Transportation">General Transportation</SelectItem>
                                            <SelectItem value="Delivery Assistance">Delivery Assistance</SelectItem>
                                            <SelectItem value="Event Logistics">Event Logistics</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="pickupAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pickup Location (Optional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-white/50 border-white/40 focus:bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dropoffAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dropoff Location (Optional)</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-white/50 border-white/40 focus:bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Details / Measurements</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the cargo, timeline, etc." className="min-h-[100px] bg-white/50 border-white/40 focus:bg-white" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Submit Inquiry"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
