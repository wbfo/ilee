"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { orderFormSchema, OrderFormValues } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"

import { ContactInfoForm } from "./form-parts/ContactInfoForm"
import { DeliveryAddressForm } from "./form-parts/DeliveryAddressForm"
import { DeliveryOptionsForm } from "./form-parts/DeliveryOptionsForm"
import { OrderDetailsForm } from "./form-parts/OrderDetailsForm"

export function OrderForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const searchParams = useSearchParams()

    // Default values from URL or fallbacks
    // Default values from URL or fallbacks
    const brandParam = searchParams.get("brand")
    let defaultBrand: OrderFormValues["brand"] = "Poland Spring"

    if (brandParam === "Poland Spring" || brandParam === "Nestlé Pure Life" || brandParam === "Member’s Mark" || brandParam === "Other") {
        defaultBrand = brandParam
    }

    const deliveryParam = searchParams.get("deliveryType")
    let defaultDelivery: OrderFormValues["deliveryType"] = "On-Demand"

    if (deliveryParam === "On-Demand" || deliveryParam === "Scheduled" || deliveryParam === "Recurring") {
        defaultDelivery = deliveryParam
    }

    const frequencyParam = searchParams.get("frequency")
    let defaultFrequency: OrderFormValues["recurringFrequency"] = undefined

    if (frequencyParam === "Weekly" || frequencyParam === "Bi-Weekly" || frequencyParam === "Monthly") {
        defaultFrequency = frequencyParam
    }

    const form = useForm<OrderFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(orderFormSchema) as any,
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "NY",
            zip: "",
            deliveryType: defaultDelivery,
            scheduledDate: "",
            scheduledTime: "Morning",
            recurringFrequency: defaultFrequency,
            recurringDay: "",
            recurringTime: "Morning",
            notes: "",
            brand: defaultBrand,
            otherBrand: "",
            quantity: 1,
            size: "16.9oz bottles",
            dispenserRental: undefined,
            deliverySpeed: "Standard",
        },
    })

    async function onSubmit(data: OrderFormValues) {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to submit order")
            }

            console.log("Order Submitted successfully:", data)
            setIsSuccess(true)
            toast.success("Order request received!")
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
                        <h2 className="text-2xl font-bold text-green-900 mb-2">Request Received</h2>
                        <p className="text-green-700 mb-6">
                            We received your order. We’ll confirm availability and send your invoice/payment instructions.
                        </p>
                        <Button variant="outline" className="mr-2" onClick={() => {
                            setIsSuccess(false)
                            form.reset()
                        }}>
                            Place Another Order
                        </Button>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <a href="/reviews">Leave a Review</a>
                        </Button>
                    </CardContent>
                </Card>
            </motion.div >
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <ContactInfoForm />
                    <DeliveryAddressForm />
                    <DeliveryOptionsForm />
                    <OrderDetailsForm isSubmitting={isSubmitting} />
                </form>
            </Form>
        </div>
    )
}
