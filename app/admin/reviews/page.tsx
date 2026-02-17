"use client"

import { useState } from "react"
import { initialReviews, Review } from "@/lib/mockData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Star, Check, X, Trash2 } from "lucide-react"

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(initialReviews)
    const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All")

    const filteredReviews = reviews.filter(r => filter === "All" || r.status === filter)

    const handleAction = (id: string, action: "Approve" | "Reject" | "Delete") => {
        if (action === "Delete") {
            setReviews(reviews.filter(r => r.id !== id))
            toast.success("Review deleted")
        } else {
            const newStatus = action === "Approve" ? "Approved" : "Rejected"
            setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r))
            toast.success(`Review ${newStatus.toLowerCase()}`)
        }
    }

    // Stats
    const pendingCount = reviews.filter(r => r.status === "Pending").length
    const approvedCount = reviews.filter(r => r.status === "Approved").length
    const avgRating = (reviews.filter(r => r.status === "Approved").reduce((acc, r) => acc + r.rating, 0) / (approvedCount || 1)).toFixed(1)

    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                <h1 className="text-3xl font-bold text-slate-900">Reviews Moderation</h1>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Pending Approval</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Live Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Avg Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                {avgRating} <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                    <span className="font-medium text-slate-700">Filter Status:</span>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Reviews</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* List */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[150px]">Date</TableHead>
                                <TableHead className="w-[150px]">Customer</TableHead>
                                <TableHead className="w-[100px]">Rating</TableHead>
                                <TableHead>Review</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReviews.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                                        No reviews found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredReviews.map((review) => (
                                    <TableRow key={review.id}>
                                        <TableCell className="text-slate-500">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">{review.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                {review.rating} <Star className="w-3 h-3 ml-1 text-yellow-500 fill-current" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-slate-600 max-w-md">
                                            &quot;{review.text}&quot;
                                        </TableCell>
                                        <TableCell>
                                            {review.deliveryType ? (
                                                <Badge variant="outline">{review.deliveryType}</Badge>
                                            ) : (
                                                <span className="text-slate-400 text-sm">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                review.status === "Approved" ? "default" :
                                                    review.status === "Pending" ? "outline" : "destructive"
                                            } className={
                                                review.status === "Approved" ? "bg-green-600" :
                                                    review.status === "Pending" ? "bg-amber-100 text-amber-800 border-amber-200" : ""
                                            }>
                                                {review.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {review.status === "Pending" && (
                                                    <>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleAction(review.id, "Approve")}>
                                                            <Check className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleAction(review.id, "Reject")}>
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-500" onClick={() => handleAction(review.id, "Delete")}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
