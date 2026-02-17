import { Product } from "./products"

export interface CartItem {
    product: Product
    quantity: number
    equipment?: string[] // Forklift, Pallet Jack, Loading Dock
}

export interface Cart {
    items: CartItem[]
    deliverySpeed: "Standard" | "Express"
}

export const EXPRESS_FEE = 75.00

export function calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
}

export function calculateTotal(cart: Cart): number {
    const subtotal = calculateSubtotal(cart.items)
    const expressFee = cart.deliverySpeed === "Express" ? EXPRESS_FEE : 0
    return subtotal + expressFee
}

export function getCartItemCount(cart: Cart): number {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}

// LocalStorage helpers
const CART_STORAGE_KEY = "ilee-cart"

export function saveCartToStorage(cart: Cart): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
}

export function loadCartFromStorage(): Cart {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e)
            }
        }
    }
    return { items: [], deliverySpeed: "Standard" }
}

export function clearCart(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(CART_STORAGE_KEY)
    }
}
