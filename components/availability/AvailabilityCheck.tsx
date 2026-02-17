"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, AlertCircle, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AvailabilityCheck() {
    const searchParams = useSearchParams()
    const initialZip = searchParams.get("zip") || ""
    const [zip, setZip] = useState(initialZip)
    const [status, setStatus] = useState<"idle" | "likely" | "check">("idle")

    const checkCoverage = (zipCode: string) => {
        // Simple heuristic: NYC zips often start with 10 or 11
        if (zipCode.startsWith("10") || zipCode.startsWith("11")) {
            setStatus("likely")
        } else {
            setStatus("check")
        }
    }

    useEffect(() => {
        if (initialZip) {
            // eslint-disable-next-line
            checkCoverage(initialZip)
        }
    }, [initialZip])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        checkCoverage(zip)
    }

    return (
        <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="text-blue-600" />
                    Check Your Area
                </CardTitle>
                <CardDescription>Enter your ZIP code to see if we&apos;re in your neighborhood.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <Input
                        placeholder="Enter ZIP Code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="text-lg"
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Check</Button>
                </form>

                {status === "likely" && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle>Good news!</AlertTitle>
                        <AlertDescription>
                            We likely cover this area (NYC Metro).
                            <br />
                            <strong>Coverage varies</strong>. We will confirm exact availability when you place your order.
                        </AlertDescription>
                    </Alert>
                )}

                {status === "check" && (
                    <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertTitle>Coverage Unconfirmed</AlertTitle>
                        <AlertDescription>
                            We might not be in this area regularly yet.
                            Please submit an order request, and we&apos;ll let you know if we can make it happen!
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
