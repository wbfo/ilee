"use client"

import { useState } from "react"
import { initialOrders, Order } from "@/lib/mockData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Clock, Search, Send, Truck } from "lucide-react"
import Link from "next/link"

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders)
    const [filter, setFilter] = useState<"All" | "Express" | "Standard">("All")
    const [searchTerm, setSearchTerm] = useState("")

    // Sorting: Express first, then by date (newest first)
    const sortedOrders = [...orders].sort((a, b) => {
        // Priority 1: Express over Standard
        if (a.deliverySpeed === "Express" && b.deliverySpeed !== "Express") return -1
        if (a.deliverySpeed !== "Express" && b.deliverySpeed === "Express") return 1

        // Priority 2: Newest Date first
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    const filteredOrders = sortedOrders.filter(order => {
        const matchesFilter = filter === "All" || order.deliverySpeed === filter
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleStatusUpdate = (id: string, newStatus: Order["status"]) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
        toast.success(`Order ${id} updated to ${newStatus}`)
    }

    const handleSendInvoice = (id: string) => {
        setOrders(orders.map(o =>
            o.id === id ? {
                ...o,
                invoiceSentAt: new Date().toISOString(),
                status: "Confirmed" // Auto-confirm on invoice send for demo
            } : o
        ))
        toast.success(`Invoice sent for Order ${id}`)
    }

    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Orders Dashboard</h1>
                        <p className="text-slate-500">Manage deliveries and invoicing.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/admin/settings">Settings</Link>
                        </Button>
                        <Button variant="outline">Export CSV</Button>
                        <Button>Refresh</Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Search className="w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search order # or customer..."
                            className="w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <span className="text-sm font-medium text-slate-700">Filter:</span>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Orders</SelectItem>
                                <SelectItem value="Express">Express Only</SelectItem>
                                <SelectItem value="Standard">Standard Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[100px]">Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                                        No orders found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-sm text-slate-600 max-w-[200px] truncate" title={order.items}>
                                            {order.items}
                                        </TableCell>
                                        <TableCell>${order.total.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {order.deliverySpeed === "Express" ? (
                                                <div className="flex flex-col gap-1">
                                                    <Badge className="bg-blue-600 hover:bg-blue-700 flex w-fit items-center gap-1">
                                                        <Clock className="w-3 h-3" /> EXPRESS (48 hrs)
                                                    </Badge>
                                                    <span className="text-xs text-blue-600 font-semibold">+$75</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1">
                                                    <Badge variant="secondary" className="text-slate-600 flex w-fit items-center gap-1">
                                                        <Truck className="w-3 h-3" /> STANDARD
                                                    </Badge>
                                                    <span className="text-xs text-slate-500">up to 4 business days</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                order.status === "Pending Confirmation" ? "destructive" :
                                                    order.status === "Confirmed" ? "default" :
                                                        order.status === "Dispatched" ? "secondary" : "outline"
                                            } className={
                                                order.status === "Confirmed" ? "bg-green-600 hover:bg-green-700" : ""
                                            }>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {!order.invoiceSentAt && (
                                                    <Button size="sm" variant="outline" className="h-8 gap-1 text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => handleSendInvoice(order.id)}>
                                                        <Send className="w-3 h-3" /> Invoice
                                                    </Button>
                                                )}
                                                {order.status === "Confirmed" && (
                                                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => handleStatusUpdate(order.id, "Dispatched")}>
                                                        Dispatch
                                                    </Button>
                                                )}
                                                {order.status === "Dispatched" && (
                                                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => handleStatusUpdate(order.id, "Delivered")}>
                                                        Mark Done
                                                    </Button>
                                                )}
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
