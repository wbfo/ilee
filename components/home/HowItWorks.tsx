"use client"

import { ClipboardList, CheckCircle, Truck } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
    {
        icon: ClipboardList,
        title: "Place your order",
        description: "Submit your request in seconds. Select your brand, size, and quantity based on your needs.",
        color: "bg-blue-50 text-blue-600 border-blue-100",
        delay: 0
    },
    {
        icon: CheckCircle,
        title: "Choose delivery type",
        description: "Select one-time on-demand delivery for now, or set up a recurring schedule for peace of mind.",
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
        delay: 0.2
    },
    {
        icon: Truck,
        title: "We deliver 24/7",
        description: "Our professional team brings water directly to your door, office, or event.",
        color: "bg-cyan-50 text-cyan-600 border-cyan-100",
        delay: 0.4
    },
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-heading">How It Works</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">Simple, reliable delivery for your hydration needs. We&apos;ve made it easier than ever.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10 overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "0%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                            className="w-full h-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"
                        />
                    </div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: step.delay, duration: 0.6, type: "spring" }}
                            className="group flex flex-col items-center text-center glass-card p-8 rounded-3xl relative z-10 cursor-default"
                        >
                            <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} border shadow-inner group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <step.icon className="h-10 w-10 relative z-10 drop-shadow-sm" />
                            </div>

                            {/* Step Number Badge */}
                            <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/80 border border-white flex items-center justify-center text-sm font-bold text-slate-400 shadow-sm backdrop-blur-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {index + 1}
                            </div>

                            <h3 className="mb-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-heading">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-body">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
