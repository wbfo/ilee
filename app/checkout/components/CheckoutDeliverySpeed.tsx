"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TruckIcon, Zap } from "lucide-react"

interface CheckoutDeliverySpeedProps {
    deliverySpeed: "Standard" | "Express"
    setDeliverySpeed: (speed: "Standard" | "Express") => void
    expressFee: number
}

export function CheckoutDeliverySpeed({
    deliverySpeed,
    setDeliverySpeed,
    expressFee
}: CheckoutDeliverySpeedProps) {
    return (
        <Card className="border-2 border-blue-200">
            <CardHeader>
                <CardTitle>Delivery Speed</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={deliverySpeed} onValueChange={(v: "Standard" | "Express") => setDeliverySpeed(v)}>
                    <div className={`flex items-start space-x-3 p-4 border rounded-lg transition-all ${deliverySpeed === "Standard" ? "bg-green-50 border-green-200 ring-1 ring-green-600" : "bg-white border-slate-200"}`}>
                        <RadioGroupItem value="Standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                                <TruckIcon className="w-5 h-5 text-green-600" />
                                <span className="font-bold text-slate-900">Regular Delivery</span>
                            </div>
                            <p className="text-sm text-slate-600">Up to 5 business days</p>
                        </Label>
                        <span className="font-bold text-green-600">Included</span>
                    </div>

                    <div className={`flex items-start space-x-3 p-4 border rounded-lg transition-all ${deliverySpeed === "Express" ? "bg-blue-50 border-blue-200 ring-1 ring-blue-600" : "bg-white border-slate-200"}`}>
                        <RadioGroupItem value="Express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-5 h-5 text-blue-600" />
                                <span className="font-bold text-slate-900">Express Delivery</span>
                            </div>
                            <p className="text-sm text-slate-700">Within 48 hours (additional fee)</p>
                        </Label>
                        <span className="font-bold text-blue-600">+${expressFee.toFixed(2)}</span>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
    )
}
