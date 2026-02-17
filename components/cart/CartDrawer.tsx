"use client"

import { useCart } from "@/components/providers/CartProvider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Link from "next/link"

export function CartDrawer() {
    const { items, removeItem, updateQuantity, cartCount, subtotal, total, expressFee, isCartOpen, setIsCartOpen } = useCart()

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full bg-white text-slate-900 border-l border-slate-200">
                <SheetHeader className="pb-4 border-b border-slate-100">
                    <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                        <ShoppingBag className="w-5 h-5" />
                        Your Order ({cartCount})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">Your cart is empty</h3>
                            <p className="text-slate-500 max-w-[200px]">
                                Browse our catalog for pallets, cases, and logistics supplies.
                            </p>
                            <Button asChild onClick={() => setIsCartOpen(false)}>
                                <Link href="/shop">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {item.product.image ? (
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ShoppingBag className="w-8 h-8 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-medium text-slate-900 line-clamp-2 leading-tight">
                                            {item.product.name}
                                        </h4>
                                        <p className="text-sm text-slate-500">{item.product.purchaseType}</p>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-2 border border-slate-200 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900">
                                                    ${(item.product.price * item.quantity).toFixed(2)}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 justify-end mt-1"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-slate-100 pt-4 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {expressFee > 0 ? (
                                <div className="flex justify-between text-sm text-blue-600 font-medium">
                                    <span>Express Delivery</span>
                                    <span>+${expressFee.toFixed(2)}</span>
                                </div>
                            ) : (
                                <div className="flex justify-between text-sm text-green-600 font-medium">
                                    <span>Standard Delivery</span>
                                    <span>Included</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold text-slate-900 border-t border-slate-100 pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            asChild
                            className="w-full h-12 text-lg font-bold bg-cta hover:bg-cta/90 text-cta-foreground shadow-lg hover:shadow-xl rounded-xl transition-all"
                        >
                            <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                                Proceed to Checkout
                            </Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet >
    )
}
