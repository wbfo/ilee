"use client"

import { useState, useEffect } from "react"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AdminSettingsPage() {
    const [expressFee, setExpressFee] = useState(75)
    const [smsEnabled, setSmsEnabled] = useState(false)
    const [productsJson, setProductsJson] = useState(JSON.stringify(products, null, 2))

    // Load initial settings
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedFee = localStorage.getItem("admin-express-fee")
            if (savedFee) setExpressFee(Number(savedFee))
        }
    }, [])

    const handleSaveGeneral = () => {
        localStorage.setItem("admin-express-fee", expressFee.toString())
        toast.success("General settings saved")
    }

    const handleSaveProducts = () => {
        try {
            const parsed = JSON.parse(productsJson)
            if (!Array.isArray(parsed)) throw new Error("Products must be an array")
            // In a real app, this would POST to an API to update the file or DB
            console.log("Saving products:", parsed)
            toast.success("Product catalog updated (Demo)")
        } catch {
            toast.error("Invalid JSON format")
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">

                <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/orders">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Orders
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Settings</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Generals Settings</CardTitle>
                        <CardDescription>Configure store-wide parameters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Express Delivery Fee ($)</Label>
                                <p className="text-sm text-slate-500">
                                    Additional charge for 48-hour delivery.
                                </p>
                            </div>
                            <Input
                                type="number"
                                value={expressFee}
                                onChange={(e) => setExpressFee(Number(e.target.value))}
                                className="w-24 text-right"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">SMS Order Alerts</Label>
                                <p className="text-sm text-slate-500">
                                    Send text notifications to 718-908-2598.
                                </p>
                            </div>
                            <Switch
                                checked={smsEnabled}
                                onCheckedChange={setSmsEnabled}
                            />
                        </div>
                        <Button onClick={handleSaveGeneral}>
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Catalog Data</CardTitle>
                        <CardDescription>
                            Directly edit product data JSON. USE CAUTION.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            className="font-mono text-xs h-[500px]"
                            value={productsJson}
                            onChange={(e) => setProductsJson(e.target.value)}
                        />
                        <Button onClick={handleSaveProducts}>
                            <Save className="w-4 h-4 mr-2" /> Update Catalog
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
