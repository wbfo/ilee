"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { initialReviews } from "@/lib/mockData"

export function Testimonials() {
    // Get top 3 approved reviews
    const reviews = initialReviews
        .filter(r => r.status === "Approved")
        .slice(0, 3)

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
    }

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                        Trusted by Locals
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        See why homes and businesses across the Tri-State area choose iLee Moves.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="glass-card p-8 rounded-2xl flex flex-col relative group cursor-default"
                        >
                            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
                                <Quote className="w-10 h-10" />
                            </div>
                            <div className="flex-1 relative z-10">
                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            className={`w-4 h-4 ${starIndex < review.rating ? "text-yellow-400 fill-current drop-shadow-sm" : "text-gray-200"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-700 italic mb-6 text-lg leading-relaxed font-medium">&quot;{review.text}&quot;</p>
                            </div>
                            <div className="flex items-center gap-3 border-t border-slate-100/50 pt-4 mt-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{review.name}</p>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Verified Customer</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                        <Link href="/reviews">Read All Reviews</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

