import Link from "next/link"
import { Building2, Truck, Users, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BusinessSection() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Business, Offices & Events</h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
                            Keep your team and guests hydrated. We offer flexible recurring delivery schedules for offices, construction sites, property managers, and retail locations.
                        </p>

                        <ul className="space-y-6 mb-8 w-full max-w-md mx-auto md:mx-0">
                            {[
                                { icon: Building2, text: "Offices & Corporate" },
                                { icon: Truck, text: "Construction Sites" },
                                { icon: Users, text: "Property Managers" },
                                { icon: Store, text: "Retail & Events" },
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-700 font-medium justify-center md:justify-start glass-card p-4 rounded-xl cursor-default group">
                                    <div className="mr-4 p-2 bg-blue-50/50 rounded-lg shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                                        <item.icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="group-hover:text-blue-700 transition-colors">{item.text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="w-full flex justify-center md:justify-start">
                            <Button variant="outline" size="lg" className="border-blue-200 hover:bg-blue-50 text-blue-700" asChild>
                                <Link href="/shop?category=Facility+%26+Office">Set Up Recurring Delivery</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Abstract visualization of bulk */}
                        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white border border-slate-200 rounded-3xl p-8 shadow-xl flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white group-hover:scale-105 transition-transform duration-700" />

                            {/* Decorative background circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100/50 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 animate-pulse" />
                                    <div className="relative bg-white p-6 rounded-2xl shadow-lg shadow-blue-200 border border-blue-50">
                                        <div className="grid grid-cols-2 gap-1 mb-1">
                                            <div className="w-8 h-8 bg-blue-500 rounded-md" />
                                            <div className="w-8 h-8 bg-blue-500 rounded-md" />
                                        </div>
                                        <div className="w-full h-3 bg-slate-800 rounded-sm mt-1" />
                                    </div>
                                    <Truck className="absolute -bottom-2 -right-4 w-10 h-10 text-slate-800 drop-shadow-lg" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Bulk Delivery</h3>
                                <p className="text-slate-500 font-medium">Pallet & Truckload Options</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
