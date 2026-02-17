import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-primary to-blue-500 animate-gradient bg-[length:200%_200%]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4 z-10 text-center text-white">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight font-heading drop-shadow-lg">Need water today?</h2>
                <p className="text-blue-50 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-body drop-shadow-md">
                    Skip the store/heavy lifting. Start your order request now.
                </p>
                <Button size="lg" variant="secondary" className="px-12 py-8 text-xl h-auto font-extrabold bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 shadow-2xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 rounded-2xl border-2 border-transparent hover:border-blue-100" asChild>
                    <Link href="/shop">Start Your Order</Link>
                </Button>
            </div>
        </section>
    )
}
