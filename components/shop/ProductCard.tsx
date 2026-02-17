"use client"

import { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingBag, TruckIcon } from "lucide-react"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-slate-200">
            <CardContent className="p-0">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 h-48 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <ShoppingBag className="w-16 h-16 text-slate-300" />
                    )}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                {product.brand}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-medium">
                                {product.purchaseType}
                            </span>
                        </div>
                        <h3 className="font-bold text-slate-900 leading-tight line-clamp-2 min-h-[40px]">
                            {product.name}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-1">
                            {product.packDetails}
                        </p>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {product.priceLabel ? (
                                    <span className="text-xl">{product.priceLabel}</span>
                                ) : (
                                    `$${product.price.toFixed(2)}`
                                )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                <TruckIcon className="w-3 h-3" />
                                <span>Delivery Included</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        asChild
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        disabled={!product.inStock}
                    >
                        <Link href={`/product/${product.slug}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
