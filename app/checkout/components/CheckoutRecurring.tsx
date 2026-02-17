"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface CheckoutRecurringProps {
    formData: {
        recurring: boolean
        recurringFrequency: string
        recurringStart: string
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData: (data: any) => void
}

export function CheckoutRecurring({ formData, setFormData }: CheckoutRecurringProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: string, value: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recurring Orders (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <label className="flex items-center gap-2">
                    <Checkbox
                        checked={formData.recurring}
                        onCheckedChange={(checked) => handleChange("recurring", !!checked)}
                    />
                    <span className="font-medium">Set up recurring delivery</span>
                </label>

                {formData.recurring && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Frequency</Label>
                            <Select value={formData.recurringFrequency} onValueChange={v => handleChange("recurringFrequency", v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Start Date</Label>
                            <Input
                                type="date"
                                value={formData.recurringStart}
                                onChange={e => handleChange("recurringStart", e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
