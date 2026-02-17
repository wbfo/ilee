"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Mail, Phone } from "lucide-react"

function OrderConfirmationContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Card className="border-green-200 bg-green-50 mb-6">
                    <CardContent className="pt-6 text-center">
                        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-green-900 mb-2">Order Confirmed!</h1>
                        <p className="text-lg text-green-700 mb-4">
                            Thank you for your order.
                        </p>
                        {orderId && (
                            <div className="bg-white p-4 rounded-lg inline-block">
                                <p className="text-sm text-slate-600 mb-1">Order Number</p>
                                <p className="text-2xl font-bold text-slate-900">{orderId}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">What happens next?</h2>
                            <ol className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">We&apos;ll confirm availability</h3>
                                        <p className="text-slate-600">Our team will verify stock and schedule your delivery.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">You&apos;ll receive your invoice</h3>
                                        <p className="text-slate-600">We&apos;ll send payment instructions via email.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">We&apos;ll deliver your order</h3>
                                        <p className="text-slate-600">Standard delivery arrives in 3-5 business days. Express deliveries are prioritized and arrive within 48 hours.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="font-bold text-slate-900 mb-3">Payment Methods</h3>
                            <p className="text-slate-700 text-sm">
                                We accept: All major credit cards, Apple Pay, Square, and Zelle
                            </p>
                        </div>

                        <div className="bg-slate-100 p-6 rounded-lg">
                            <h3 className="font-bold text-slate-900 mb-3">Questions?</h3>
                            <div className="space-y-2">
                                <a href="mailto:ileellcrealty@gmail.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                    <Mail className="w-4 h-4" />
                                    <span>ileellcrealty@gmail.com</span>
                                </a>
                                <a href="tel:718-908-2598" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                    <Phone className="w-4 h-4" />
                                    <span>(718) 908-2598</span>
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button asChild variant="outline" className="flex-1">
                                <Link href="/shop">Continue Shopping</Link>
                            </Button>
                            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading confirmation...</p>
                </div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    )
}
