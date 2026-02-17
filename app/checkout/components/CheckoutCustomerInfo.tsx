"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface CheckoutCustomerInfoProps {
    formData: {
        name: string
        phone: string
        email: string
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData: (data: any) => void
}

export function CheckoutCustomerInfo({ formData, setFormData }: CheckoutCustomerInfoProps) {
    const handleChange = (field: string, value: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={e => handleChange("name", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => handleChange("phone", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => handleChange("email", e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
