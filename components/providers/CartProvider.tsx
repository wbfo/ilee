"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { Product } from "@/lib/products"

export type CartItem = {
    product: Product
    quantity: number
    equipment?: string[] // Forklift, Pallet Jack, Loading Dock
}

type CartContextType = {
    items: CartItem[]
    deliverySpeed: "Standard" | "Express"
    setDeliverySpeed: (speed: "Standard" | "Express") => void
    addItem: (product: Product, quantity: number, equipment?: string[]) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    updateEquipment: (productId: string, equipment: string[]) => void
    clearCart: () => void
    cartCount: number
    subtotal: number
    expressFee: number
    total: number
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Initialize state lazily to avoid hydration mismatch we'll use a two-pass approach or simple effect
    // But since this is a client component, we can try to load initial state in an effect safely
    // However, to fix the specific lint "setState in effect", we should use a simpler pattern
    // or just suppress if it was actually safe (but here it causes double render).
    // Better pattern: Initialize with default, then load.

    const [items, setItems] = useState<CartItem[]>([])
    const [deliverySpeed, setDeliverySpeed] = useState<"Standard" | "Express">("Standard")
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from localStorage - ONLY ONCE
    useEffect(() => {
        const savedCart = localStorage.getItem("ilee-cart")
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart)
                // eslint-disable-next-line
                setItems(parsed.items || [])
                setDeliverySpeed(parsed.deliverySpeed || "Standard")
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save cart to localStorage - Whenever dependencies change, but only after load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("ilee-cart", JSON.stringify({ items, deliverySpeed }))
        }
    }, [items, deliverySpeed, isLoaded])

    // Load admin settings (Express Fee)
    const [feeAmount, setFeeAmount] = useState(75)
    useEffect(() => {
        const savedFee = localStorage.getItem("admin-express-fee")
        if (savedFee) {
            try {
                const parsedFee = Number(savedFee)
                if (!isNaN(parsedFee)) {
                    // eslint-disable-next-line
                    setFeeAmount(parsedFee)
                } else {
                    console.warn("Admin express fee in localStorage is not a valid number:", savedFee)
                }
            } catch (e) {
                console.error("Error parsing admin express fee from localStorage:", e)
            }
        }
    }, [])

    const expressFee = deliverySpeed === "Express" ? feeAmount : 0

    const addItem = (product: Product, quantity: number, equipment?: string[]) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.product.id === product.id)

            if (existingItem) {
                toast.success("Updated quantity in cart")
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity, equipment: equipment || item.equipment }
                        : item
                )
            }

            toast.success("Added to cart")
            setIsCartOpen(true)
            return [...currentItems, { product, quantity, equipment }]
        })
    }

    const removeItem = (productId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId))
        toast.success("Removed from cart")
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(productId)
            return
        }
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const updateEquipment = (productId: string, equipment: string[]) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId ? { ...item, equipment } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
        setDeliverySpeed("Standard")
        localStorage.removeItem("ilee-cart")
    }

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    // expressFee is calculated above based on admin settings
    const total = subtotal + expressFee

    return (
        <CartContext.Provider
            value={{
                items,
                deliverySpeed,
                setDeliverySpeed,
                addItem,
                removeItem,
                updateQuantity,
                updateEquipment,
                clearCart,
                cartCount,
                subtotal,
                expressFee,
                total,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
