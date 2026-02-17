"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { toast } from "sonner"

import { useCart } from "@/components/providers/CartProvider"
import { Button } from "@/components/ui/button"

import { CheckoutCustomerInfo } from "./components/CheckoutCustomerInfo"
import { CheckoutDeliveryAddress } from "./components/CheckoutDeliveryAddress"
import { CheckoutDeliverySpeed } from "./components/CheckoutDeliverySpeed"
import { CheckoutRecurring } from "./components/CheckoutRecurring"
import { CheckoutPaymentMethod } from "./components/CheckoutPaymentMethod"
import { CheckoutOrderSummary } from "./components/CheckoutOrderSummary"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, deliverySpeed, setDeliverySpeed, subtotal, expressFee, total, clearCart } = useCart()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<"card" | "zelle" | "square">("card")
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "NY",
        zip: "",
        instructions: "",
        recurring: false,
        recurringFrequency: "weekly",
        recurringStart: "",
    })

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4">
                <div className="max-w-md mx-auto text-center">
                    <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
                    <p className="text-slate-600 mb-6">Add some products to get started</p>
                    <Button asChild>
                        <Link href="/shop">Browse Products</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const orderData = {
                customer: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: {
                        street: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zip: formData.zip,
                    },
                    instructions: formData.instructions,
                },
                items: items.map(item => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    equipment: item.equipment,
                })),
                deliverySpeed,
                expressFee,
                subtotal,
                total,
                paymentMethod,
                recurring: formData.recurring ? {
                    frequency: formData.recurringFrequency,
                    startDate: formData.recurringStart
                } : null,
                status: paymentMethod === "zelle" ? "Pending Payment" : "New",
            }

            const response = await fetch("/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            })

            if (!response.ok) {
                throw new Error("Failed to submit order")
            }

            const result = await response.json()

            // Clear cart and redirect
            clearCart()
            toast.success("Order submitted successfully!")
            router.push(`/order-confirmation?orderId=${result.orderId}`)
        } catch (error) {
            console.error("Order submission error:", error)
            toast.error("Failed to submit order. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Checkout</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        <CheckoutCustomerInfo formData={formData} setFormData={setFormData} />
                        <CheckoutDeliveryAddress formData={formData} setFormData={setFormData} />
                        <CheckoutDeliverySpeed deliverySpeed={deliverySpeed} setDeliverySpeed={setDeliverySpeed} expressFee={expressFee} />
                        <CheckoutRecurring formData={formData} setFormData={setFormData} />
                        <CheckoutPaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} total={total} />
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <CheckoutOrderSummary
                            items={items}
                            subtotal={subtotal}
                            deliverySpeed={deliverySpeed}
                            expressFee={expressFee}
                            total={total}
                            isSubmitting={isSubmitting}
                            paymentMethod={paymentMethod}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

