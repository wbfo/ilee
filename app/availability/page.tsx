import { Suspense } from "react"
import { AvailabilityCheck } from "@/components/availability/AvailabilityCheck"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Package } from "lucide-react"

export const metadata = {
    title: "24/7 Water Delivery Availability | Tri-State Area",
    description: "Check our 24/7 water delivery service area across New York, New Jersey, and Connecticut.",
}

export default function AvailabilityPage() {
    return (
        <div className="relative min-h-screen pt-44 pb-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

            <div className="container mx-auto space-y-12 relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                        Availability & <span className="text-blue-600">Coverage</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We primarily serve the NYC Metro area, including residential and commercial locations.
                    </p>
                </div>

                <div className="flex justify-center">
                    <Suspense fallback={<div>Loading checker...</div>}>
                        <div className="glass p-8 rounded-3xl border-white/50 bg-white/60 shadow-2xl backdrop-blur-xl w-full max-w-lg">
                            <AvailabilityCheck />
                        </div>
                    </Suspense>
                </div>

                <div className="text-center">
                    <p className="text-slate-500 italic">
                        We serve the entire Tri-State Area (NY, NJ, CT). All orders are confirmed before dispatch.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass border-white/40 bg-white/60 hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                Delivery Speed
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-600">
                            <ul className="space-y-3 font-medium">
                                <li className="flex items-start">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 mt-1.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-bold text-blue-600">Express (48 hrs)</span>
                                        <span className="text-sm block text-slate-500">+$75 - Prioritized</span>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 rounded-full bg-slate-500 mr-2 mt-1.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-bold">Standard</span>
                                        <span className="text-sm block text-slate-500">Up to 4 business days</span>
                                    </div>
                                </li>
                                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2" /> 24/7 Available</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/40 bg-white/60 hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                </div>
                                Service Area
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-600">
                            <p className="mb-4">Coverage across the Tri-State.</p>
                            <ul className="space-y-3 font-medium">
                                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-2" /> New York</li>
                                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2" /> New Jersey</li>
                                <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-600 mr-2" /> Connecticut</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/40 bg-white/60 hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                Bulk & Recurring
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-600">
                            <p className="font-medium leading-relaxed">
                                Need weekly deliveries for your office or construction site?
                                We specialize in recurring logistics.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
