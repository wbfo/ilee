"use client"

import { useFormContext } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderFormValues } from "@/lib/schemas"

export function ContactInfoForm() {
    const { control } = useFormContext<OrderFormValues>()

    return (
        <Card className="glass border-white/50 shadow-xl bg-white/70">
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={control}
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
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="jane@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
