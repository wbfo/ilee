"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/shop/ProductCard"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Truck, Search, X } from "lucide-react"

function ShopContent() {
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get("category")
    const brandParam = searchParams.get("brand")
    const deliveryParam = searchParams.get("delivery")

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all")
    const [sortOption, setSortOption] = useState<string>("bestsellers")

    const filteredProducts = useMemo(() => {
        let filtered = [...products]

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query)
            )
        }

        // Category Filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory)
        }

        // Brand Filter
        if (brandParam) {
            filtered = filtered.filter(p => p.brand.toLowerCase() === brandParam.toLowerCase())
        }

        // Sort Logic
        if (sortOption === "price-asc") {
            filtered.sort((a, b) => a.price - b.price)
        } else if (sortOption === "price-desc") {
            filtered.sort((a, b) => b.price - a.price)
        } else {
            // Best Sellers (manual or default order)
            // For now, default array order is fine or random
        }

        return filtered
    }, [searchQuery, selectedCategory, brandParam, sortOption])

    return (
        <div className="min-h-screen bg-slate-50 pt-44 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading">
                        {deliveryParam === "express" ? "⚡ Express Delivery (48 hrs)" : "Shop All Products"}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                        Bulk water and beverages delivered to your door.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-lg text-sm font-medium border border-primary/20">
                            <Truck className="w-4 h-4" />
                            <span>Standard Delivery Included</span>
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8 sticky top-24 z-30">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <Input
                                placeholder="Search products..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
                            {/* Category Chips */}
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${selectedCategory === "all" ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setSelectedCategory("water-beverages")}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${selectedCategory === "water-beverages" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-900"}`}
                                >
                                    Water & Beverages
                                </button>
                            </div>

                            {/* Sort */}
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bestsellers">Best Sellers</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-600">Try adjusting your search or filters</p>
                        <Button
                            variant="outline"
                            className="mt-6"
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedCategory("all")
                            }}
                        >
                            Clear All Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-12 p-6 bg-slate-100 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-600 text-center">
                        <strong>Note:</strong> iLee Moves is an independent bulk sourcing and delivery service and is not affiliated with the brands listed.
                        All product names, logos, and brands are property of their respective owners.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 pt-44 pb-16 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading products...</p>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    )
}
