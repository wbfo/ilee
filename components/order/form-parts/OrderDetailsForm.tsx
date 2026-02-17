"use client"

import { useFormContext } from "react-hook-form"
import { Loader2 } from "lucide-react"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderFormValues } from "@/lib/schemas"
import { siteConfig } from "@/lib/siteConfig"

interface OrderDetailsFormProps {
    isSubmitting: boolean
}

export function OrderDetailsForm({ isSubmitting }: OrderDetailsFormProps) {
    const { control, watch } = useFormContext<OrderFormValues>()
    const watchBrand = watch("brand")
    const watchSize = watch("size")
    const watchDeliverySpeed = watch("deliverySpeed")

    return (
        <>
            <Card className="glass border-white/50 shadow-xl bg-white/70">
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select brand" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Poland Spring">Poland Spring</SelectItem>
                                            <SelectItem value="Nestlé Pure Life">Nestlé Pure Life</SelectItem>
                                            <SelectItem value="Member’s Mark">Member’s Mark</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {watchBrand === "Other" && (
                            <FormField
                                control={control}
                                name="otherBrand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specify Brand</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter brand name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size/Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="16.9oz bottles">16.9oz bottles (Case)</SelectItem>
                                            <SelectItem value="1L">1L bottles (Case)</SelectItem>
                                            <SelectItem value="5-gallon">5-gallon Jug</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {watchSize === "5-gallon" && (
                        <FormField
                            control={control}
                            name="dispenserRental"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Do you need dispenser rental?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-x-4"
                                        >
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="Yes" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Yes
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="No" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                </CardContent>
            </Card>

            <Card className="glass border-white/50 shadow-xl bg-white/70">
                <CardHeader>
                    <CardTitle>Payment & Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-slate-600">
                        We accept all major credit cards, Apple Pay, Square, and Zelle.
                    </p>

                    {/* Express Fee Display */}
                    {watchDeliverySpeed === "Express" && (
                        <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-200">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-blue-900">Express Delivery (48 hrs):</span>
                                <span className="font-bold text-blue-900 text-lg">$75</span>
                            </div>
                            <p className="text-xs text-blue-700">
                                Additional fee. Prioritized dispatch within 48 hours.
                            </p>
                        </div>
                    )}

                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        {siteConfig.deliveryTiming.confirmationNote}
                    </p>
                </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                    </>
                ) : (
                    "Submit Order Request"
                )}
            </Button>
        </>
    )
}
