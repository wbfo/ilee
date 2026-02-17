"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { ReviewForm } from "@/components/reviews/ReviewForm"
import { initialReviews } from "@/lib/mockData"
import { siteConfig } from "@/lib/siteConfig"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReviewsPage() {
    const [reviews] = useState(initialReviews.filter(r => r.status === "Approved"))

    // Calculate stats
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
        : "N/A"

    return (
        <div className="min-h-screen bg-slate-50 pt-44 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                        Customer Reviews
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        See what our customers are saying about iLee Moves.
                    </p>
                </div>

                {/* Stats & Google */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-10 h-10 text-yellow-400 fill-current" />
                            <span className="text-5xl font-bold text-slate-900">{averageRating}</span>
                        </div>
                        <p className="text-slate-500 font-medium">Average Customer Rating</p>
                        <p className="text-sm text-slate-400">Based on {totalReviews} verified reviews</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center"
                    >
                        <div className="mb-4">
                            <span className="text-4xl">G</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Prefer Google?</h3>
                        <p className="text-slate-600 mb-4">We appreciate feedback on all platforms.</p>
                        <Button variant="outline" asChild>
                            <Link href={siteConfig.links.googleReviews} target="_blank">
                                Leave a Google Review
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Recent Feedback</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {reviews.length === 0 ? (
                            <p className="text-slate-500 italic">No reviews yet. Be the first!</p>
                        ) : (
                            reviews.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">{review.name}</h3>
                                            <div className="flex items-center gap-1 mt-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {review.deliveryType && (
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${review.deliveryType === "Express"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-slate-100 text-slate-700"
                                                }`}>
                                                {review.deliveryType} Delivery
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        &quot;{review.text}&quot;
                                    </p>
                                    <p className="text-xs text-slate-400 mt-4">
                                        Posted on {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Review Form */}
                <div className="border-t border-slate-200 pt-12">
                    <ReviewForm />
                </div>

            </div>
        </div>
    )
}
