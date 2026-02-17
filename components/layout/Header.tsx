"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, Home, Info, Star, ShoppingBag, MapPin, Phone, Droplets, Building2, HardHat, Package, Zap, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react"

import { siteConfig } from "@/lib/siteConfig"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useCart } from "@/components/providers/CartProvider"
import { CartDrawer } from "@/components/cart/CartDrawer"

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { cartCount, setIsCartOpen } = useCart()

    const routes = [
        { href: "/", label: "Home", icon: Home },
        { href: "/about", label: "About", icon: Info },
        { href: "/reviews", label: "Reviews", icon: Star },
    ]

    const shopLinks = [
        { href: "/shop", label: "Shop All", icon: ShoppingBag },
        { href: "/shop?category=water-beverages", label: "Water & Beverages", icon: Droplets },
        { href: "/shop?category=facility-office", label: "Facility & Office Supplies", icon: Building2 },
        { href: "/shop?category=construction-materials", label: "Construction & Materials", icon: HardHat },
        { href: "/shop?category=bulk-pallets", label: "Bulk / Pallets", icon: Package },
        { href: "/shop?delivery=express", label: "Express Delivery (48 hrs)", icon: Zap },
    ]

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
                <div className="w-full relative z-[51]">
                    <AnnouncementBar />
                </div>
                <div className="flex justify-center px-4 w-full pt-4">
                    <div className="glass rounded-3xl px-8 h-20 flex items-center justify-between w-full max-w-7xl transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors font-heading">
                                {siteConfig.name}
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-2">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={`text-sm font-medium transition-all px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary ${pathname === route.href ? "text-primary bg-primary/5 font-semibold" : "text-muted-foreground"
                                        }`}
                                >
                                    {route.label}
                                </Link>
                            ))}

                            {/* Shop Dropdown */}
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-primary/10 hover:text-primary data-[state=open]:bg-primary/10 px-4 py-2 rounded-lg h-auto">
                                            Shop
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-2 p-4 bg-white rounded-xl shadow-xl border-none">
                                                {shopLinks.map((link) => (
                                                    <li key={link.href}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={link.href}
                                                                className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{link.label}</div>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>

                            <Link
                                href="/availability"
                                className={`text-sm font-medium transition-all px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary ${pathname === "/availability" ? "text-primary bg-primary/5 font-semibold" : "text-muted-foreground"
                                    }`}
                            >
                                Availability
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-sm font-medium transition-all px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary ${pathname === "/contact" ? "text-primary bg-primary/5 font-semibold" : "text-muted-foreground"
                                    }`}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Desktop CTAs */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-3 hover:bg-muted rounded-xl transition-colors group"
                            >
                                <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Button asChild size="lg" className="rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                <Link href="/order">Order Now</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2"
                            >
                                <ShoppingCart className="w-6 h-6 text-foreground" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-xl transition-all h-10 w-10">
                                        <Menu className="h-6 w-6 text-foreground" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-transparent border-none">
                                    <div className="flex flex-col h-full bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 overflow-y-auto">
                                        <div className="p-6 pb-2">
                                            <SheetHeader className="p-0 text-left">
                                                <SheetTitle className="text-3xl font-bold tracking-tighter text-white font-heading mb-0">
                                                    {siteConfig.name}
                                                </SheetTitle>
                                                <p className="text-slate-400 text-sm">Premium Hydration & Supplies</p>
                                            </SheetHeader>
                                        </div>

                                        <div className="flex flex-col flex-1 px-4 py-6 gap-2">
                                            <div className="px-2 pb-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                                                Navigation
                                            </div>
                                            {routes.map((route) => {
                                                const Icon = route.icon
                                                return (
                                                    <Link
                                                        key={route.href}
                                                        href={route.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`flex items-center gap-4 text-lg font-medium transition-all p-3 rounded-2xl group ${pathname === route.href
                                                            ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                                                            : "text-slate-300 hover:text-white hover:bg-white/5 active:scale-95"
                                                            }`}
                                                    >
                                                        <div className={`p-2 rounded-xl transition-colors ${pathname === route.href ? "bg-blue-500 text-white" : "bg-white/5 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10"}`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <span className="flex-1">{route.label}</span>
                                                        <ChevronRight className={`w-4 h-4 transition-transform ${pathname === route.href ? "opacity-100" : "opacity-0 group-hover:opacity-40 group-hover:translate-x-1"}`} />
                                                    </Link>
                                                )
                                            })}

                                            <div className="h-4" />

                                            <div className="px-2 pb-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                                                Product Catalog
                                            </div>
                                            <div className="grid grid-cols-1 gap-1">
                                                {shopLinks.map((link) => {
                                                    const Icon = link.icon
                                                    return (
                                                        <Link
                                                            key={link.href}
                                                            href={link.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-2xl transition-all group active:scale-95"
                                                        >
                                                            <div className="p-2 rounded-xl bg-white/5 text-slate-500 group-hover:text-white group-hover:bg-primary/20 transition-all">
                                                                <Icon className="w-4 h-4" />
                                                            </div>
                                                            <span className="text-[15px] font-medium">{link.label}</span>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="p-6 mt-auto border-t border-white/5 bg-white/[0.02]">
                                            <div className="space-y-3">
                                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 rounded-2xl text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5" onClick={() => setIsOpen(false)}>
                                                    <Link href="/order">Order Now</Link>
                                                </Button>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Button variant="outline" asChild className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-12" onClick={() => setIsOpen(false)}>
                                                        <Link href="/availability" className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-blue-400" />
                                                            <span>Locate</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" asChild className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-12" onClick={() => setIsOpen(false)}>
                                                        <Link href="/contact" className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4 text-emerald-400" />
                                                            <span>Support</span>
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex justify-center gap-6 mt-8 opacity-40">
                                                <Facebook className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                                                <Instagram className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                                                <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
            <CartDrawer />
        </>
    )
}
