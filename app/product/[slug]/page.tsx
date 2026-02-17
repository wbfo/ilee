"use client"

import { useState, use } from "react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { getProductBySlug } from "@/lib/products"
import { useCart } from "@/components/providers/CartProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Check, ShoppingCart, Truck, Package, Star, Calendar } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const product = getProductBySlug(slug)
    const { addItem, setDeliverySpeed } = useCart()
    const router = useRouter()

    const [quantity, setQuantity] = useState(1)
    const [equipment, setEquipment] = useState<string[]>([])
    const [localDeliverySpeed, setLocalDeliverySpeed] = useState<"Standard" | "Express">("Standard")
    const [isRecurring, setIsRecurring] = useState(false)

    // Reviews state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [reviews] = useState<any[]>([])
    const [showReviewForm, setShowReviewForm] = useState(false)

    if (!product) {
        notFound()
    }

    const expressFee = 75.00
    const displayedPrice = product.price
    const totalPrice = (product.price * quantity) + (localDeliverySpeed === "Express" ? expressFee : 0)

    const handleAddToCart = () => {
        // We set the global delivery speed based on user choice here for convenience
        setDeliverySpeed(localDeliverySpeed)
        addItem(product, quantity, equipment)
    }

    const handleBuyNow = () => {
        setDeliverySpeed(localDeliverySpeed)
        addItem(product, quantity, equipment)
        router.push("/checkout")
    }

    const toggleEquipment = (item: string) => {
        setEquipment(prev =>
            prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-44 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Shop
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <Card className="overflow-hidden border-0 shadow-lg">
                            <CardContent className="p-0">
                                <div className="relative bg-white aspect-square flex items-center justify-center p-8">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                                    ) : (
                                        <Package className="w-32 h-32 text-slate-300" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <Truck className="w-8 h-8 text-green-600 mb-2" />
                                <span className="text-xs font-semibold text-slate-900">Delivery Included</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <Check className="w-8 h-8 text-blue-600 mb-2" />
                                <span className="text-xs font-semibold text-slate-900">Quality Guaranteed</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <Package className="w-8 h-8 text-purple-600 mb-2" />
                                <span className="text-xs font-semibold text-slate-900">Bulk Sourcing</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{product.brand}</span>
                                <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-medium">
                                    {product.purchaseType}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-lg text-slate-600">
                                {product.description}
                            </p>

                            {/* Rating Teaser */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-sm text-slate-500">(No reviews yet)</span>
                            </div>
                        </div>

                        {/* Price & Specs */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-baseline justify-between mb-4">
                                <div className="text-4xl font-bold text-slate-900">
                                    {product.priceLabel ? (
                                        <span className="text-3xl">{product.priceLabel}</span>
                                    ) : (
                                        `$${displayedPrice.toFixed(2)}`
                                    )}
                                </div>
                                <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                    <Truck className="w-3 h-3" />
                                    Delivery Included
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-2">Specifications</h3>
                                <p className="text-slate-700 font-medium">{product.packDetails}</p>
                            </div>
                        </div>

                        {/* Order Options */}
                        <Card className="border-2 border-blue-100 bg-blue-50/50">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Order Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Delivery Speed Selector */}
                                <div>
                                    <Label className="block mb-3 font-semibold text-slate-900">Delivery Speed</Label>
                                    <RadioGroup value={localDeliverySpeed} onValueChange={(v: "Standard" | "Express") => setLocalDeliverySpeed(v)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className={`flex items-start space-x-2 p-3 rounded-lg border bg-white cursor-pointer ${localDeliverySpeed === "Standard" ? "border-green-500 ring-1 ring-green-500" : "border-slate-200"}`} onClick={() => setLocalDeliverySpeed("Standard")}>
                                            <RadioGroupItem value="Standard" id="speed-std" className="mt-1" />
                                            <div className="flex-1">
                                                <Label htmlFor="speed-std" className="font-semibold cursor-pointer">Regular Delivery</Label>
                                                <p className="text-xs text-slate-500">Up to 5 business days</p>
                                                <p className="text-xs font-bold text-green-600 mt-1">Included ($0.00)</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-start space-x-2 p-3 rounded-lg border bg-white cursor-pointer ${localDeliverySpeed === "Express" ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-200"}`} onClick={() => setLocalDeliverySpeed("Express")}>
                                            <RadioGroupItem value="Express" id="speed-exp" className="mt-1" />
                                            <div className="flex-1">
                                                <Label htmlFor="speed-exp" className="font-semibold cursor-pointer">Express Delivery</Label>
                                                <p className="text-xs text-slate-500">Within 48 hours</p>
                                                <p className="text-xs font-bold text-blue-600 mt-1">+${expressFee.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Recurring Toggle */}
                                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                                    <Checkbox
                                        id="recurring"
                                        checked={isRecurring}
                                        onCheckedChange={(c) => setIsRecurring(!!c)}
                                        className="mt-1"
                                    />
                                    <div>
                                        <Label htmlFor="recurring" className="font-semibold cursor-pointer flex items-center gap-2">
                                            Subscribe & Schedule <Calendar className="w-4 h-4 text-blue-600" />
                                        </Label>
                                        <p className="text-xs text-slate-500">
                                            Enable recurring delivery at checkout (Weekly, Bi-Weekly, Monthly).
                                        </p>
                                    </div>
                                </div>

                                {/* Equipment Selector */}
                                <div>
                                    <Label className="block mb-3 font-semibold text-slate-900 flex items-center gap-2">
                                        <Package className="w-4 h-4" /> Required Equipment
                                    </Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {["Forklift", "Pallet Jack", "Loading Dock"].map((item) => (
                                            <label key={item} className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${equipment.includes(item) ? "bg-blue-100 border-blue-300" : "bg-white border-slate-200 hover:bg-slate-50"}`}>
                                                <Checkbox
                                                    checked={equipment.includes(item)}
                                                    onCheckedChange={() => toggleEquipment(item)}
                                                />
                                                <span className="text-sm font-medium text-slate-700">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {equipment.length === 0 && (
                                        <p className="text-xs text-amber-600 mt-2 font-medium">Please select available equipment to proceed.</p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div>
                                    <Label className="block mb-2 font-medium">Quantity</Label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-24 text-center text-lg font-bold"
                                        />
                                        <p className="text-sm text-slate-500">
                                            {quantity * (product.purchaseType === "Full Pallet" ? 84 : product.purchaseType === "Half Pallet" ? 42 : 1)} cases total
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center text-lg font-bold text-slate-900 mb-2 px-1">
                                <span>Estimated Total:</span>
                                <span>
                                    {product.priceLabel ? "Quote Required" : `$${totalPrice.toFixed(2)}`}
                                </span>
                            </div>

                            {product.priceLabel ? (
                                <Button
                                    size="lg"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-14 shadow-md shadow-blue-200"
                                    asChild
                                >
                                    <Link href="/contact">Request Quote</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        size="lg"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-14 shadow-md shadow-blue-200"
                                        onClick={handleBuyNow}
                                        disabled={!product.inStock || equipment.length === 0}
                                    >
                                        {product.inStock ? "Buy Now" : "Out of Stock"}
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full font-semibold text-lg h-14 border-2 hover:bg-slate-50"
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock || equipment.length === 0}
                                    >
                                        <ShoppingCart className="mr-2 w-5 h-5" />
                                        Add to Cart
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-16">
                    <Separator />
                </div>

                {/* Reviews Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Customer Reviews</h2>
                        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                            Write a Review
                        </Button>
                    </div>

                    {showReviewForm && (
                        <Card className="mb-8 border-slate-200">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-semibold text-lg">Write a Review</h3>
                                <p className="text-sm text-slate-500">Reviews are verified after purchase.</p>
                                <div className="space-y-2">
                                    <Label>Rating</Label>
                                    <div className="flex text-slate-300">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 hover:text-yellow-400 cursor-pointer transition-colors" />)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Comment</Label>
                                    <Textarea placeholder="Share your experience..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Name</Label>
                                        <Input placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Order ID (Verified Purchase)</Label>
                                        <Input placeholder="ORD-..." />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                                    <Button disabled>Submit Review (Requires Order)</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {reviews.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                            <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-slate-900">No reviews yet</h3>
                            <p className="text-slate-500">Be the first to review this product!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Reviews list would go here */}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
