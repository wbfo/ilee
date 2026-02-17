"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Check } from "lucide-react"
import { CartItem } from "@/components/providers/CartProvider"

interface CheckoutOrderSummaryProps {
    items: CartItem[]
    subtotal: number
    deliverySpeed: string
    expressFee: number
    total: number
    isSubmitting: boolean
    paymentMethod: "card" | "zelle" | "square"
}

export function CheckoutOrderSummary({
    items,
    subtotal,
    deliverySpeed,
    expressFee,
    total,
    isSubmitting,
    paymentMethod
}: CheckoutOrderSummaryProps) {
    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map(item => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                            <div>
                                <p className="font-medium text-slate-900">{item.product.name}</p>
                                <p className="text-slate-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Regular Delivery</span>
                        <span className="font-semibold text-green-600">Included</span>
                    </div>
                    {deliverySpeed === "Express" && (
                        <div className="flex justify-between text-sm">
                            <span className="text-blue-600 font-medium">Express Upgrade</span>
                            <span className="font-semibold text-blue-600">+${expressFee.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <p>By placing this order, you agree to our Terms of Service. Purchases are direct from iLee Moves.</p>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-cta hover:bg-cta/90 font-bold rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        paymentMethod === "zelle" ? "Place Order & Pay with Zelle" : "Place Order"
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}
