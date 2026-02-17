"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-transparent min-h-[90vh] flex items-center justify-center pt-48">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover -z-20 opacity-90"
            >
                <source src="/vid/video/hero-splash.mp4" type="video/mp4" />
            </video>

            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black/50 -z-10" />

            {/* Detailed Grid Background (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_40%,transparent_100%)] opacity-10 pointer-events-none" />

            {/* Ambient Glows - Enhanced */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

            <div className="container relative mx-auto px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Badge variant="outline" className="mb-6 backdrop-blur-md bg-black/40 border-white/20 text-blue-50 px-4 py-2 rounded-full shadow-lg hover:bg-black/50 transition-all cursor-default relative z-20">
                            <Timer className="mr-2 h-4 w-4 text-blue-300" />
                            <span className="font-semibold tracking-wide uppercase text-xs text-white">Premium Hydration</span>
                        </Badge>
                    </motion.div>

                    <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl leading-[1.1] font-heading drop-shadow-2xl">
                        24/7 Water Delivery <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 animate-gradient drop-shadow-sm block mt-4 pb-2">
                            Across the Tri-State
                        </span>
                    </h1>

                    <p className="mb-12 max-w-3xl text-lg text-slate-100 sm:text-xl md:text-2xl leading-relaxed font-body drop-shadow-md font-medium">
                        Experience the purest hydration delivered to your door. On-demand and recurring service for homes and businesses.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
                        <Button size="lg" className="group relative w-full sm:w-auto bg-cta hover:bg-cta/90 text-cta-foreground text-lg px-8 py-6 h-auto rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-2 border-white/10" asChild>
                            <Link href="/shop">
                                <span className="relative z-10 flex items-center font-bold">
                                    Order Water <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 h-auto rounded-2xl border-white/50 text-white bg-black/50 backdrop-blur-md hover:bg-black/70 hover:text-white hover:border-white transition-all duration-300 shadow-lg font-bold" asChild>
                            <Link href="/shop?delivery=recurring">Set Up Recurring</Link>
                        </Button>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-6 text-sm font-medium text-white">
                        <div className="flex items-center backdrop-blur-md bg-black/40 px-6 py-3 rounded-xl border border-white/20 hover:bg-black/50 transition-colors shadow-lg">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-400" />
                            <span className="font-semibold">No Contracts</span>
                        </div>
                        <div className="flex items-center backdrop-blur-md bg-black/40 px-6 py-3 rounded-xl border border-white/20 hover:bg-black/50 transition-colors shadow-lg">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-400" />
                            <span className="font-semibold">Same-Day Delivery</span>
                        </div>
                    </div>
                </motion.div>
            </div>


        </section>
    )
}
