"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CheckoutDeliveryAddressProps {
    formData: {
        address: string
        city: string
        state: string
        zip: string
        instructions: string
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData: (data: any) => void
}

export function CheckoutDeliveryAddress({ formData, setFormData }: CheckoutDeliveryAddressProps) {
    const handleChange = (field: string, value: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
                <CardDescription>We deliver 24/7 across the Tri-State Area.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={e => handleChange("address", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            required
                            value={formData.city}
                            onChange={e => handleChange("city", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state} onValueChange={v => handleChange("state", v)}>
                            <SelectTrigger id="state">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NY">New York</SelectItem>
                                <SelectItem value="NJ">New Jersey</SelectItem>
                                <SelectItem value="CT">Connecticut</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                            id="zip"
                            required
                            value={formData.zip}
                            onChange={e => handleChange("zip", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea
                        id="instructions"
                        placeholder="Gate code, loading dock info, etc."
                        value={formData.instructions}
                        onChange={e => handleChange("instructions", e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
