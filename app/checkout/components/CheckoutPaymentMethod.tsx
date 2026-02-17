"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone } from "lucide-react"

interface CheckoutPaymentMethodProps {
    paymentMethod: "card" | "zelle" | "square"
    setPaymentMethod: (method: "card" | "zelle" | "square") => void
    total: number
}

export function CheckoutPaymentMethod({
    paymentMethod,
    setPaymentMethod,
    total
}: CheckoutPaymentMethodProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(v: "card" | "zelle" | "square") => setPaymentMethod(v)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all ${paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
                        <RadioGroupItem value="card" id="card" className="sr-only" />
                        <Label htmlFor="card" className="cursor-pointer block">
                            <CreditCard className="w-6 h-6 mb-2 text-slate-700" />
                            <div className="font-semibold">Credit/Debit Card</div>
                            <div className="text-xs text-slate-500">Secure checkout</div>
                        </Label>
                    </div>

                    <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all ${paymentMethod === "zelle" ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
                        <RadioGroupItem value="zelle" id="zelle" className="sr-only" />
                        <Label htmlFor="zelle" className="cursor-pointer block">
                            <div className="w-6 h-6 mb-2 flex items-center justify-center font-bold text-purple-600 border border-purple-600 rounded-full text-[10px]">Z</div>
                            <div className="font-semibold">Pay with Zelle</div>
                            <div className="text-xs text-slate-500">Instant transfer</div>
                        </Label>
                    </div>

                    <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all ${paymentMethod === "square" ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
                        <RadioGroupItem value="square" id="square" className="sr-only" />
                        <Label htmlFor="square" className="cursor-pointer block bg-opacity-50 opacity-60">
                            <Smartphone className="w-6 h-6 mb-2 text-slate-700" />
                            <div className="font-semibold">Square</div>
                            <div className="text-xs text-slate-500">Coming soon</div>
                        </Label>
                    </div>
                </RadioGroup>

                <div className="mt-6">
                    {paymentMethod === "card" && (
                        <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                            <p className="text-sm text-slate-600 mb-4">Enter your card details (Secure via Stripe)</p>
                            <div className="space-y-4 max-w-sm">
                                <Input placeholder="Card number" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="MM/YY" />
                                    <Input placeholder="CVC" />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === "zelle" && (
                        <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
                            <h4 className="font-semibold text-purple-900 mb-2">Zelle Payment Instructions</h4>
                            <p className="text-sm text-purple-800 mb-2">
                                Please send the total amount of <strong>${total.toFixed(2)}</strong> to:
                            </p>
                            <div className="text-lg font-bold text-slate-900 mb-2">ileellcrealty@gmail.com</div>
                            <p className="text-xs text-slate-500">
                                Your order will be marked as &quot;Pending Payment&quot; until we confirm receipt.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
