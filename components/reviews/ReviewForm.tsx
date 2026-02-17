"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Star, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { reviewSchema, ReviewFormValues } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function ReviewForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            rating: 5,
            comment: "",
            deliveryType: undefined,
            orderId: "",
        },
    })

    async function onSubmit(data: ReviewFormValues) {
        setIsSubmitting(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log("Review Submitted:", data)

            setIsSuccess(true)
            toast.success("Review submitted for approval!")
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center"
            >
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h2>
                        <p className="text-green-700 mb-6">
                            Your review has been submitted. It will be posted after a quick moderation check.
                        </p>
                        <Button variant="outline" className="mr-2" onClick={() => {
                            setIsSuccess(false)
                            form.reset()
                        }}>
                            Write Another Review
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        )
    }

    return (
        <Card className="glass border-white/50 shadow-xl bg-white/70 max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
                <CardDescription>Tell us about your delivery experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name (First + Last Initial)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane D." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Standard">Standard Delivery</SelectItem>
                                                <SelectItem value="Express">Express Delivery</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`focus:outline-none transition-colors ${field.value >= star ? "text-yellow-400" : "text-gray-300"
                                                        }`}
                                                    onClick={() => field.onChange(star)}
                                                >
                                                    <Star className="w-8 h-8 fill-current" />
                                                </button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Share your experience..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4 border-t border-slate-200">
                            <h4 className="text-sm font-semibold mb-3 text-slate-700">Verification (Not Published)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="jane@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="(555) 123-4567" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="orderId"
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel>Order # (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 12345" {...field} />
                                        </FormControl>
                                        <FormDescription>Helps us verify your purchase faster.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                                </>
                            ) : (
                                "Submit Review"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
