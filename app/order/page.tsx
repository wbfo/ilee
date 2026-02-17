import { Suspense } from "react"
import { OrderForm } from "@/components/order/OrderForm"

export const metadata = {
    title: "Order Water 24/7 | Tri-State Area Delivery",
    description: "Place your order for on-demand or recurring water delivery in NY, NJ, and CT.",
}

export default function OrderPage() {
    return (
        <div className="relative min-h-screen pt-44 pb-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">
                        Place a <span className="text-blue-600">Water Order</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Submit your order request details below. We&apos;ll review your location and inventory, then confirm your delivery time and total.
                    </p>
                </div>

                <Suspense fallback={<div className="text-center py-10">Loading form...</div>}>
                    <OrderForm />
                </Suspense>
            </div>
        </div>
    )
}
