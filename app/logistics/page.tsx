import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, ShieldCheck } from "lucide-react"
import { LogisticsForm } from "@/components/logistics/LogisticsForm"

export const metadata: Metadata = {
    title: 'Logistics & Transportation | iLee LLC',
    description: 'Reliable light logistics and transportation services in NYC. Van service for deliveries, events, and more.',
}

export default function LogisticsPage() {
    return (
        <div className="relative min-h-screen pt-44 pb-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 -z-10" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -z-10 animate-pulse delay-500" />

            <div className="container mx-auto space-y-12 relative z-10">
                {/* Hero / Intro */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Logistics <span className="text-blue-600">& Transit</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Beyond water delivery. Reliable van transportation for moves, events, and business logistics in NYC.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass border-white/40 bg-white/60 hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                <Truck className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl">Cargo Transport</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                Need to move boxes, equipment, or supplies? Our van service is perfect for loads that need speed and careful handling.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="glass border-white/40 bg-white/60 hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl">Timely Deliveries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                Precision scheduled pickups and drop-offs. Real-time updates ensure your items arrive safely and exactly when needed.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="glass border-white/40 bg-white/60 hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl">Professional Service</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                Experienced drivers who master NYC streets. We treat your cargo with care and professionalism.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Inquiry Form */}
                <div className="glass p-8 rounded-3xl border-white/50 bg-white/50 shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Request a Quote</h2>
                        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                            Fill out the form below and we&apos;ll get back to you with availability and transparent pricing.
                        </p>
                    </div>
                    <LogisticsForm />
                </div>

                <div className="text-center text-sm text-slate-400">
                    <p>Licensed driver. Standard van capacity.</p>
                </div>
            </div>
        </div>
    )
}
