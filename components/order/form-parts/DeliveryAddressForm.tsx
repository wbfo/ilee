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

export function DeliveryAddressForm() {
    const { control } = useFormContext<OrderFormValues>()

    return (
        <Card className="glass border-white/50 shadow-xl bg-white/70">
            <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <FormField
                    control={control}
                    name="address1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="address2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Apt 4B" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                        control={control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ZIP</FormLabel>
                                <FormControl>
                                    <Input placeholder="10001" {...field} />
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
