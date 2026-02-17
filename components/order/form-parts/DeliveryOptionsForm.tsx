"use client"

import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import {
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderFormValues } from "@/lib/schemas"

export function DeliveryOptionsForm() {
    const { control, watch } = useFormContext<OrderFormValues>()
    const watchDeliveryType = watch("deliveryType")

    return (
        <Card className="glass border-white/50 shadow-xl bg-white/70">
            <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">

                {/* Delivery Speed - REQUIRED */}
                <FormField
                    control={control}
                    name="deliverySpeed"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Delivery Speed <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="Standard" className="peer sr-only" />
                                        </FormControl>
                                        <FormLabel className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer h-full">
                                            <span className="text-lg font-semibold text-slate-900 mb-1">Standard Delivery</span>
                                            <span className="text-sm text-slate-500">Typically up to 4 business days</span>
                                            <span className="text-xs text-slate-400 mt-1">(may be sooner depending on queue)</span>
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="Express" className="peer sr-only" />
                                        </FormControl>
                                        <FormLabel className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer h-full relative overflow-hidden">
                                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl font-semibold">PRIORITY</div>
                                            <span className="text-lg font-semibold text-slate-900 mb-1">Express Delivery</span>
                                            <span className="text-sm text-slate-500">Within 48 hours (prioritized)</span>
                                            <span className="mt-2 text-base font-bold text-blue-600">+$75</span>
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="deliveryType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Delivery Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="On-Demand" className="peer sr-only" />
                                        </FormControl>
                                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer text-center h-full">
                                            <span className="text-lg font-semibold text-slate-900 mb-1">On-Demand</span>
                                            <span className="text-sm text-slate-500">One-time Order</span>
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="Scheduled" className="peer sr-only" />
                                        </FormControl>
                                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer text-center h-full">
                                            <span className="text-lg font-semibold text-slate-900 mb-1">Scheduled</span>
                                            <span className="text-sm text-slate-500">Pick a Date</span>
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="Recurring" className="peer sr-only" />
                                        </FormControl>
                                        <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer text-center h-full">
                                            <span className="text-lg font-semibold text-slate-900 mb-1">Recurring</span>
                                            <span className="text-sm text-slate-500">Automated</span>
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Scheduled Options */}
                {watchDeliveryType === "Scheduled" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pl-4 border-l-2 border-blue-500 space-y-4"
                    >
                        <FormField
                            control={control}
                            name="scheduledDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="scheduledTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Time</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Morning">Morning (8am - 12pm)</SelectItem>
                                            <SelectItem value="Afternoon">Afternoon (12pm - 4pm)</SelectItem>
                                            <SelectItem value="Evening">Evening (4pm - 8pm)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}

                {/* Recurring Options */}
                {watchDeliveryType === "Recurring" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pl-4 border-l-2 border-blue-500 space-y-4"
                    >
                        <FormField
                            control={control}
                            name="recurringFrequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="How often?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Weekly">Weekly</SelectItem>
                                            <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={control}
                                name="recurringDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred Day</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Day" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Monday">Monday</SelectItem>
                                                <SelectItem value="Tuesday">Tuesday</SelectItem>
                                                <SelectItem value="Wednesday">Wednesday</SelectItem>
                                                <SelectItem value="Thursday">Thursday</SelectItem>
                                                <SelectItem value="Friday">Friday</SelectItem>
                                                <SelectItem value="Saturday">Saturday</SelectItem>
                                                <SelectItem value="Sunday">Sunday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="recurringTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred Time Window</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Morning">Morning (8am - 12pm)</SelectItem>
                                                <SelectItem value="Afternoon">Afternoon (12pm - 4pm)</SelectItem>
                                                <SelectItem value="Evening">Evening (4pm - 8pm)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <p className="text-sm text-slate-500 italic">
                            *Recurring preferences are stored locally. We will contact you to confirm the first delivery.
                        </p>
                    </motion.div>
                )}

                <FormField
                    control={control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Delivery Notes</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Gate code, elevator info, leave at door..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}
