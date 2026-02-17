import Link from "next/link"

export function HomeBrands() {
    const brands = [
        "Niagara",
        "Nestlé Pure Life",
        "Poland Spring",
        "Member’s Mark",
        "Kirkland",
    ]

    return (
        <section className="py-32 relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-slate-50 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-6">
                        Premium Brands, <span className="text-blue-600">Delivered</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We deliver popular trusted brands directly to your door. From everyday hydration to premium mineral water, we source it all.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {brands.map((brand) => (
                        <Link
                            key={brand}
                            href={`/shop?brand=${brand}`}
                            className="group relative flex items-center justify-center h-24 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 text-lg font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-center px-2">
                                {brand}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center space-y-8">
                    <div>
                        <Link
                            href="/shop"
                            className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors group"
                        >
                            View All Products
                            <span className="w-2 h-2 bg-green-500 rounded-full ml-3 animate-pulse" />
                        </Link>
                    </div>

                    <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Disclaimer: We are an independent delivery service and are not affiliated with, endorsed by, or official distributors of the brands listed above. All trademarks belong to their respective owners.
                    </p>
                </div>
            </div>
        </section>
    )
}
