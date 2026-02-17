import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { History, Users, Truck, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: 'About Us | iLee LLC',
    description: 'Learn about iLee Moves - the premier water delivery and light logistics service in the Tri-State area.',
}

export default function AboutPage() {
    return (
        <div className="relative min-h-screen pt-44 pb-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 -z-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[100px] -z-10 animate-pulse" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                        About <span className="text-blue-600">iLee Moves</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We keep the Tri-State area hydrated and moving. From a single van to a logistics network.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Mission */}
                    <div className="glass p-8 rounded-3xl border-white/50 bg-white/60 shadow-xl backdrop-blur-md relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-100/50 rounded-2xl">
                                    <History className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Our Story</h2>
                            </div>
                            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                                <p>
                                    iLee LLC started with a simple mission: make getting heavy, bulky water deliveries easier for New Yorkers. We realized that reliable logistics was the key to solving specific urban challenges.
                                </p>
                                <p>
                                    Today, we deliver thousands of gallons weekly, ensuring homes and offices never run dry, while expanding our fleet for general light logistics and transportation needs across the Tri-State area.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass p-8 rounded-3xl border-white/50 bg-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Customer First</h3>
                            <p className="text-slate-600 leading-relaxed">
                                We are obsessed with reliability. If we say we&apos;ll be there, we are there. 24/7 support and real-time communication are our standard.
                            </p>
                        </div>
                        <div className="glass p-8 rounded-3xl border-white/50 bg-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6">
                                <Truck className="w-6 h-6 text-cyan-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Logistics Excellence</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Our fleet is modernized and tracked for efficiency, minimizing our carbon footprint while maximizing speed and delivery precision.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8">
                        <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all">
                            <Link href="/contact">
                                Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
