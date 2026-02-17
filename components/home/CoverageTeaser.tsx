"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function CoverageTeaser() {
    const [zip, setZip] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (zip.trim()) {
            router.push(`/availability?zip=${encodeURIComponent(zip.trim())}`)
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <MapPin className="w-64 h-64" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Check Delivery Coverage</h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                            See if we deliver to your neighborhood. Enter your ZIP code to check availability and estimated delivery times.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <Input
                                placeholder="Enter ZIP Code"
                                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12 text-lg"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                type="text"
                                pattern="[0-9]*"
                                inputMode="numeric"
                            />
                            <Button type="submit" size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 font-semibold">
                                Check <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
